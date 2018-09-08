import React from 'react'
import { View, Title, Text, Divider } from '@shoutem/ui'
import MilestoneTable from './MilestoneTable'
import colors from '../../src/colors'

export default class AgeMilestone extends React.Component {
  data = {
    2: [
      {
        numbers: '2',
        description: 'Gain +1 permanent evasion.',
      },
      {
        numbers: '3-6',
        description: 'Gain +1 permanent strength.',
      },
      {
        numbers: '7-15',
        description: 'Gain 1 random fighting art.',
      },
      {
        numbers: '16-19',
        description: 'Gain +1 permanent accuracy.',
      },
      {
        numbers: '20',
        description: 'Gain +1 permanent luck.',
      },
    ],
    6: [
      {
        numbers: '2',
        description: 'Gain +1 permanent movement.',
      },
      {
        numbers: '3-6',
        description: 'Gain 1 random fighting art.',
      },
      {
        numbers: '7-15',
        description: 'Gain +1 permanent strength.',
      },
      {
        numbers: '16-19',
        description: 'Gain 1 random fighting art.',
      },
      {
        numbers: '20',
        description: 'Gain +1 permanent speed.',
      },
    ],
    10: [
      {
        numbers: '2',
        description: 'Gain +1 permanent speed.',
      },
      {
        numbers: '3-6',
        description: 'Gain +1 permanent movement.',
      },
      {
        numbers: '7-15',
        description: 'Gain 1 random fighting art.',
      },
      {
        numbers: '16-19',
        description: 'Draw 2 random fighting arts and gain 1.',
      },
      {
        numbers: '20',
        description: 'Gain +3 permanent strength.',
      },
    ],
    15: [
      {
        numbers: '2',
        description: 'Draw 5 random fighting arts and gain 1.',
      },
      {
        numbers: '3-6',
        description: 'Ga in +1 permanent evasion.',
      },
      {
        numbers: '7-15',
        description: 'Gain +1 permanent luck.',
      },
      {
        numbers: '16-19',
        description: 'Gain +1 permanent speed.',
      },
      {
        numbers: '20',
        description: 'Gain +1 permanent attribute of your choice.',
      },
    ],
  }

  render() {
    return (
      <MilestoneTable
        data={this.data}
        intro="Gain the benefits for the Hunt XP milestone you have reached:"
        {...this.props}
      />
    )
  }
}

export const ageMilestones = {
  2: { description: '{book} Age (p.107)', details: <AgeMilestone value={2} /> },
  6: { description: '{book} Age (p.107)', details: <AgeMilestone value={6} /> },
  10: {
    description: '{book} Age (p.107)',
    details: <AgeMilestone value={10} />,
  },
  15: {
    description: '{book} Age (p.107)',
    details: <AgeMilestone value={15} />,
  },
  16: { description: 'Retired' },
}
