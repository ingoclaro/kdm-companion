import React from 'react'
import { View, Title, Text, ListView } from '@shoutem/ui'
import colors from '../src/colors'

export default class BrainTraumaTable extends React.Component {
  data = [
    {
      numbers: '1 - 2',
      title: 'Mortal Terror',
      description: 'No ifs, ands or buts, the survivor is dead',
    },
    {
      numbers: '3',
      title: 'Memory Loss',
      description: 'Loose two levels of weapon proficiency',
    },
    {
      numbers: '4',
      title: 'Flee',
      description:
        'You are knockdown and suffer knockeback equal to your movement towards the closest board edge. Gain 1d5 insanity.',
    },
    {
      numbers: '5 - 6',
      title: 'Danger Seizure',
      description:
        'You thrash about wildly, dealing 1 damage to yourself and every adjacent survivor. Gain a random disorder and 1d5 insanity.',
    },
    {
      numbers: '7 - 8',
      title: 'Lunacy',
      description: 'Gain a random disorder and 1d5 insanity.',
    },
    {
      numbers: '9',
      title: 'New Perspective',
      description: 'You are knocked down and gain 1d10 insanity.',
    },
    {
      numbers: '10',
      title: 'Frenzy',
      description:
        'Gain 1d5 insanity, +1 speed token, +1 strength token. Ignore slow on melee weapons. You may not spend survival. You may not use fighting arts. You may not use weapon specialization or mastery. Can be gained multiple times. Lasts until end of showdown.',
    },
    {
      numbers: '11',
      title: 'Maniacal Laughter',
      description:
        'You are knocked down and gain +1 speed token, priority target token and 1d5 insanity.',
    },
    {
      numbers: '12',
      title: 'Clarity',
      description:
        'You are knocked down. Add your current survival to insanity and reduce survival to 0. Gain a random disorder. If you already have 3 disorders you die.',
    },
    {
      numbers: '13',
      title: 'Impossible',
      description:
        'How this could happen! Gain 1d10 Survival, 1d10 insanity and +2 luck tokens.',
    },
  ]

  _title() {
    return <Title>Brain Trauma Table</Title>
  }

  _row(item) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.numbers}>{item.numbers}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    )
  }

  render() {
    return <ListView data={this.data} renderRow={this._row} />
  }
}

const styles = {
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  numbers: {
    // flex: 1,
    color: colors.brown400,
    paddingRight: 5,
    width: 38,
  },
  textContainer: {
    // flex: 1,
    // flexWrap: 'wrap',
  },
  title: {},
  description: {
    color: colors.grey500,
  },
}
