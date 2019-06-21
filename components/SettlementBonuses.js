import React from 'react'
import { Title, View, Text, Subtitle, Divider } from '@shoutem/ui'
import { observer, inject } from 'mobx-react'
import { capitalize } from '../src/utils'
import colors from '../src/colors'
import RichText from './common/RichText'
import R from 'ramda'

export default inject(({ store }) => ({
  settlement: store.selectedCampaign.settlement,
}))(
  observer(
    class SettlementBonuses extends React.Component {
      static defaultProps = {
        type: 'departing',
      }

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

        let bonus = this.props.settlement[this.props.type] || {}
        let survivalLimit = this.props.settlement.survivalLimit

        let text = R.filter(stat => bonus[stat] > 0, stats).map((stat, idx) => (
          <View key={idx} style={styles.statRow}>
            <Subtitle style={styles.statName}>{capitalize(stat)}:</Subtitle>
            <Text style={styles.statValue}> +{bonus[stat]}</Text>
            {stat === 'survival' ? (
              <Text style={styles.statValue}> (Limit: {survivalLimit})</Text>
            ) : null}
          </View>
        ))

        return text
      }

      render() {
        const bonus = this.props.settlement[this.props.type] || {}
        let description = bonus.description
        let stats = this.stats()

        if (description === '' && stats.length === 0) {
          return null
        }

        return (
          <View>
            <Title>{capitalize(this.props.type)} Bonus</Title>
            <RichText>{description}</RichText>
            {stats}
            <Divider />
          </View>
        )
      }
    }
  )
)

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
