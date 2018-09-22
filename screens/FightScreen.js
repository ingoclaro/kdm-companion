import React from 'react'
import { Screen, View, Text, Image, Button, Row, Divider } from '@shoutem/ui'
import Modal from 'react-native-modal'
import { observer, inject } from 'mobx-react/native'
import colors from '../src/colors'

import { ShowdownMonsterSelector } from '../components/MonsterSelector'
import MonsterStats from '../components/MonsterStats'
import StatItem from '../components/StatItem'
import Instinct, { InstinctTitle } from '../components/Instinct'
import RichText from '../components/common/RichText'

@inject(({ store }) => ({
  monsterLevel: store.selectedCampaign.showdownMonsterLevel || {},
}))
@observer
export default class FightScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Fight',
  }

  state = {
    instinctVisible: false,
  }

  render() {
    return (
      <Screen>
        <View styleName="horizontal v-center">
          <Text>Monster:</Text>
          <ShowdownMonsterSelector />
        </View>
        {this.props.monsterLevel.showdownExtra && (
          <RichText>{this.props.monsterLevel.showdownExtra}</RichText>
        )}
        <MonsterStats />

        <Divider />

        <StatItem name="Life" baseValue={this.props.monsterLevel.life} />

        <Divider />
        <Divider />

        <Button onPress={() => this.setState({ instinctVisible: true })}>
          <InstinctTitle />
        </Button>
        <Modal
          isVisible={this.state.instinctVisible}
          onBackdropPress={() => this.setState({ instinctVisible: false })}
          onBackButtonPress={() => this.setState({ instinctVisible: false })}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View
            style={{
              backgroundColor: colors.grey900,
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            <Instinct />
            <Divider />
            <Button onPress={() => this.setState({ instinctVisible: false })}>
              <Text>Close</Text>
            </Button>
          </View>
        </Modal>
      </Screen>
    )
  }
}
