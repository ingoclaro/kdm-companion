import React from 'react'
import { Screen } from '@shoutem/ui'
import { ScrollView } from 'react-native'

import SettlementSummary from '../components/settlement/SettlementSummary'

export default class SummaryScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Summary',
  }

  state = {
    locationsVisible: false,
    innovationsVisible: false,
    principlesVisible: false,
  }

  render() {
    return (
      <Screen style={{ paddingTop: 5, paddingLeft: 5 }}>
        <ScrollView>
          <SettlementSummary />
        </ScrollView>
      </Screen>
    )
  }
}
