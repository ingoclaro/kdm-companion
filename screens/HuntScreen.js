import React from 'react'
import {
  Screen,
  View,
  Text,
  Title,
  Caption,
  Subtitle,
  Divider,
} from '@shoutem/ui'

import Hunt from '../components/Hunt'

export default class HuntScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Hunt',
  }

  render() {
    return (
      <Screen
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Title>Survival</Title>
        <Subtitle>Departing: +2. Limit: 3</Subtitle>
        <Caption>+1 for Language</Caption>
        <Caption>+1 for YYYY</Caption>
        <Divider />
        <Hunt />
      </Screen>
    )
  }
}
