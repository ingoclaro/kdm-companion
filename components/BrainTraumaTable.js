import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import RichText from './common/RichText'
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
        'You are knockdown and suffer knockback equal to your movement towards the closest board edge. Gain 1d5 insanity.',
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

  title = () => {
    return <Title>Brain Trauma Table</Title>
  }

  row = (item, key) => {
    return (
      <View key={key} style={styles.row}>
        <View style={styles.numberContainer}>
          <Text style={[styles.text, styles.numbers]}>{item.numbers}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={[styles.text, styles.subTitle]}>{item.title}</Text>
          <RichText>{item.description}</RichText>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.table}>
          {this.data.map((item, idx) => this.row(item, idx))}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  table: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 2,
  },
  numberContainer: {
    paddingRight: 5,
    width: 38,
  },
  numbers: {
    color: colors.brown400,
  },
  itemContainer: {
    flex: 1,
  },
  subTitle: {
    color: colors.grey200,
    fontSize: 15,
  },
  text: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    color: colors.grey100,
  },
})
