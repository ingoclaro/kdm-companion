import React from 'react'
import { View, Title, Text, Row, ListView } from '@shoutem/ui'
import colors from '../../src/colors'

export default class AgeMilestone extends React.Component {
  static defaultProps = {
    age: 0,
  }

  data = {
    2: [
      {
        numbers: '2',
        description: 'Gain +1 permanent evasion.',
      },
      {
        numbers: '3-6',
        description: 'Gain + 1 permanent strength.',
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

  _row(item) {
    return (
      <View styleName="horizontal v-start">
        <View style={styles.numberContainer}>
          <Text style={styles.numbers}>{item.numbers}</Text>
        </View>
        <View styleName="vertical h-start">
          <Text>{item.description}</Text>
        </View>
      </View>
    )
  }

  render() {
    if (!this.data[this.props.age]) {
      return null
    }
    return (
      <View style={styles.container}>
        <ListView data={this.data[this.props.age]} renderRow={this._row} />
      </View>
    )
  }
}

const styles = {
  container: {
    margin: 5,
  },
  numberContainer: {
    paddingRight: 5,
    width: 38,
  },
  numbers: {
    color: colors.brown400,
  },
}
