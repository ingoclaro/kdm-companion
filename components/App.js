import React from 'react'
import { AppState } from 'react-native'
import { StyleProvider } from '@shoutem/theme'
import theme from '../src/theme'
import { Provider } from 'react-redux'
import store from '../src/store'
import { constants } from '../src/reducers'
import Navigator from './Navigator'

class ThemedApp extends React.Component {
  constructor(props) {
    super(props)
    // loadState(store)
    //   .then(newState => {
    //     console.log('Loaded state scenes:', newState.scenes)
    //     if (!newState.settlement_locations) {
    //       console.log('empty!')
    //     }
    //   })
    //   .catch(() => {
    //     console.log(
    //       'Failed to load previous state. TODO, load state from static data file or remote one?'
    //     )
    //   })
  }
  state = {
    appState: AppState.currentState,
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
      // do nothing
    }
    if (
      this.state.appState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      console.log('App has come to the background!')
      store.dispatch({ type: constants.SAVE_STATE })
    }

    this.setState({ appState: nextAppState })
  }

  render() {
    return (
      <StyleProvider style={theme}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </StyleProvider>
    )
  }
}

export default ThemedApp
