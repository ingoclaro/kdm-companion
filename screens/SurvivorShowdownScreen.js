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
} from '@shoutem/ui'
import { ScrollView } from 'react-native'
import { observer, inject } from 'mobx-react'

import Modal from 'react-native-modal'
import colors from '../src/colors'

import Survivor from '../components/survivor/Survivor'
import EditStats from '../components/survivor/EditStats'

// TODO: show severe injury buttons (brain, body icons?)
// TODO: change severe tables to be able to select the injury + confirmation? + auto apply effects to survivor.
@observer
class SurvivorShowdownScreen extends React.Component {
  state = {
    visible: false,
  }

  showEditor = () => {
    this.setState({ visible: true })
  }

  hideEditor = () => {
    this.setState({ visible: false })
  }

  render() {
    const idx = this.props.navigation.getParam('survivorPosition')
    const survivor =
      this.props.survivorList.length > idx
        ? this.props.survivorList[idx]
        : undefined

    if (!survivor) {
      return (
        <Screen style={styles.screen}>
          <Title>No Survivor</Title>
        </Screen>
      )
    }
    return (
      <Screen style={styles.screen}>
        <ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <Title>{survivor.name}</Title>
            {/* TODO: fix killing survivor <Button
              style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
              onPress={() => this.showEditor()}
            >
              <Icon name="edit" style={{ color: colors.grey50 }} />
            </Button> */}
          </View>

          <Survivor survivorId={survivor.id} />

          <Modal
            isVisible={this.state.visible}
            onBackdropPress={() => this.hideEditor()}
            onBackButtonPress={() => this.hideEditor()}
            useNativeDriver={true}
            backdropColor={colors.black}
            avoidKeyboard={false}
          >
            <View style={styles.modal}>
              <EditStats survivorId={survivor.id} />
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

export default inject(({ store }, props) => ({
  survivorList: store.selectedCampaign.settlement.activeSurvivorsList,
}))(SurvivorShowdownScreen)

const styles = {
  screen: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  modal: {
    backgroundColor: colors.grey900,
    padding: 8,
  },
}
