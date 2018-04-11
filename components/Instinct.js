import React from 'react'
import { Screen, View, Title, Text } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'

@inject(({ store }) => ({
  instinct: store.selectedCampaign.showdown
    ? store.selectedCampaign.showdown.monster.instinct
    : null,
}))
@observer
export default class Instinct extends React.Component {
  render() {
    if (this.props.instinct === null) {
      return <Text>Select a monster.</Text>
    }
    return (
      <View>
        <Title>{this.props.instinct.name}</Title>
        <Text>{this.props.instinct.description}</Text>
      </View>
    )
  }
}

@inject(({ store }) => ({
  instinct: store.selectedCampaign.showdown
    ? store.selectedCampaign.showdown.monster.instinct
    : null,
}))
@observer
export class InstinctTitle extends React.Component {
  render() {
    if (this.props.instinct === null) {
      return <Text>Instinct</Text>
    }
    return <Text>Instinct: {this.props.instinct.name}</Text>
  }
}
