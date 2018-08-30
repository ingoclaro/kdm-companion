import React from 'react'
import { View, Text, Image, Button, Caption } from '@shoutem/ui'
import Modal from 'react-native-modal'
import SimpleStepper from 'react-native-simple-stepper'
import { MarkdownView } from 'react-native-markdown-view'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

export default class EditableProperty extends React.Component {
  constructor(props) {
    super(props)
    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.milestone = this.milestone.bind(this)
    this.milestoneDetails = this.milestoneDetails.bind(this)
    this.hasMilestoneDetails = this.hasMilestoneDetails.bind(this)
  }

  state = {
    visible: false,
    showMilestoneDetails: false,
  }

  static propTypes = {
    showLabel: PropTypes.bool,
    label: PropTypes.string, // label of the property
    help: PropTypes.string, // extra text to show when editing
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
    showLabel: false,
    milestones: {},
  }

  showEditor() {
    this.setState({ visible: true })
  }

  hideEditor() {
    this.setState({ visible: false })
    if (this.hasMilestoneDetails()) {
      this.setState({ showMilestoneDetails: true })
    }
  }

  milestone() {
    //TODO: fix this part because you can gain 2 (age) and pass the milestone.
    //Somehow we need to detect the transition rather than the absolute value.
    //An option could be to save this on the model, or store it in the container of this component,
    //but the problem is that it's reloaded because the value changed.
    // Another option is to eliminate the stepper altogether and only edit via doubletap, longtap, then show the modal as soon as the milestone is reached.
    if (!this.props.milestones[this.props.quantity]) {
      return null
    }
    milestone = this.props.milestones[this.props.quantity]
    return (
      <MarkdownView styles={styles.markdown}>
        {milestone.description}
      </MarkdownView>
    )
  }

  hasMilestoneDetails() {
    return (
      this.props.milestones[this.props.quantity] &&
      this.props.milestones[this.props.quantity].details
    )
  }

  milestoneDetails() {
    if (!this.hasMilestoneDetails()) {
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

  render() {
    let icon = this.props.icon ? (
      <Image source={this.props.icon} style={{ width: 16, height: 16 }} />
    ) : null

    let label = this.props.showLabel ? this.props.label : null

    return (
      <View>
        <Button
          styleName="clear"
          onLongPress={this.showEditor}
          style={styles.button}
        >
          {icon}
          <Text style={styles.property}>
            {label}: {this.props.quantity}
          </Text>
        </Button>

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={() => this.hideEditor()}
          onBackButtonPress={() => this.hideEditor()}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View style={styles.modal}>
            <View style={styles.propertyLine}>
              <View styleName="horizontal">
                <Text>
                  {this.props.label}: {this.props.quantity}
                </Text>
                <Caption style={{ paddingLeft: 4 }}>{this.props.help}</Caption>
              </View>

              <SimpleStepper
                tintColor="white"
                initialValue={this.props.quantity}
                minimumValue={this.props.minimumValue || -10}
                maximumValue={this.props.maximumValue || 10}
                valueChanged={this.props.setQuantity}
                style={styles.stepper}
              />
            </View>
            {this.milestone()}
          </View>
        </Modal>

        {this.milestoneDetails()}
      </View>
    )
  }
}

const styles = {
  modal: {
    paddingHorizontal: 5,
    paddingTop: 15,
    backgroundColor: colors.grey900,
    height: 80,
  },
  propertyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  property: {
    color: colors.grey100,
    paddingLeft: 2,
    marginRight: 0,
    marginTop: 2,
    marginBottom: 2,
  },
  stepper: {
    flex: 2,
    right: 5,
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
