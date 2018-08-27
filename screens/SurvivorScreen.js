import React from 'react'
import {
  Screen,
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Row,
  Caption,
  Divider,
  TextInput,
} from '@shoutem/ui'
import { ScrollView } from 'react-native'

import Modal from 'react-native-modal'
import colors from '../src/colors'

import Survivor from '../components/survivor/Survivor'

export default class SurvivorScreen extends React.Component {
  constructor(props) {
    super(props)
    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.saveName = this.saveName.bind(this)

    // TODO: fix edit name button
    // this.props.navigation.setParam('editName', this.showEditor)
  }

  state = {
    text: '',
    visible: false,
  }

  showEditor() {
    this.setState({ visible: true })
  }

  hideEditor() {
    this.setState({ visible: false })
  }

  saveName() {
    this.props.saveName(this.state.text)
    this.hideEditor()
  }

  render() {
    return (
      <Screen
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          // paddingTop: 5,
          paddingLeft: 5,
        }}
      >
        <ScrollView>
          <Survivor survivorId={this.props.navigation.getParam('survivorId')} />

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
                <Text>Name: </Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.text}
                  autoFocus={true}
                  onChangeText={text => this.setState({ text })}
                  maxLength={22}
                />
              </View>

              <Divider />

              <View styleName="horizontal">
                <Button onPress={this.saveName} style={{ marginHorizontal: 8 }}>
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
        </ScrollView>
      </Screen>
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
