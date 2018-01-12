import React from 'react'
import { Screen, View, Text, Image, DropDownMenu } from '@shoutem/ui'

class MonsterSelector extends React.Component {
  state = {
    hunt: [
      { title: 'White Lion - lvl 1', value: 'lion1' },
      { title: 'White Lion - lvl 2', value: 'lion2' },
      { title: 'White Lion - lvl 3', value: 'lion3' },
      { title: 'Screaming Antelope - lvl 1', value: 'antelope1' },
      { title: 'Screaming Antelope - lvl 2', value: 'antelope2' },
      { title: 'Screaming Antelope - lvl 3', value: 'antelope3' },
      { title: 'Phoenix - lvl 1', value: 'phoenix1' },
      { title: 'Phoenix - lvl 2', value: 'phoenix2' },
      { title: 'Phoenix - lvl 3', value: 'phoenix3' },
    ],
  }
  render() {
    return (
      <DropDownMenu
        options={this.state.hunt}
        selectedOption={
          this.state.selectedHunt ? this.state.selectedHunt : this.state.hunt[0]
        }
        onOptionSelected={hunt => this.setState({ selectedHunt: hunt })}
        titleProperty="title"
        valueProperty="value"
      />
    )
  }
}

export default MonsterSelector
