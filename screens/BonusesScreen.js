import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

export default class BonusesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Bonuses',
  }

  render() {
    return (
      <Screen
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Bonuses</Text>
      </Screen>
    )
  }
}
