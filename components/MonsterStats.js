import React from 'react'
import { View, Text } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'

import StatItem from './StatItem'

@inject(({ store }) => ({
  monsterLevel: store.selectedCampaign.showdownMonsterLevel,
}))
@observer
export default class MonsterStats extends React.Component {
  render() {
    return (
      <View>
        <Text>stats:</Text>
        <StatItem
          name="Movement"
          baseValue={this.props.monsterLevel.movement}
        />
        <StatItem
          name="Toughness"
          baseValue={this.props.monsterLevel.toughness}
        />
        <StatItem name="Speed" baseValue={this.props.monsterLevel.speed} />
        <StatItem name="Damage" baseValue={this.props.monsterLevel.damage} />
        <StatItem
          name="Accuracy"
          baseValue={this.props.monsterLevel.accuracy}
        />
        <StatItem name="Luck" baseValue={this.props.monsterLevel.luck} />
        <StatItem name="Evasion" baseValue={this.props.monsterLevel.evasion} />
      </View>
    )
  }
}
