import React from 'react'
import { Screen, View, Text, Image, Button, Row, Divider } from '@shoutem/ui'
import Modal from 'react-native-modal'
import colors from '../src/colors'

import { ShowdownMonsterSelector } from '../components/MonsterSelector'
import MonsterStats from '../components/MonsterStats'
import StatItem from '../components/StatItem'
import BasicAction from '../components/BasicAction'

export default class FightScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Fight',
  }

  state = {
    basicActionVisible: false,
  }

  render() {
    return (
      <Screen>
        <View styleName="horizontal v-center">
          <Text>Monster:</Text>
          <ShowdownMonsterSelector />
        </View>
        <MonsterStats />

        <Divider />

        <StatItem name="Life" baseValue={0} />

        <Divider />
        <Divider />

        <Button onPress={() => this.setState({ basicActionVisible: true })}>
          <Text>Basic Action</Text>
        </Button>
        <Modal
          isVisible={this.state.basicActionVisible}
          onBackdropPress={() => this.setState({ basicActionVisible: false })}
          onBackButtonPress={() => this.setState({ basicActionVisible: false })}
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
            <BasicAction />
            <Divider />
            <Button
              onPress={() => this.setState({ basicActionVisible: false })}
            >
              <Text>Close</Text>
            </Button>
          </View>
        </Modal>
      </Screen>
    )
  }
}
