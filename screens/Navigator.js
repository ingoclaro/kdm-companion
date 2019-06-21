import React from 'react'
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation'
import { Image } from '@shoutem/ui'
import colors from '../src/colors'
import CampaignHeader from './CampaignHeader'
import SurvivorHeader from './SurvivorHeader'
import SurvivorMenuIcon from '../components/SurvivorMenuIcon'

import SurvivorListScreen from './SurvivorListScreen'
import SurvivorScreen from './SurvivorScreen'
import SurvivorShowdownScreen from './SurvivorShowdownScreen'

// Campaign
import SettlementsScreen from './SettlementsScreen'
import ExpansionsScreen from './ExpansionsScreen'
import CampaignScreen from './CampaignScreen'

// Settlement
import SummaryScreen from './SummaryScreen'
import BonusesScreen from './BonusesScreen'
import EndeavorsScreen from './EndeavorsScreen'
import ResourcesScreen from './ResourcesScreen'

// Hunt
import HuntScreen from './HuntScreen'

// Showdown

import ShowdownScreen from './ShowdownScreen'

import SubscriptionScreen from './SubscriptionScreen'

import AboutScreen from './AboutScreen'

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
    Monster: {
      screen: ShowdownScreen,
      navigationOptions: {
        tabBarLabel: icon(require('../images/icon_monster.png'), {
          width: 28,
          heigh: 28,
        }),
      },
    },
    RedSurvivor: {
      screen: SurvivorShowdownScreen,
      params: {
        survivorPosition: 0,
      },
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <SurvivorMenuIcon
            focused={focused}
            position={0}
            color={colors.red800}
          />
        ),
      },
    },
    BrownSurvivor: {
      screen: SurvivorShowdownScreen,
      params: {
        survivorPosition: 1,
      },
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <SurvivorMenuIcon
            focused={focused}
            position={1}
            color={colors.brown800}
          />
        ),
      },
    },
    GreenSurvivor: {
      screen: SurvivorShowdownScreen,
      params: {
        survivorPosition: 2,
      },
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <SurvivorMenuIcon
            focused={focused}
            position={2}
            color={colors.green800}
          />
        ),
      },
    },
    BlueSurvivor: {
      screen: SurvivorShowdownScreen,
      params: {
        survivorPosition: 3,
      },
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <SurvivorMenuIcon
            focused={focused}
            position={3}
            color={colors.blue800}
          />
        ),
      },
    },
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
        title: 'Admin',
      },
    },
    Expansions: {
      screen: ExpansionsScreen,
      navigationOptions: {
        title: 'Expansions',
      },
    },
    Campaign: {
      screen: CampaignScreen,
      navigationOptions: {
        title: 'Campaign',
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
    Subscription: {
      screen: SubscriptionScreen,
      navigationOptions: ({ navigation }) => ({
        header: <CampaignHeader navigation={navigation} />,
      }),
    },
    About: {
      screen: AboutScreen,
      navigationOptions: ({ navigation }) => ({
        header: <CampaignHeader navigation={navigation} title="About" />,
      }),
    },
  },
  {
    cardStyle: {
      backgroundColor: colors.black,
    },
  }
)

function icon(image, options) {
  const defaultOptions = {
    width: 40,
    height: 40,
    tintColor: colors.grey400,
  }
  const opt = Object.assign({}, defaultOptions, options)
  return ({ focused }) => {
    let opacity = focused ? 0.7 : 0.4
    return (
      <Image
        source={image}
        style={{
          width: opt.width,
          height: opt.width,
        }}
        resizeMode="contain"
        tintColor={opt.tintColor}
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

const NavigatorApp = createAppContainer(MainNavigatorHeader)

// export default MainNavigatorHeader
export default () => <NavigatorApp />
