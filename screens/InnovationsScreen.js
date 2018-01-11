import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

import Innovations from '../components/Innovations'

export default class InnovationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Innovations',
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
          <Innovations />
        </View>
      </Screen>
    )
  }
}
