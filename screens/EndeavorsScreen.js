import React from 'react'
import { Screen } from '@shoutem/ui'
import Endeavors from '../components/Endeavors'

export default class EndeavorsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Endeavors',
  }

  render() {
    return (
      <Screen
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingHorizontal: 5,
        }}
      >
        <Endeavors />
      </Screen>
    )
  }
}
