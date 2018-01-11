import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

export default class HuntScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Hunt',
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
          <Text>Hunt</Text>
        </View>
      </Screen>
    )
  }
}
