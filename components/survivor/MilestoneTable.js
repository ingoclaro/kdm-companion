import React from 'react'
import { View, Title, Text, Divider } from '@shoutem/ui'
import colors from '../../src/colors'

export default class MilestoneTable extends React.Component {
  static defaultProps = {
    value: 0,
    data: {},
    intro: '',
    header: ['2d10', 'Result'],
  }

  _row(item, idx) {
    let style = styles.row
    if (idx % 2 === 1) {
      style = styles.even
    }
    return (
      <View style={style} key={item.numbers}>
        <View style={styles.numberColumn}>
          <Text style={styles.numbers}>{item.numbers}</Text>
        </View>
        <View style={styles.resultColumn}>
          <Text>{item.description}</Text>
        </View>
      </View>
    )
  }

  render() {
    if (!this.props.data[this.props.value]) {
      return null
    }
    return (
      <View
        style={{
          margin: 5,
        }}
      >
        <Text>{this.props.intro}</Text>
        <Divider />
        <View style={styles.table}>
          <View style={styles.header}>
            <View style={styles.numberColumn}>
              <Text>{this.props.header[0]}</Text>
            </View>
            <View style={styles.resultColumn}>
              <Text>{this.props.header[1]}</Text>
            </View>
          </View>

          {this.props.data[this.props.value].map((row, idx) =>
            this._row(row, idx)
          )}
        </View>
      </View>
    )
  }
}

const styles = {
  table: {
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: colors.grey400,
  },
  row: {
    paddingVertical: 2,
    flexDirection: 'row',
  },
  numberColumn: {
    width: 50,
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  resultColumn: {
    paddingHorizontal: 4,
  },
  even: {
    flexDirection: 'row',
    paddingVertical: 2,
    backgroundColor: colors.grey800,
  },
  numbers: {},
}
