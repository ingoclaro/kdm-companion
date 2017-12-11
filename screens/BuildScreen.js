import React from 'react'
import { Screen, View, Text } from '@shoutem/ui'

export default class BuildScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Build',
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
          <Text>Build something</Text>
        </View>
      </Screen>
    )
  }
}
