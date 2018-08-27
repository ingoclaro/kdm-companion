import React from 'react'
import { View, Text, Image, Button, Caption } from '@shoutem/ui'
import Modal from 'react-native-modal'
import SimpleStepper from 'react-native-simple-stepper'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

export default class EditableProperty extends React.Component {
  constructor(props) {
    super(props)
    this.showEditor = this.showEditor.bind(this)
  }

  state = {
    visible: false,
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
  }

  static defaultProps = {
    showLabel: false,
  }

  showEditor() {
    this.setState({ visible: true })
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
          onBackdropPress={() => this.setState({ visible: false })}
          onBackButtonPress={() => this.setState({ visible: false })}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
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
        </Modal>
      </View>
    )
  }
}

const styles = {
  propertyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.grey900,
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
}
