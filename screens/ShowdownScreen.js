import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

export default class ShowdownScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Showdown',
  }

  render() {
    return (
      <Screen style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Showdown</Text>
        </View>
      </Screen>
    )
  }
}
