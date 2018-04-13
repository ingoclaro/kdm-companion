import React from 'react'
import { Title, View, Text, Subtitle, Divider } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import { capitalize } from '../src/utils'

@inject(({ store }) => ({
  settlement: store.selectedCampaign.settlement,
}))
@observer
export default class HuntBonuses extends React.Component {
  stats() {
    let stats = [
      'survival',
      'accuracy',
      'strength',
      'evasion',
      'insanity',
      'courage',
      'understanding',
      'hunt xp',
    ]
    return stats.map((item, idx) => {
      let survivalLimit = this.props.settlement.survivalLimit
      if (this.props.settlement.departing[item] > 0)
        return (
          <View key={idx} style={styles.statRow}>
            <Subtitle style={styles.stat}>{capitalize(item)}:</Subtitle>
            <Text> +{this.props.settlement.departing[item]}</Text>
            {item === 'survival' ? (
              <Text> (Limit: {survivalLimit})</Text>
            ) : null}
          </View>
        )
    })
  }

  render() {
    const departing = this.props.settlement.departing || {}
    let description = departing.description || []
    return (
      <View>
        <Title>Attributes Bonus</Title>
        {this.stats()}
        <Divider />
        <Title>Hunt Bonus</Title>
        <View>
          {description.map((item, idx) => <Text key={idx}>{item}</Text>)}
        </View>
      </View>
    )
  }
}

const styles = {
  statRow: {
    flexDirection: 'row',
  },
  stat: {
    fontSize: 17,
  },
}
