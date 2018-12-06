import React from 'react'
import {
  Screen,
  View,
  Text,
  Icon,
  Image,
  Button,
  Row,
  Divider,
} from '@shoutem/ui'
import Modal from 'react-native-modal'
import { observer, inject } from 'mobx-react/native'
import colors from '../src/colors'

import { ShowdownMonsterSelector } from '../components/MonsterSelector'
import MonsterSummary from '../components/MonsterSummary'
import MonsterStats from '../components/MonsterStats'
import StatItem from '../components/StatItem'
import Instinct, { InstinctTitle } from '../components/Instinct'
import RichText from '../components/common/RichText'

@inject(({ store }) => ({
  monsterLevel: store.selectedCampaign.showdownMonsterLevel || {},
}))
@observer
export default class FightScreen extends React.Component {
  //TODO: add setup information (in screen, bellow the above buttons)
  //TODO: should add losing/winning outcome?
  //TODO: for more complex setup (eg: watcher), reference page number.

  render() {
    return (
      <Screen style={styles.screen}>
        <View styleName="horizontal v-center">
          <Text>Monster:</Text>
          <ShowdownMonsterSelector />
        </View>
        {this.props.monsterLevel.showdownExtra && (
          <RichText>{this.props.monsterLevel.showdownExtra}</RichText>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Stats: </Text>
          <MonsterSummary />
        </View>

        <Divider />
      </Screen>
    )
  }
}

const styles = {
  screen: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  modal: {
    backgroundColor: colors.grey900,
    padding: 8,
  },
}
