import React from 'react'
import { Screen, View, Text, Image, Button, Row, Divider } from '@shoutem/ui'
import Modal from 'react-native-modal'
import colors from '../src/colors'

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
        <View styleName="horizontal v-center">
          <Text>Monster:</Text>
          <MonsterSelector />
        </View>
        <MonsterStats />

        <Button onPress={() => this.setState({ basicActionVisible: true })}>
          <Text>Basic Action</Text>
        </Button>
        <Modal
          isVisible={this.state.basicActionVisible}
          onBackdropPress={() => this.setState({ basicActionVisible: false })}
          onBackButtonPress={() => this.setState({ basicActionVisible: false })}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View
            style={{
              backgroundColor: colors.grey900,
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <BasicAction />
            <Divider />
            <Button
              onPress={() => this.setState({ basicActionVisible: false })}
            >
              <Text>Close</Text>
            </Button>
          </View>
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
          backdropColor={colors.black}
        >
          <View
            style={{
              backgroundColor: colors.grey900,
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <SevereInjuryTable />
            <Divider />
            <Button
              onPress={() => this.setState({ severeInjuryVisible: false })}
            >
              <Text>Close</Text>
            </Button>
          </View>
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
          backdropColor={colors.black}
        >
          <View
            style={{
              backgroundColor: colors.grey900,
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <BrainTraumaTable />
            <Divider />
            <Button
              onPress={() => this.setState({ brainTraumaVisible: false })}
            >
              <Text>Close</Text>
            </Button>
          </View>
        </Modal>
      </Screen>
    )
  }
}
