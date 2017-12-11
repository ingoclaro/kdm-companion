import React from 'react'
import Expo, { AppLoading } from 'expo'

import Navigator from './components/Navigator'

export default class App extends React.Component {
  state = {
    isReady: false,
  }

  render() {
    if(!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <Navigator />
    )
  }

  async _cacheResourcesAsync() {
    return Expo.Font.loadAsync({
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf')
    })
  }
}
