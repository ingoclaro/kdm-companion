import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

import Locations from '../components/Locations'

export default class LocationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Locations',
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
          <Locations />
        </View>
      </Screen>
    )
  }
}
