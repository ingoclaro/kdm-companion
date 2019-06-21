import React from 'react'
import { Platform, StatusBar, YellowBox } from 'react-native'
import { AppLoading, Font, Image, Asset } from 'expo'
import Sentry from 'sentry-expo'
import Application from './screens/App'
import colors from './src/colors'
import RootStore from './src/models/RootStore'
import { load } from './src/filesystem'
import env from './env.js'
const { SENTRY_DSN } = env

// ignore showing warnings of things we can't do anything about.
YellowBox.ignoreWarnings(['Require cycle:', 'Warning: "Provider":'])

Sentry.config(SENTRY_DSN).install()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    // StatusBar.setBarStyle('light-content')
    // StatusBar.setHidden(false)
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.grey900)
    }

    this._cacheResourcesAsync = this._cacheResourcesAsync.bind(this)
  }

  state = {
    isReady: false,
    store: RootStore.create(),
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return <Application store={this.state.store} />
  }

  async _cacheResourcesAsync() {
    let images = []
    // menu images for ios
    images = images.concat([
      require('./images/icon_hunt.png'),
      // require('./images/icon_lantern.png'),
      require('./images/icon_monster.png'),
      require('./images/icon_settlement.png'),
      require('./images/icon_survivors.png'),
    ])

    await Promise.all([
      Font.loadAsync({
        'rubicon-icon-font': require('@shoutem/ui/fonts/rubicon-icon-font.ttf'),
        'Rubik-Black': require('@shoutem/ui/fonts/Rubik-Black.ttf'),
        'Rubik-BlackItalic': require('@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
        'Rubik-Bold': require('@shoutem/ui/fonts/Rubik-Bold.ttf'),
        'Rubik-BoldItalic': require('@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
        'Rubik-Italic': require('@shoutem/ui/fonts/Rubik-Italic.ttf'),
        'Rubik-Light': require('@shoutem/ui/fonts/Rubik-Light.ttf'),
        'Rubik-LightItalic': require('@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
        'Rubik-Medium': require('@shoutem/ui/fonts/Rubik-Medium.ttf'),
        'Rubik-MediumItalic': require('@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
        'Rubik-Regular': require('@shoutem/ui/fonts/Rubik-Regular.ttf'),
      }),
      cacheImages(images),
    ])

    await load(this.state.store)
  }
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}
