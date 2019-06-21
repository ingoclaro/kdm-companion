import React from 'react'
import { AppState } from 'react-native'
import { StyleProvider } from '@shoutem/theme'
import theme from '../src/theme'
import { Provider } from 'mobx-react'
import { onSnapshot, setLivelynessChecking } from 'mobx-state-tree'
import { save } from '../src/filesystem'
import Navigator from './Navigator'
import { SubscriptionUpdater } from '../components/Subscription'
// import { useScreens } from 'react-native-screens'
// useScreens() // commented out because campaign menu shows blank

class ThemedApp extends React.Component {
  constructor(props) {
    super(props)
    setLivelynessChecking('error')
    this.snapshotDisposer = onSnapshot(this.props.store, snapshot => {
      save(this.props.store)
    })
  }

  state = {
    appState: AppState.currentState,
  }
  snapshotDisposer = undefined

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
    if (this.snapshotDisposer) {
      this.snapshotDisposer()
    }
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.props.store.subscription.updateAppLastActiveAt()
    }
    // if (
    //   this.state.appState === 'active' &&
    //   nextAppState.match(/inactive|background/)
    // ) {
    //   save(this.props.store)
    // }

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
