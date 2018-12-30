import React from 'react'
import { Screen, View, Divider, ScrollView } from '@shoutem/ui'
import Bonuses from '../components/settlement/Bonuses'
import SettlementBonuses from '../components/SettlementBonuses'

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
        <ScrollView>
          <Bonuses />

          <Divider />

          <SettlementBonuses type="newborn" />
          <SettlementBonuses type="departing" />
          <SettlementBonuses type="showdown" />
        </ScrollView>
      </Screen>
    )
  }
}
