import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

import Principles from '../components/Principles'

export default class PrinciplesScreen extends React.Component {
  static navigationOptions = {
    title: 'Principles',
  }

  render() {
    return (
      <Screen style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Principles />
        </View>
      </Screen>
    )
  }
}
