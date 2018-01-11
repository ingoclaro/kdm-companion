import React from 'react'
import { Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Expo from 'expo'
import { getTheme, defaultThemeVariables } from '@shoutem/ui'
import { StyleProvider } from '@shoutem/theme'

// Settlement
import SummaryScreen from '../screens/SummaryScreen'
import LocationsScreen from '../screens/LocationsScreen'
import InnovationsScreen from '../screens/InnovationsScreen'
import PrinciplesScreen from '../screens/PrinciplesScreen'
import BonusesScreen from '../screens/BonusesScreen'
import EndeavorsScreen from '../screens/EndeavorsScreen'
import ResourcesScreen from '../screens/ResourcesScreen'

import HuntScreen from '../screens/HuntScreen'
import ShowdownScreen from '../screens/ShowdownScreen'

const SummaryNavigatior = StackNavigator({
  Summary: {
    screen: SummaryScreen,
  },
  Locations: {
    screen: LocationsScreen,
  },
  Innovations: {
    screen: InnovationsScreen,
  },
  Principles: {
    screen: PrinciplesScreen,
  },
})

const SettlementNavigator = TabNavigator(
  {
    Summary: {
      screen: SummaryNavigatior,
      navigationOptions: {
        tabBarLabel: 'Settlement',
      },
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
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      // showIcon: true, // looks quite ugly in Android, seems that sizes aren't taken into account or it needs different ones.
      style: {
        backgroundColor: 'black',
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
      screen: ShowdownScreen,
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      // showIcon: true, // looks quite ugly in Android, seems that sizes aren't taken into account or it needs different ones.
      style: {
        backgroundColor: 'black',
        paddingTop:
          Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0, // workaround for https://github.com/react-community/react-navigation/issues/12
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

const themeVariables = {
  ...defaultThemeVariables,
  backgroundColor: 'black',
  navBarIconsColor: 'white',
  text: {
    color: 'white',
  },
  paperColor: 'black',
  navBarBorderColor: 'grey',
  featuredNavBarIconsColor: 'white',
  subtitle: {
    color: 'grey',
  },
  title: {
    color: 'white',
  },
  lineColor: 'grey',
  // featuredColor: '#659CEC',
  // shadowColor: 'rgba(0, 0, 0, 0.1)',
  //
  // heading: {
  //   color: '#222222',
  // },
  //
  // caption: {
  //   color: '#666666',
  // },
  //
  // imageOverlayColor: 'rgba(0, 0, 0, 0.2)',
  // imageOverlayTextColor: '#FFFFFF',
  // tagOverlayColor: 'rgba(0, 0, 0, 0.7)',
  // tagOverlayTextColor: '#FFFFFF',
  //
  // navBarBackground: '#FFFFFF',
  //
  // navBarText: {
  //   color: '#222222',
  // },
  //
  // featuredNavBarTitleColor: '#ffffff',
  //
  // mainNavBackground: '#FFFFFF',
  // mainNavItemColor: 'rgba(50, 50, 50, 0.4)',
  // mainNavItemBackground: 'rgba(0, 0, 0, 0)',
  // mainNavSelectedItemBackground: '#FFFFFF',
  // mainNavSelectedItemColor: '#222222',
  // mainNavSelectedItemBorderColor: '#659CEC',
  // mainNavBorderColor: '#e0e0e0',
  //
  // subNavItemColor: '#666666',
  // subNavItemBackground: 'rgba(0, 0, 0, 0)',
  // subNavListBorderColor: '#e0e0e0',
  //
  // primaryButtonText: {
  //   color: '#222222',
  // },
  // primaryButtonBackgroundColor: '#ffffff',
  // primaryButtonBorderColor: '#ffffff',
  // secondaryButtonTextColor: '#ffffff',
  // secondaryButtonBackgroundColor: '#2c2c2c',
  // secondaryButtonBorderColor: '#2c2c2c',
  //
  // sectionHeaderBackgroundColor: '#F2F2F2',
  // indicatorColor: '#222222',
}
const theme = getTheme(themeVariables)

export default ThemedApp
