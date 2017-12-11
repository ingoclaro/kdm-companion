import React from 'react'
import { Screen, View, Image } from '@shoutem/ui'

import Innovations from '../components/Innovations'
import Locations from '../components/Locations'

import settlementImage from '../images/settlement.jpg'

class SettlementScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settlement',
    tabBarIcon: ({ focused }) => {
      return <Image source={settlementImage} style={styles.menuImage} />
    },
  }

  render() {
    return (
      <Screen style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.locations}>
            <Locations />
          </View>
          <View style={styles.innovations}>
            <Innovations />
          </View>
        </View>
      </Screen>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    left: 10,
  },
  locations: {
    flex: 3,
    justifyContent: 'center',
  },
  innovations: {
    flex: 2,
    justifyContent: 'center',
  },
  menuImage: {
    width: 100,
    height: 50,
  },
}

export default SettlementScreen
