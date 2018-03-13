import React from 'react'
import { Title, View, Text, Subtitle } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'

@inject(({ store }) => ({
  survival: store.selectedCampaign.settlement.survival,
}))
@observer
export default class Survival extends React.Component {
  render() {
    return (
      <View>
        <Title>Survival</Title>
        <Subtitle>
          Departing: +{this.props.survival.departing}. Limit:{' '}
          {this.props.survival.limit}
        </Subtitle>
      </View>
    )
  }
}
