import React from 'react'
import { View, Text, Image, Button, Caption } from '@shoutem/ui'
import Modal from 'react-native-modal'
import RichText from '../common/RichText'
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
    // help: PropTypes.string, // extra text to show when reaching
    icon: PropTypes.any, // icon to show
    quantity: PropTypes.number.isRequired, // quantity of the property
    minimumValue: PropTypes.number, // minimum value for the quantity
    maximumValue: PropTypes.number, // maximum value for the quantity
    setQuantity: PropTypes.func.isRequired, // @params quantity: save the quantity
    disabled: PropTypes.bool, // disable the widget
    milestones: PropTypes.object, // milestones for achieving a certain number in the quantity field
    // structure:
    // number: {description: text, details: function}
  }

  static defaultProps = {
    milestones: {},
    disabled: false,
  }

  milestone() {
    if (
      !this.state.showMilestone ||
      !this.props.milestones[this.props.quantity]
    ) {
      return null
    }
    let milestone = this.props.milestones[this.props.quantity]
    return <RichText>{milestone.description}</RichText>
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
        <View style={styles.modalContainer}>
          {this.props.milestones[this.props.quantity].details}
        </View>
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

    let style = this.props.disabled ? styles.disabledProperty : styles.property

    return (
      <View styleName="horizontal v-center">
        <Button
          styleName="clear"
          onLongPress={this.decrease}
          onPress={this.handlePress}
          style={styles.button}
        >
          {icon}
          <Text style={style}>
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
  modalContainer: {
    // flex: 1,
    backgroundColor: colors.grey900,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
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
  disabledProperty: {
    color: colors.grey100,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
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
}
