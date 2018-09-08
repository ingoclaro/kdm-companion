import React from 'react'
import { Screen, View, Text, Image, Divider, Row } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import colors from '../src/colors'

@inject(({ store }) => ({
  monsterLevel: store.selectedCampaign.huntingMonsterLevel,
}))
@observer
class Hunt extends React.Component {
  board() {
    if (!this.props.monsterLevel) {
      return null
    }
    return this.props.monsterLevel.huntboard.split('').map((letter, idx) => {
      let next = idx < 11 ? <Text> > </Text> : null
      return (
        <View styleName="horizontal" key={idx}>
          <Text style={styles[letter]}>{letter}</Text>
          {next}
        </View>
      )
    })
  }

  extra() {
    if (this.props.monsterLevel && this.props.monsterLevel.huntExtra) {
      return (
        <View>
          <Text>{this.props.monsterLevel.huntExtra}</Text>
          <Divider />
        </View>
      )
    }
  }

  render() {
    return (
      <View>
        {this.extra()}
        <View styleName="horizontal">
          <Text>Start> </Text>
          {this.board()}
        </View>

        <Divider />

        <Text style={styles.B}>B: Basic hunt event</Text>
        <Text style={styles.M}>M: Monster hunt event</Text>
        <Text style={styles.X}>X: Monster</Text>
        <Text style={styles.O}>O: Overwhelming Darkness (p.147)</Text>
        <Text>S: Starvation</Text>
      </View>
    )
  }
}

const styles = {
  M: {
    color: colors.brown600,
  },
  B: {
    color: colors.brown300,
  },
  X: {
    color: colors.red800,
  },
  O: {
    color: colors.bluegrey600,
  },
}

export default Hunt
