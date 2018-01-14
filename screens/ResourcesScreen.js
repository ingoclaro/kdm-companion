import React from 'react'
import { Screen, View, Text, Image, Button } from '@shoutem/ui'
import Modal from 'react-native-modal'

import Craft from '../components/Craft'
import Resources from '../components/Resources'

export default class ResourcesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Resources',
  }

  constructor(props) {
    super(props)

    this.state = { craftVisible: false }
  }

  render() {
    return (
      <Screen>
        <View style={styles.resources}>
          <Resources />
        </View>
        <Button onPress={() => this.setState({ craftVisible: true })}>
          <Text>Craft</Text>
        </Button>
        <Modal
          isVisible={this.state.craftVisible}
          onBackdropPress={() => this.setState({ craftVisible: false })}
          onBackButtonPress={() => this.setState({ craftVisible: false })}
          useNativeDriver={true}
          backdropColor="grey"
        >
          <Craft />
          <Button onPress={() => this.setState({ craftVisible: false })}>
            <Text>Close</Text>
          </Button>
        </Modal>
      </Screen>
    )
  }
}

const styles = {
  resources: {
    flex: 1,
    justifyContent: 'center',
  },
}