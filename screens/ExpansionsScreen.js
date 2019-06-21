import React from 'react'
import { ScrollView } from 'react-native'
import { Screen } from '@shoutem/ui'
import Expansions from '../components/Expansions'

export default class ExpansionsScreen extends React.Component {
  render() {
    return (
      <Screen style={{ paddingTop: 5, paddingLeft: 5 }}>
        <ScrollView>
          <Expansions />
        </ScrollView>
      </Screen>
    )
  }
}
