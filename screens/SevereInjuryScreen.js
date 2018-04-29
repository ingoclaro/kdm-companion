import React from 'react'
import { Screen, View } from '@shoutem/ui'
import SevereInjuryTable from '../components/SevereInjuryTable'

export default class SevereInjuryScreen extends React.Component {
  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <SevereInjuryTable />
        </View>
      </Screen>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
}
