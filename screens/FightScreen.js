import React from 'react'
import { Screen, View, Text, Image, Button, Row } from '@shoutem/ui'

import MonsterSelector from '../components/MonsterSelector'
import MonsterStats from '../components/MonsterStats'

export default class FightScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Fight',
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
          <MonsterSelector />
          <MonsterStats />
        </View>
      </Screen>
    )
  }
}
