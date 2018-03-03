import React from 'react'
import { Screen, Text } from '@shoutem/ui'

export default class BlankScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Blank',
  }

  render() {
    return (
      <Screen
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Soon...</Text>
      </Screen>
    )
  }
}
