import React from 'react'
import { Screen, View, Text, Title, Subtitle, Divider } from '@shoutem/ui'

import Hunt from '../components/Hunt'

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
          <Title>Survival</Title>
          <Subtitle>Departing: +2. Limit: 3</Subtitle>
          <Text>+1 for Language</Text>
          <Text>+1 for YYYY</Text>
          <Divider />
          <Hunt />
        </View>
      </Screen>
    )
  }
}
