import React from 'react'
import { Platform } from 'react-native'
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import TabBar from './TabBar'
import { Image } from '@shoutem/ui'
import { Segment } from 'expo'
import { observer, inject } from 'mobx-react/native'
import colors from '../src/colors'
import CampaignHeader from './CampaignHeader'
import SurvivorHeader from './SurvivorHeader'

//tmp
import BlankScreen from './BlankScreen'

import SurvivorListScreen from './SurvivorListScreen'
import SurvivorScreen from './SurvivorScreen'

// Campaign
import SettlementsScreen from './SettlementsScreen'
import ExpansionsScreen from './ExpansionsScreen'

// Settlement
import SummaryScreen from './SummaryScreen'
import BonusesScreen from './BonusesScreen'
import EndeavorsScreen from './EndeavorsScreen'
import ResourcesScreen from './ResourcesScreen'

// Hunt
import HuntScreen from './HuntScreen'

// Showdown

import FightScreen from './FightScreen'
import BrainTraumaScreen from './BrainTraumaScreen'
import SevereInjuryScreen from './SevereInjuryScreen'

// import TerrainScreen from './TerrainScreen'
// import ResultScreen from './ResultScreen'

const styles = {
  tabBar: {
    backgroundColor: colors.grey900,
    height: 35,
  },
  tab: {
    height: 30,
    // backgroundColor: 'red',
    // alignContent: 'stretch',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  label: {
    // alignContent: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  indicator: {},
}

const settlementStyles = {
  ...styles,
  tab: {
    ...styles.tab,
    flex: 0, // so that label text isn't wrapped in smaller screens (S8)
    // Unfortunately this causes the indicator to misalign it's width from the label
    // because they are separate, I could provide a new tabBarComponent to fix this
    // or maybe change upstream.
    // TODO: maybe fix this small costmetic issue.
  },
}

const ShowdownNavigator = createMaterialTopTabNavigator(
  {
    // Setup: {
    //   screen: BlankScreen, //TerrainScreen,
    //   navigationOptions: {
    //     tabBarLabel: 'Setup',
    //   },
    // },
    Fight: {
      screen: FightScreen,
      navigationOptions: {
        tabBarLabel: 'Fight',
      },
    },
    BrainTrauma: {
      screen: BrainTraumaScreen,
      navigationOptions: {
        tabBarLabel: 'Brain Trauma',
      },
    },
    SevereInjury: {
      screen: SevereInjuryScreen,
      navigationOptions: {
        tabBarLabel: 'Severe Injury',
      },
    },
    // Result: {
    //   screen: BlankScreen, //ResultScreen,
    //   navigationOptions: {
    //     tabBarLabel: 'Result',
    //   },
    // },
  },
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    lazy: false,
    optimizationsEnabled: true,

    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: colors.grey50,
      inactiveTintColor: colors.grey50,
      style: styles.tabBar,
      tabStyle: styles.tab,
    },
  }
)

const SettlementNavigator = createMaterialTopTabNavigator(
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
    optimizationsEnabled: true,

    tabBarOptions: {
      showIcon: false,
      upperCaseLabel: false,
      activeTintColor: colors.grey50,
      inactiveTintColor: colors.grey50,
      style: settlementStyles.tabBar,
      tabStyle: settlementStyles.tab,
      labelStyle: settlementStyles.label,
      indicatorStyle: settlementStyles.indicator,
    },
  }
)

const CampaignNavigator = createMaterialTopTabNavigator(
  {
    Settlements: {
      screen: SettlementsScreen,
      navigationOptions: {
        title: 'Settlement Admin',
      },
    },
    Expansions: {
      screen: ExpansionsScreen,
      navigationOptions: {
        title: 'Expansions',
      },
    },
  },
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    lazy: true,
    optimizationsEnabled: true,

    tabBarOptions: {
      showIcon: false,
      upperCaseLabel: false,
      activeTintColor: colors.grey50,
      inactiveTintColor: colors.grey50,
      style: styles.tabBar,
      tabStyle: styles.tab,
    },
  }
)

const MainNavigator = createBottomTabNavigator(
  {
    SurvivorList: {
      screen: SurvivorListScreen,
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
      screen: HuntScreen,
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
    initialRouteName: 'SurvivorList', //'Settlement',
    tabBarPosition: 'bottom',
    animationEnabled: false, //Platform.OS === 'android' ? false : true,
    swipeEnabled: false,
    lazy: true,
    removeClippedSubviews: true,
    // tabBarComponent: TabBar,

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
        backgroundColor: colors.grey900,
        height: 75,
      },
      tabStyle: {
        paddingHorizontal: 0,
      },
    },
  }
)

const MainNavigatorHeader = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
      navigationOptions: ({ navigation }) => ({
        header: <CampaignHeader navigation={navigation} />,
      }),
    },
    Campaign: {
      screen: CampaignNavigator,
      navigationOptions: ({ navigation }) => ({
        header: <CampaignHeader navigation={navigation} />,
      }),
    },
    Survivor: {
      screen: SurvivorScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <SurvivorHeader
            navigation={navigation}
            survivorId={navigation.getParam('survivorId')}
          />
        ),
      }),
    },
  },
  {
    cardStyle: {
      backgroundColor: colors.black,
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

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return `${route.routeName}.${getCurrentRouteName(route)}`
  }
  return route.routeName
}

// export default MainNavigatorHeader
export default () => (
  <MainNavigatorHeader
    onNavigationStateChange={(prevState, currentState) => {
      const currentScreen = getCurrentRouteName(currentState)
      const prevScreen = getCurrentRouteName(prevState)

      if (prevScreen !== currentScreen) {
        let eventName = `Pageview.${currentScreen}`
        Segment.screen(currentScreen)
      }
    }}
  />
)
