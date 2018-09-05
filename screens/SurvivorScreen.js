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
import EditStats from '../components/survivor/EditStats'

export default class SurvivorScreen extends React.Component {
  constructor(props) {
    super(props)
    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setParams({ editSurvivor: this.editSurvivor })
  }

  editSurvivor = () => {
    this.showEditor()
  }

  state = {
    visible: false,
  }

  showEditor() {
    this.setState({ visible: true })
  }

  hideEditor() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <Screen style={{ paddingTop: 5, paddingLeft: 5 }}>
        <ScrollView>
          <Survivor survivorId={this.props.navigation.getParam('survivorId')} />

          <Modal
            isVisible={this.state.visible}
            onBackdropPress={() => this.hideEditor()}
            onBackButtonPress={() => this.hideEditor()}
            useNativeDriver={true}
            backdropColor={colors.black}
            avoidKeyboard={false}
          >
            <View style={styles.modal}>
              <EditStats
                survivorId={this.props.navigation.getParam('survivorId')}
              />
              <Divider />
              <Button onPress={() => this.hideEditor()}>
                <Text>Close</Text>
              </Button>
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
  modal: {
    backgroundColor: colors.grey900,
    padding: 8,
  },
}
