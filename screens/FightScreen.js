import React from 'react'
import { Screen, View, Text, Image, Button, Row, Divider } from '@shoutem/ui'
import Modal from 'react-native-modal'

import MonsterSelector from '../components/MonsterSelector'
import MonsterStats from '../components/MonsterStats'
import BasicAction from '../components/BasicAction'
import SevereInjuryTable from '../components/SevereInjuryTable'
import BrainTraumaTable from '../components/BrainTraumaTable'

export default class FightScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Fight',
  }

  state = {
    basicActionVisible: false,
    severeInjuryVisible: false,
    brainTraumaVisible: false,
  }

  render() {
    return (
      <Screen>
        <MonsterSelector />
        <MonsterStats />

        <Button onPress={() => this.setState({ basicActionVisible: true })}>
          <Text>Basic Action</Text>
        </Button>
        <Modal
          isVisible={this.state.basicActionVisible}
          onBackdropPress={() => this.setState({ basicActionVisible: false })}
          onBackButtonPress={() => this.setState({ basicActionVisible: false })}
          useNativeDriver={true}
          backdropColor="grey"
        >
          <BasicAction />
          <Button onPress={() => this.setState({ basicActionVisible: false })}>
            <Text>Close</Text>
          </Button>
        </Modal>

        <Divider />

        <Button onPress={() => this.setState({ severeInjuryVisible: true })}>
          <Text>Severe Injury Table</Text>
        </Button>
        <Modal
          isVisible={this.state.severeInjuryVisible}
          onBackdropPress={() => this.setState({ severeInjuryVisible: false })}
          onBackButtonPress={() =>
            this.setState({ severeInjuryVisible: false })
          }
          useNativeDriver={true}
          backdropColor="grey"
        >
          <SevereInjuryTable />
          <Button onPress={() => this.setState({ severeInjuryVisible: false })}>
            <Text>Close</Text>
          </Button>
        </Modal>

        <Divider />

        <Button onPress={() => this.setState({ brainTraumaVisible: true })}>
          <Text>Brain Trauma Table</Text>
        </Button>
        <Modal
          isVisible={this.state.brainTraumaVisible}
          onBackdropPress={() => this.setState({ brainTraumaVisible: false })}
          onBackButtonPress={() => this.setState({ brainTraumaVisible: false })}
          useNativeDriver={true}
          backdropColor="grey"
        >
          <BrainTraumaTable />
          <Button onPress={() => this.setState({ brainTraumaVisible: false })}>
            <Text>Close</Text>
          </Button>
        </Modal>
      </Screen>
    )
  }
}
