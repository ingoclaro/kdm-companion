import React from 'react'
import { Screen, View, Button, Image, Divider, Title, Text } from '@shoutem/ui'
import Modal from 'react-native-modal'

import Innovations from '../components/Innovations'
import Locations from '../components/Locations'
import Principles from '../components/Principles'

class SummaryScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Summary',
  }

  state = {
    locationsVisible: false,
    innovationsVisible: false,
    principlesVisible: false,
  }

  render() {
    return (
      <Screen>
        <Title>
          Locations{'  '}
          <Button
            style={{ width: 22, height: 14 }}
            onPress={() => this.setState({ locationsVisible: true })}
          >
            <Text>>></Text>
          </Button>
        </Title>
        <Text>Lantern Hoard</Text>
        <Text>Skinnery</Text>

        <Modal
          isVisible={this.state.locationsVisible}
          onBackdropPress={() => this.setState({ locationsVisible: false })}
          onBackButtonPress={() => this.setState({ locationsVisible: false })}
          useNativeDriver={true}
          backdropColor="grey"
        >
          <Locations />
          <Button onPress={() => this.setState({ locationsVisible: false })}>
            <Text>Close</Text>
          </Button>
        </Modal>

        <Divider />

        <Title>
          Innovations{' '}
          <Button
            style={{ width: 22, height: 14 }}
            onPress={() => this.setState({ innovationsVisible: true })}
          >
            <Text>>></Text>
          </Button>
        </Title>
        <Text>Language</Text>
        <Text>Drums</Text>

        <Modal
          isVisible={this.state.innovationsVisible}
          onBackdropPress={() => this.setState({ innovationsVisible: false })}
          onBackButtonPress={() => this.setState({ innovationsVisible: false })}
          useNativeDriver={true}
          backdropColor="grey"
        >
          <Innovations />
          <Button onPress={() => this.setState({ innovationsVisible: false })}>
            <Text>Close</Text>
          </Button>
        </Modal>

        <Divider />

        <Title>
          Principles{' '}
          <Button
            style={{ width: 22, height: 14 }}
            onPress={() => this.setState({ principlesVisible: true })}
          >
            <Text>>></Text>
          </Button>
        </Title>
        <Text>Graves</Text>
        <Text>Survival of the fittest</Text>

        <Modal
          isVisible={this.state.principlesVisible}
          onBackdropPress={() => this.setState({ principlesVisible: false })}
          onBackButtonPress={() => this.setState({ principlesVisible: false })}
          useNativeDriver={true}
          backdropColor="grey"
        >
          <Principles />
          <Button onPress={() => this.setState({ principlesVisible: false })}>
            <Text>Close</Text>
          </Button>
        </Modal>

        <Divider />

        <Title>Survival Limit: 2</Title>
      </Screen>
    )
  }
}

export default SummaryScreen
