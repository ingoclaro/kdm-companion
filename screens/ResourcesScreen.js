import React from 'react'
import { Screen, View, Text } from '@shoutem/ui'

import MultiSelectList from '../components/MultiSelectList'

import gameData from '../src/data'

export default class ResourcesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Resources',
  }

  render() {
    let resources = gameData.resources

    return (
      <Screen style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Choose Resources</Text>
        </View>
      </Screen>
    )
  }
}
