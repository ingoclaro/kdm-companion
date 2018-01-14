import React from 'react'
import { Screen, View, Text, Image, Button, Row } from '@shoutem/ui'

export default class ResultScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Result',
  }

  render() {
    return (
      <Screen
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Result</Text>
      </Screen>
    )
  }
}
