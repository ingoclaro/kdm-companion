import React from 'react'
import { View, Text, Image, Button, Caption } from '@shoutem/ui'
import Modal from 'react-native-modal'
import { MarkdownView } from 'react-native-markdown-view'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

export default class EditableProperty extends React.Component {
  constructor(props) {
    super(props)
    this.milestone = this.milestone.bind(this)
    this.milestoneDetails = this.milestoneDetails.bind(this)

    this.increase = this.increase.bind(this)
    this.decrease = this.decrease.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleDoublePress = this.handleDoublePress.bind(this)
  }

  state = {
    showMilestone: false,
    showMilestoneDetails: false,
  }

  static propTypes = {
    label: PropTypes.string, // label of the property
    // help: PropTypes.string, // extra text to show when editing
    icon: PropTypes.any, // icon to show
    quantity: PropTypes.number.isRequired, // quantity of the property
    minimumValue: PropTypes.number, // minimum value for the quantity
    maximumValue: PropTypes.number, // maximum value for the quantity
    setQuantity: PropTypes.func.isRequired, // @params quantity: save the quantity
    milestones: PropTypes.object, // milestones for achieving a certain number in the quantity field
    // structure:
    // number: {description: text, callback: function} TODO: revisit the structure.
  }

  static defaultProps = {
    milestones: {},
  }

  milestone() {
    if (
      !this.state.showMilestone ||
      !this.props.milestones[this.props.quantity]
    ) {
      return null
    }
    let milestone = this.props.milestones[this.props.quantity]
    return (
      <MarkdownView styles={styles.markdown}>
        {milestone.description}
      </MarkdownView>
    )
  }

  milestoneDetails() {
    if (
      !this.state.showMilestoneDetails ||
      !this.props.milestones[this.props.quantity] ||
      !this.props.milestones[this.props.quantity].details
    ) {
      return null
    }
    return (
      <Modal
        isVisible={this.state.showMilestoneDetails}
        onBackdropPress={() => this.setState({ showMilestoneDetails: false })}
        onBackButtonPress={() => this.setState({ showMilestoneDetails: false })}
        useNativeDriver={true}
        backdropColor={colors.black}
      >
        {this.props.milestones[this.props.quantity].details}
      </Modal>
    )
  }

  handlePress(e) {
    const DOUBLE_PRESS_DELAY = 400
    const now = new Date().getTime()

    if (this.lastPress && now - this.lastPress < DOUBLE_PRESS_DELAY) {
      delete this.lastPress
      this.handleDoublePress(e)
    } else {
      this.lastPress = now
    }
  }

  handleDoublePress(e) {
    this.increase()
  }

  increase() {
    if (this.props.quantity >= this.props.maximumValue) {
      this.setState({ showMilestone: false, showMilestoneDetails: false })
      return
    }
    if (this.props.milestones[this.props.quantity + 1]) {
      this.setState({ showMilestone: true, showMilestoneDetails: true })
    } else {
      this.setState({ showMilestone: false, showMilestoneDetails: false })
    }
    this.props.setQuantity(this.props.quantity + 1)
  }

  decrease() {
    if (this.props.quantity <= this.props.minimumValue) {
      return
    }
    this.setState({ showMilestone: false, showMilestoneDetails: false })
    this.props.setQuantity(this.props.quantity - 1)
  }

  render() {
    let icon = this.props.icon ? (
      <Image source={this.props.icon} style={{ width: 16, height: 16 }} />
    ) : null

    return (
      <View styleName="horizontal v-center">
        <Button
          styleName="clear"
          onLongPress={this.decrease}
          onPress={this.handlePress}
          style={styles.button}
        >
          {icon}
          <Text style={styles.property}>
            {this.props.label}: {this.props.quantity}
          </Text>
        </Button>
        {this.milestone()}
        {this.milestoneDetails()}
      </View>
    )
  }
}

const styles = {
  property: {
    color: colors.grey100,
    fontWeight: 'normal',
    textDecorationLine: 'underline',
    fontSize: 15,
    paddingLeft: 2,
    marginRight: 0,
    marginTop: 2,
    marginBottom: 2,
  },
  button: {
    paddingLeft: 0,
    marginRight: 4,
  },
  markdown: {
    paragraph: {
      color: colors.grey500,
      marginTop: 0,
      marginBottom: 0,
    },
    listItemBullet: {
      color: colors.grey500,
      minWidth: 0,
      paddingRight: 8,
    },
    listItemUnorderedContent: {
      color: colors.grey500,
    },
    listItemUnorderedContent: {
      flex: -1,
      color: colors.grey500,
    },
    // list: {
    //   margin: 0,
    //   marginLeft: 8,
    // },
  },
}
