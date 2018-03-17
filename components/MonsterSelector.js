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
        type: level.type ? level.type : monster.type,
      }
    })
  }, store.availableHunts),
  selected: store.selectedCampaign.hunting || { monster: null, level: null },
  select: store.selectedCampaign.selectHunt,
}))
@observer
class MonsterSelector extends React.Component {
  render() {
    let monsters = this.props.monsters
    if (this.props.type !== 'all') {
      monsters = R.filter(monster => monster.type === this.props.type, monsters)
    }
    monsters.unshift({
      monster_id: null,
      level_id: null,
      title: 'Select a Monster',
      value: 1,
      type: null,
    })

    let selectedItem = R.find(
      R.and(
        R.propEq('monster_id', this.props.selected.monster),
        R.propEq('level_id', this.props.selected.level)
      ),
      monsters
    )
    if (!selectedItem) {
      selectedItem = monsters[0]
    }
    return (
      <DropDownMenu
        options={monsters}
        selectedOption={selectedItem}
        onOptionSelected={hunt => this.props.select(hunt)}
        titleProperty="title"
        valueProperty="value"
      />
    )
  }
}

MonsterSelector.defaultProps = {
  type: 'all', // quarry, nemesis, all
}

export default MonsterSelector
