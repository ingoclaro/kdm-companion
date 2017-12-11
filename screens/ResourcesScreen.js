import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

export default class ResourcesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Resources',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Choose Resources</Text>
      </View>
    )
  }
}
