import React from 'react'
import { Screen, View, Text, Image, DropDownMenu } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import { values } from 'mobx'
import R from 'ramda'

@inject(({ store }) => ({
  monsters: R.chain(monster => {
    return values(monster.levels).map(level => {
      return {
        monster_id: monster.id,
        level_id: level.id,
        title: `${monster.name} - ${level.name}`,
        value: `${monster.id}-${level.id}`,
        type: level.type ? level.type : monster.type,
      }
    })
  }, store.availableHunts),
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
      monster =>
        monster.monster_id === this.props.selected.monster.id &&
        monster.level_id === this.props.selected.level,
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

@inject(({ store }) => ({
  selected: store.selectedCampaign.hunting || { monster: null, level: null },
  select: store.selectedCampaign.selectHunt,
}))
@observer
export class HuntMonsterSelector extends React.Component {
  render() {
    return <MonsterSelector type="quarry" {...this.props} />
  }
}

@inject(({ store }) => ({
  selected: store.selectedCampaign.showdown || { monster: null, level: null },
  select: store.selectedCampaign.selectShowdown,
}))
@observer
export class ShowdownMonsterSelector extends React.Component {
  render() {
    return <MonsterSelector type="all" {...this.props} />
  }
}

export default MonsterSelector
