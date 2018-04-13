import React from 'react'
import { View, Text, Row, Title, Subtitle, ListView } from '@shoutem/ui'
import { values } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import PropTypes from 'prop-types'
import colors from '../src/colors'
import { capitalize } from '../src/utils'

import R from 'ramda'

function newbornStats(newborn) {
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
  let description = R.filter(stat => newborn[stat], stats).map(
    stat => `${capitalize(stat)}: +${newborn[stat]}`
  )
  if (description.length > 0) {
    return { id: 'attributes', name: 'Newborn Attributes', description }
  }
  return []
}

function newbornBonuses(newborn) {
  if (newborn.description) {
    return [
      {
        id: 'newborn',
        name: 'Newborn Bonus',
        description: newborn.description,
      },
    ]
  }
  return []
}

@inject(({ store }) => ({
  data: values(store.selectedCampaign.bonuses).concat(
    newbornStats(store.selectedCampaign.settlement.newborn || {}),
    newbornBonuses(store.selectedCampaign.settlement.newborn || {})
  ),
  newborn: store.selectedCampaign.settlement.newborn || {},
}))
@observer
export default class Bonuses extends React.Component {
  _row(item) {
    let text = item.description.map((e, idx) => (
      <Text key={item.id + idx} style={styles.bonusText}>
        {e}
      </Text>
    ))
    return (
      <View style={styles.bonus}>
        <Subtitle>{item.name}</Subtitle>
        {text}
      </View>
    )
  }

  empty() {
    return <Text>Add some Innovations to see Bonuses.</Text>
  }

  render() {
    if (this.props.data.length === 0) {
      return this.empty()
    }

    return (
      <ListView
        data={this.props.data}
        renderRow={this._row}
        autoHideHeader={false}
      />
    )
  }
}

const styles = {
  bonusText: {
    color: colors.grey500,
  },
  bonus: {
    paddingVertical: 3,
  },
}
