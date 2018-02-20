import React from 'react'
import { Screen } from '@shoutem/ui'
import Bonuses from '../components/Bonuses'

export default class BonusesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Bonuses',
  }

  render() {
    return (
      <Screen
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingHorizontal: 5,
        }}
      >
        <Bonuses />
      </Screen>
    )
  }
}
