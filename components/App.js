import React from 'react'
import { AppState } from 'react-native'
import { StyleProvider } from '@shoutem/theme'
import theme from '../src/theme'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import Navigator from './Navigator'

class ThemedApp extends React.Component {
  constructor(props) {
    super(props)
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
      //TODO: save store to disk
    }

    this.setState({ appState: nextAppState })
  }

  render() {
    return (
      <StyleProvider style={theme}>
        <Provider store={this.props.store}>
          <Navigator />
        </Provider>
      </StyleProvider>
    )
  }
}

export default ThemedApp
