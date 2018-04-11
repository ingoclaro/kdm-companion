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
import Survival from '../components/Survival'
import { HuntMonsterSelector } from '../components/MonsterSelector'

export default class HuntScreen extends React.Component {
  render() {
    return (
      <Screen
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Survival />
        <Divider />
        <View styleName="horizontal v-center">
          <Text>Monster:</Text>
          <HuntMonsterSelector />
        </View>
        <Hunt />
      </Screen>
    )
  }
}
