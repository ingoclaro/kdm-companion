import React from 'react'
import { View, Title, Text, Divider } from '@shoutem/ui'
import MilestoneTable from './MilestoneTable'
import CheckboxListItem from '../common/CheckboxListItem'
import colors from '../../src/colors'

export default class CourageMilestone extends React.Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  data = {
    showdown: [
      {
        numbers: '1-3',
        description: 'Gain +1 strength token.',
      },
      {
        numbers: '4-7',
        description: 'Gain +3 survival and +3 insanity.',
      },
      {
        numbers: '8-9',
        description: 'Gain +1 permanent strength.',
      },
      {
        numbers: '10+',
        description: 'Gain +1 permanent speed.',
      },
    ],
    hunt: [
      {
        numbers: '1-3',
        description: 'Gain +1 speed token for the next showdown.',
      },
      {
        numbers: '4-7',
        description: 'Gain +1 understanding.',
      },
      {
        numbers: '8-9',
        description: 'Gain +1 permanent strength.',
      },
      {
        numbers: '10+',
        description: 'Gain +1 permanent movement.',
      },
    ],
    settlement: [
      {
        numbers: '1-3',
        description:
          'May reroll 1 ![endeavor](endeavor) this settlement phase.',
      },
      {
        numbers: '4-7',
        description: 'Gain +1 ![endeavor](endeavor) this settlement phase.',
      },
      {
        numbers: '8-9',
        description: 'Gain +1 permanent strength.',
      },
      {
        numbers: '10+',
        description: 'Gain +1 permanent accuracy.',
      },
    ],
  }

  abilities = {
    showdown:
      '**Stalwart**: Ignore being knocked down by brain trauma and intimidation actions.',
    hunt:
      '**Prepared**: When rolling to determine a straggler, add your hunt experience to your roll result.',
    settlement:
      '**Matchmaker**: When you are a returning survivor, once per year you may spend ![endeavor](endeavor) to ![book](book) **Intimacy** (p.133).',
  }

  state = {
    selected: 'showdown',
  }

  onPress(id) {
    this.setState({ selected: id })
  }

  render() {
    return (
      <View
        style={{
          margin: 5,
        }}
      >
        <Text>Select the triumph corresponding to the current game phase</Text>
        <CheckboxListItem
          onPressItem={this.onPress}
          title="Showdown"
          id="showdown"
          selected={this.state.selected === 'showdown'}
        />
        <CheckboxListItem
          onPressItem={this.onPress}
          title="Hunt"
          id="hunt"
          selected={this.state.selected === 'hunt'}
        />
        <CheckboxListItem
          onPressItem={this.onPress}
          title="Settlement"
          id="settlement"
          selected={this.state.selected === 'settlement'}
        />

        <Divider />

        <Text>{this.abilities[this.state.selected]}</Text>

        <MilestoneTable
          data={this.data}
          intro=""
          header={['1d10', 'Result']}
          value={this.state.selected}
        />
      </View>
    )
  }
}

export const courageMilestones = {
  3: { description: '![book](book) Bold (p.113)' }, //TODO: add details: <CourageMilestone />
  9: { description: '![book](book) See the Truth (p.167)' },
}
