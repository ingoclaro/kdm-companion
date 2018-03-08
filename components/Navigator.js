import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { View, Button, Icon, Image, Text, NavigationBar } from '@shoutem/ui'
import Expo from 'expo'
import colors from '../src/colors'

//tmp
import BlankScreen from '../screens/BlankScreen'

// Campaign
import SettlementsScreen from '../screens/SettlementsScreen'

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
      screen: BlankScreen, //TerrainScreen,
      navigationOptions: {
        tabBarLabel: 'Terrain',
      },
    },
    Fight: {
      screen: BlankScreen, //FightScreen,
      navigationOptions: {
        tabBarLabel: 'Fight',
      },
    },
    Result: {
      screen: BlankScreen, //ResultScreen,
      navigationOptions: {
        tabBarLabel: 'Result',
      },
    },
  },
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    lazy: false,
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: colors.grey50,
      inactiveTintColor: colors.grey600,
      style: {
        backgroundColor: colors.black,
        height: 40,
        // paddingTop: 4,
        // Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0, // workaround for https://github.com/react-community/react-navigation/issues/12
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
    lazy: false,
    tabBarOptions: {
      showIcon: false,
      upperCaseLabel: false,
      activeTintColor: colors.grey50,
      inactiveTintColor: colors.grey600,
      style: {
        backgroundColor: colors.black,
        height: 40,
        // paddingTop: 4,
        //   Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0, // workaround for https://github.com/react-community/react-navigation/issues/12
      },
    },
  }
)

const CampaignNavigator = StackNavigator(
  {
    Settlements: {
      screen: SettlementsScreen,
      navigationOptions: {
        title: 'Settlement Name',
      },
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerStyle: {
        backgroundColor: colors.black,
      },
      headerTintColor: colors.grey50,
    },
  }
)

const MainNavigator = TabNavigator(
  {
    Campaign: {
      screen: CampaignNavigator,
      navigationOptions: {
        tabBarLabel: 'Campaign',
        tabBarIcon: icon(require('../images/icon_lantern.png')),
      },
    },
    Survivors: {
      screen: BlankScreen,
      navigationOptions: {
        tabBarLabel: 'Survivors',
        tabBarIcon: icon(require('../images/icon_survivors.png')),
      },
    },
    Settlement: {
      screen: SettlementNavigator,
      navigationOptions: {
        tabBarLabel: 'Settlement',
        tabBarIcon: icon(require('../images/icon_settlement.png')),
      },
    },
    Hunt: {
      screen: BlankScreen, //HuntScreen,
      navigationOptions: {
        tabBarLabel: 'Hunt',
        tabBarIcon: icon(require('../images/icon_hunt.png')),
      },
    },
    Showdown: {
      screen: ShowdownNavigator,
      navigationOptions: {
        tabBarLabel: 'Showdown',
        tabBarIcon: icon(require('../images/icon_monster.png')),
      },
    },
  },
  {
    initialRouteName: 'Settlement',
    tabBarPosition: 'bottom',
    animationEnabled: false, //Platform.OS === 'android' ? false : true,
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      activeTintColor: colors.grey50,
      inactiveTintColor: colors.grey600,
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      iconStyle: {
        width: 40,
        height: 40,
        bottom: -10,
      },
      style: {
        backgroundColor: colors.black,
        height: 75,
      },
      tabStyle: {
        paddingHorizontal: 0,
      },
    },
  }
)

function icon(image) {
  return ({ focused }) => {
    let opacity = focused ? 0.7 : 0.4
    return (
      <Image
        source={image}
        style={{
          width: 40,
          height: 40,
        }}
        resizeMode="contain"
        tintColor={colors.grey400}
        opacity={opacity}
      />
    )
  }
}

export default MainNavigator
// export default SettlementNavigator
