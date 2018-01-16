import React from 'react'
import { Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Expo from 'expo'
import { StyleProvider } from '@shoutem/theme'
import theme from '../src/theme'
import colors from '../src/colors'

// Settlement
import SummaryScreen from '../screens/SummaryScreen'
import BonusesScreen from '../screens/BonusesScreen'
import EndeavorsScreen from '../screens/EndeavorsScreen'
import ResourcesScreen from '../screens/ResourcesScreen'

import HuntScreen from '../screens/HuntScreen'

import TerrainScreen from '../screens/TerrainScreen'
import FightScreen from '../screens/FightScreen'
import ResultScreen from '../screens/ResultScreen'

const ShowdownNavigator = TabNavigator(
  {
    Terrain: {
      screen: TerrainScreen,
    },
    Fight: {
      screen: FightScreen,
    },
    Result: {
      screen: ResultScreen,
    },
  },
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: colors.grey50,
      inactiveTintColor: colors.grey300,
      style: {
        backgroundColor: colors.black,
        paddingTop:
          Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0, // workaround for https://github.com/react-community/react-navigation/issues/12
      },
    },
  }
)

const SettlementNavigator = TabNavigator(
  {
    Summary: {
      screen: SummaryScreen,
      // navigationOptions: {
      //   tabBarLabel: 'Settlement',
      // },
    },
    Bonuses: {
      screen: BonusesScreen,
    },
    Endeavors: {
      screen: EndeavorsScreen,
    },
    Resources: {
      screen: ResourcesScreen,
    },
  },
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: colors.grey50,
      inactiveTintColor: colors.grey300,
      style: {
        backgroundColor: colors.black,
        paddingTop:
          Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0, // workaround for https://github.com/react-community/react-navigation/issues/12
      },
    },
  }
)

const App = TabNavigator(
  {
    Settlement: {
      screen: SettlementNavigator,
      navigationOptions: {
        tabBarLabel: 'Settlement',
      },
    },
    Hunt: {
      screen: HuntScreen,
    },
    Showdown: {
      screen: ShowdownNavigator,
      navigationOptions: {
        tabBarLabel: 'Showdown',
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: Platform.OS === 'android' ? false : true,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: colors.grey50,
      inactiveTintColor: colors.grey300,
      // showIcon: true, // looks quite ugly in Android, seems that sizes aren't taken into account or it needs different ones.
      style: {
        backgroundColor: colors.black,
        // paddingTop:
        //   Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0, // workaround for https://github.com/react-community/react-navigation/issues/12
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

export default ThemedApp
