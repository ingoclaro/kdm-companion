import React from 'react'
import { AppState } from 'react-native'
import { StyleProvider } from '@shoutem/theme'
import theme from '../src/theme'
import { Provider } from 'mobx-react'
import { getSnapshot, setLivelynessChecking } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import { save } from '../src/filesystem'
import Navigator from './Navigator'

class ThemedApp extends React.Component {
  constructor(props) {
    super(props)
    setLivelynessChecking('error')
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
      // do nothing
    }
    if (
      this.state.appState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      save(this.props.store)
    }

    this.setState({ appState: nextAppState })
  }

  render() {
    // console.log('store', getSnapshot(this.props.store))
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
