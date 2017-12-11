import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

export default class BuildScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Build',
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text>Build something</Text>
      </View>
    )
  }
}
