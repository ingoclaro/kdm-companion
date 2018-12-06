import React from 'react'
import { ScrollView } from 'react-native'
import { Screen, Divider, Title, Text } from '@shoutem/ui'
import Campaign from '../components/Campaign'

export default class ExpansionsScreen extends React.Component {
  render() {
    return (
      <Screen style={{ paddingTop: 5, paddingLeft: 5 }}>
        <ScrollView>
          <Campaign
            subscribe={() => this.props.navigation.navigate('Subscription')}
          />
        </ScrollView>
      </Screen>
    )
  }
}
