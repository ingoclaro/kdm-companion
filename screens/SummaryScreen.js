import React from 'react'
import { Screen, View, Button, Image, Divider, Title, Text } from '@shoutem/ui'

import Innovations from '../components/Innovations'
import Locations from '../components/Locations'

class SummaryScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Summary',
  }

  render() {
    return (
      <Screen style={{ flex: 1 }}>
        <View style={styles.container}>
          <Title>
            Locations{'  '}
            <Button
              style={{ width: 22, height: 14 }}
              onPress={() => this.props.navigation.navigate('Locations')}
            >
              <Text>>></Text>
            </Button>
          </Title>

          <Text>Lantern Hoard</Text>
          <Text>Skinnery</Text>
          <Divider />
          <Title>
            Innovations{' '}
            <Button
              style={{ width: 22, height: 14 }}
              onPress={() => this.props.navigation.navigate('Innovations')}
            >
              <Text>>></Text>
            </Button>
          </Title>
          <Text>Language</Text>
          <Text>Drums</Text>
          <Divider />
          <Title>
            Principles{' '}
            <Button
              style={{ width: 22, height: 14 }}
              onPress={() => this.props.navigation.navigate('Principles')}
            >
              <Text>>></Text>
            </Button>
          </Title>
          <Text>Graves</Text>
          <Text>Survival of the fittest</Text>
          <Divider />
          <Title>Survival Limit: 2</Title>
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
  locations: {
    flex: 3,
    justifyContent: 'center',
  },
  innovations: {
    flex: 2,
    justifyContent: 'center',
  },
}

export default SummaryScreen
