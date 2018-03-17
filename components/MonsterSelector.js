import React from 'react'
import { Screen, View, Text, Image, DropDownMenu } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import R from 'ramda'

@inject(({ store }) => ({
  monsters: R.chain(monster => {
    return monster.levels.values().map(level => {
      return {
        monster_id: monster.id,
        level_id: level.id,
        title: `${monster.name} - ${level.name}`,
        value: `${monster.id}=${level.id}`,
      }
    })
  }, store.monsters.values()),
  selected: store.selectedCampaign.hunting,
  select: store.selectedCampaign.selectHunt,
}))
@observer
class MonsterSelector extends React.Component {
  state = {}
  render() {
    const selectedItem = R.find(
      R.and(
        R.propEq('monster_id', this.props.selected.monster),
        R.propEq('level_id', this.props.selected.level)
      ),
      this.props.monsters
    )
    return (
      <DropDownMenu
        options={this.props.monsters}
        selectedOption={selectedItem}
        onOptionSelected={hunt => this.props.select(hunt)}
        titleProperty="title"
        valueProperty="value"
      />
    )
  }
}

export default MonsterSelector
