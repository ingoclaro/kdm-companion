import React from 'react'
import { Screen, View, Text, Image, Button, Row, Divider } from '@shoutem/ui'
import Modal from 'react-native-modal'
import colors from '../src/colors'

import SevereInjuryTable from '../components/SevereInjuryTable'
import BrainTraumaTable from '../components/BrainTraumaTable'

export default class TablesScreen extends React.Component {
  state = {
    severeInjuryVisible: false,
    brainTraumaVisible: false,
  }

  render() {
    return (
      <Screen>
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
