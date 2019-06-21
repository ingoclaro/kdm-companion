import React from 'react'
import { Screen, View, Text, Title } from '@shoutem/ui'
import { ScrollView } from 'react-native'

import Hunt from '../components/Hunt'
import SettlementBonuses from '../components/SettlementBonuses'
import { HuntMonsterSelector } from '../components/MonsterSelector'

export default class HuntScreen extends React.Component {
  render() {
    return (
      <Screen
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingHorizontal: 5,
          overflow: 'scroll',
        }}
      >
        <ScrollView>
          <SettlementBonuses type="departing" />
          <Title>Hunt Board</Title>
          <View styleName="horizontal v-center">
            <Text>Monster:</Text>
            <HuntMonsterSelector />
          </View>
          <Hunt />
        </ScrollView>
      </Screen>
    )
  }
}
