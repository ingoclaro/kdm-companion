import React from 'react'
import { View, Text, Title, Button } from '@shoutem/ui'
import { observer } from 'mobx-react/native'
import colors from '../../src/colors'

class MultiStateCheckbox extends React.Component {
  state = {
    idx: 0,
  }

  static defaultProps = {
    states: [],
    idx: undefined,
    setIdx: undefined,
  }

  nextState = () => {
    let next = (this.props.idx ? this.props.idx : this.state.idx) + 1
    if (next >= this.props.states.length) {
      next = 0
    }
    if (this.props.setIdx) {
      this.props.setIdx(next)
    } else {
      this.setState({ idx: next })
    }
  }

  checkBox = () => {
    return this.props.states[
      this.props.idx ? this.props.idx : this.state.idx
    ][0]
  }

  label = () => {
    return this.props.states[
      this.props.idx ? this.props.idx : this.state.idx
    ][1]
  }

  render() {
    return (
      <Button styleName="textual" style={styles.item} onPress={this.nextState}>
        {this.checkBox()}
        {this.label()}
      </Button>
    )
  }
}

@observer
export default class PotSun extends React.Component {
  render() {
    let purifiedIdx = 0
    if (this.props.survivor.potSun.has('purificationCeremony')) {
      purifiedIdx = 2
    } else if (this.props.survivor.potSun.has('purified')) {
      purifiedIdx = 1
    }
    return (
      <View>
        <Title>People of the Sun</Title>

        <View style={styles.row}>
          <MultiStateCheckbox
            states={[
              [<Text>[ ]</Text>, <Text>Purified</Text>],
              [<Text>[/]</Text>, <Text>Purified</Text>],
              [<Text>[X]</Text>, <Text>Purified w/P. Ceremony</Text>],
            ]}
            idx={purifiedIdx}
            setIdx={() => this.props.survivor.potSun.change('purified')}
          />

          <MultiStateCheckbox
            states={[
              [<Text>[ ]</Text>, <Text>Sun Eater</Text>],
              [<Text>[X]</Text>, <Text>Sun Eater</Text>],
            ]}
            idx={this.props.survivor.potSun.has('sunEater') ? 1 : 0}
            setIdx={() => this.props.survivor.potSun.change('sunEater')}
          />

          <MultiStateCheckbox
            states={[
              [<Text>[ ]</Text>, <Text>Child of the Sun</Text>],
              [<Text>[X]</Text>, <Text>Child of the Sun</Text>],
            ]}
            idx={this.props.survivor.potSun.has('childOfTheSun') ? 1 : 0}
            setIdx={() => this.props.survivor.potSun.change('childOfTheSun')}
          />

          <MultiStateCheckbox
            states={[
              [<Text>[ ]</Text>, <Text>Solar Ritual</Text>],
              [<Text>[X]</Text>, <Text>Solar Ritual</Text>],
            ]}
            idx={this.props.survivor.potSun.has('solarRitual') ? 1 : 0}
            setIdx={() => this.props.survivor.potSun.change('solarRitual')}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  propertyLine: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.grey900,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
}
