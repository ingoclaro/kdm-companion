import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

export default class BonusesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Bonuses',
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
          <Text>Bonuses</Text>
        </View>
      </Screen>
    )
  }
}
