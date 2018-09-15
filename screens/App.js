import React from 'react'
import { AppState, View } from 'react-native'
import { StyleProvider } from '@shoutem/theme'
import theme from '../src/theme'
import { Provider } from 'mobx-react'
import { getSnapshot, setLivelynessChecking } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import { save } from '../src/filesystem'
import Navigator from './Navigator'
import { SubscriptionUpdater } from '../components/Subscription'

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
      this.props.store.subscription.updateAppLastActiveAt()
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
    return (
      <StyleProvider style={theme}>
        <Provider store={this.props.store}>
          <SubscriptionUpdater>
            <Navigator />
          </SubscriptionUpdater>
        </Provider>
      </StyleProvider>
    )
  }
}

export default ThemedApp