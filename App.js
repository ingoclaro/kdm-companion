import React from 'react'
import { Platform } from 'react-native'
import Expo, { AppLoading } from 'expo'
import configureStore, { loadState } from './src/store'
import initialGameData from '../src/data'
// import Application from './components/App' must be required after the store is created, see createApp()

let store = configureStore()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this._cacheResourcesAsync = this._cacheResourcesAsync.bind(this)
  }

  state = {
    isReady: false,
    store: null,
  }

  createApp() {
    const Application = require('./components/App').default
    return <Application store={this.state.store} />
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

    return this.createApp()
  }

  async _cacheResourcesAsync() {
    let images = []
    // menu images for ios
    if (Platform.OS === 'ios') {
      images = images.concat([
        // require('./images/build.png'),
        // require('./images/resources.jpg'),
        // require('./images/settlement.jpg'),
      ])
    }

    await Promise.all([
      Expo.Font.loadAsync({
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

    await loadState(store)
      .then(newState => {
        if (!newState.settlement_locations) {
          console.log('State is empty, loading default data')
          this.setState({ store: configureStore(initialGameData) })
        } else {
          console.log('Merging new data')
          const state = Object.assign(newState, initialGameData)
          this.setState({ store: configureStore(state) })
        }
      })
      .catch(e => {
        console.log('Failed to load previous state.', e)
        const data = require('./src/data').default
        this.setState({ store: configureStore(data) })
      })
  }
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Expo.Image.prefetch(image)
    } else {
      return Expo.Asset.fromModule(image).downloadAsync()
    }
  })
}
