import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Screen } from '@shoutem/ui'
import { StyleProvider } from '@shoutem/theme'

import SettlementScreen from '../screens/SettlementScreen'
import ResourcesScreen from '../screens/ResourcesScreen'
import BuildScreen from '../screens/BuildScreen'

const App = TabNavigator(
  {
    Build: {
      screen: BuildScreen,
    },
    Resources: {
      screen: ResourcesScreen,
    },
    Settlement: {
      screen: SettlementScreen,
    },
  },
  {
    // tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      // showIcon: true, // looks quite ugly in Android, seems that sizes aren't taken into account or it needs different ones.
      style: {
        backgroundColor: 'black',
      },
    },
  }
)

class ThemedApp extends React.Component {
  render() {
    return (
      <StyleProvider style={theme}>
        <App />
      </StyleProvider>
    )
  }
}

const theme = {
  'shoutem.ui.Screen': {
    backgroundColor: 'black',
  },
  'shoutem.ui.Text': {
    color: 'white',
  },
  'shoutem.ui.Icon': {
    color: 'white',
  },
}
export default ThemedApp
