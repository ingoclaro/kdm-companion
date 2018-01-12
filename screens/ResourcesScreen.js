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

    this.craft = this.craft.bind(this)
  }

  craft() {
    this.setState({ craftVisible: true })
  }

  render() {
    return (
      <Screen style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.resources}>
            <Resources />
            <Modal
              isVisible={this.state.craftVisible}
              onBackdropPress={() => this.setState({ craftVisible: false })}
              onBackButtonPress={() => this.setState({ craftVisible: false })}
              useNativeDriver={true}
              backdropColor="grey"
            >
              <Craft />
            </Modal>
          </View>
          <Button onPress={this.craft}>
            <Text>Craft</Text>
          </Button>
        </View>
      </Screen>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    left: 10,
  },
  resources: {
    flex: 1,
    justifyContent: 'center',
  },
}
