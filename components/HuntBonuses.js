import React from 'react'
import { Title, View, Text, Subtitle, Divider } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import { capitalize } from '../src/utils'
import colors from '../src/colors'
import RichText from './common/RichText'
import R from 'ramda'

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

    let departing = this.props.settlement.departing || {}
    let survivalLimit = this.props.settlement.survivalLimit

    let text = R.filter(stat => departing[stat] > 0, stats).map((stat, idx) => (
      <View key={idx} style={styles.statRow}>
        <Subtitle style={styles.statName}>{capitalize(stat)}:</Subtitle>
        <Text style={styles.statValue}> +{departing[stat]}</Text>
        {stat === 'survival' ? (
          <Text style={styles.statValue}> (Limit: {survivalLimit})</Text>
        ) : null}
      </View>
    ))

    if (text.length === 0) {
      text = [
        <Text key="none" style={styles.statValue}>
          none
        </Text>,
      ]
    }

    return text
  }

  render() {
    const departing = this.props.settlement.departing || {}
    let description = departing.description
    if (!description || description.length === 0) {
      description = ['none']
    }

    return (
      <View>
        <Title>Attributes Bonus</Title>
        {this.stats()}
        <Divider />
        <Title>Hunt Bonus</Title>
        <View>
          {description.map((item, idx) => (
            <RichText key={idx}>{item}</RichText>
          ))}
        </View>
      </View>
    )
  }
}

const styles = {
  statRow: {
    flexDirection: 'row',
  },
  statName: {
    fontWeight: '700',
    color: colors.grey500,
  },
  statValue: {
    color: colors.grey500,
  },
}
