import React from 'react'
import {
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Row,
  Caption,
  Divider,
} from '@shoutem/ui'

import { observer, inject } from 'mobx-react/native'

@inject(({ store }) => ({
  survivors: Array.from(store.selectedCampaign.settlement.survivors),
}))
@observer
export default class SurvivorList extends React.Component {
  render() {
    if (this.props.survivors.length === 0) {
      return <Text>No survivors</Text>
    }

    return (
      <View>
        <Title>Survivors</Title>
        {this.props.survivors.map(item => {
          let survivor = item[1]
          return <Text key={survivor.id}>{survivor.name}</Text>
        })}
      </View>
    )
  }
}
