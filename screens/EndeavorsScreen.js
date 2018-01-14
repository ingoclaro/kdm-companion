import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

export default class EndeavorsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Endeavors',
  }

  render() {
    return (
      <Screen
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Endeavors</Text>
      </Screen>
    )
  }
}
