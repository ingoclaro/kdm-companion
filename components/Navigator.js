import React from 'react'
import { Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Expo from 'expo'
import colors from '../src/colors'

// Settlement
import SummaryScreen from '../screens/SummaryScreen'
import BonusesScreen from '../screens/BonusesScreen'
import EndeavorsScreen from '../screens/EndeavorsScreen'
import ResourcesScreen from '../screens/ResourcesScreen'

// Hunt
import HuntScreen from '../screens/HuntScreen'

// Showdown
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
      inactiveTintColor: colors.grey600,
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
      inactiveTintColor: colors.grey600,
      style: {
        backgroundColor: colors.black,
        paddingTop:
          Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0, // workaround for https://github.com/react-community/react-navigation/issues/12
      },
    },
  }
)

const MainNavigator = TabNavigator(
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
      inactiveTintColor: colors.grey600,
      style: {
        backgroundColor: colors.black,
      },
    },
  }
)

// export default MainNavigator
export default SettlementNavigator
