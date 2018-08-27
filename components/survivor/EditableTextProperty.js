import React from 'react'
import {
  View,
  Text,
  Image,
  Divider,
  Button,
  Caption,
  TextInput,
} from '@shoutem/ui'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

export default class EditableTextProperty extends React.Component {
  constructor(props) {
    super(props)

    this.state.text = this.props.text

    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  state = {
    text: '',
    visible: false,
  }

  static propTypes = {
    showLabel: PropTypes.bool,
    label: PropTypes.string, // label of the property
    text: PropTypes.string.isRequired,
    help: PropTypes.string, // extra text to show when editing
    icon: PropTypes.any, // icon to show
    setText: PropTypes.func.isRequired, // @params quantity: save the text
  }

  static defaultProps = {
    showLabel: false,
  }

  showEditor() {
    this.setState({ visible: true })
  }

  hideEditor() {
    this.setState({ visible: false })
  }

  onSave() {
    this.props.setText(this.state.text)
    this.hideEditor()
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
            {label}: {this.props.text}
          </Text>
        </Button>

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={() => this.hideEditor()}
          onBackButtonPress={() => this.hideEditor()}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View style={styles.propertyLine}>
            <Divider />

            <View styleName="horizontal">
              <Text>{label}:</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.text}
                autoFocus={true}
                onChangeText={text => this.setState({ text })}
                maxLength={22}
              />
              <Caption style={{ paddingLeft: 4 }}>{this.props.help}</Caption>
            </View>

            <Divider />

            <View styleName="horizontal">
              <Button onPress={this.onSave} style={{ marginHorizontal: 8 }}>
                <Text>Save</Text>
              </Button>

              <Divider />

              <Button
                onPress={() => this.hideEditor()}
                style={{ marginHorizontal: 8 }}
              >
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = {
  propertyLine: {
    // flexDirection: 'row',
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
  button: {
    paddingLeft: 0,
    marginRight: 4,
  },
  textInput: {
    borderColor: colors.grey700,
    borderBottomWidth: 1,
    selectionColor: colors.grey800,
    left: 4,
    padding: 2,
    height: 22,
    width: 200,
  },
}
