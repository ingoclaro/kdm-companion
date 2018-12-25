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
import SevereInjuryTable from '../components/SevereInjuryTable'
import BrainTraumaTable from '../components/BrainTraumaTable'

@inject(({ store }) => ({
  monsterLevel: store.selectedCampaign.showdownMonsterLevel || {},
}))
@observer
export default class FightScreen extends React.Component {
  //TODO: add setup information (in screen, bellow the above buttons)
  //TODO: should add losing/winning outcome?
  //TODO: for more complex setup (eg: watcher), reference page number.

  state = {
    severeInjuryVisible: false,
    brainTraumaVisible: false,
  }

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

        <Button onPress={() => this.setState({ severeInjuryVisible: true })}>
          <Text>Severe Injury</Text>
        </Button>
        <Divider />
        <Button onPress={() => this.setState({ brainTraumaVisible: true })}>
          <Text>Brain Trauma</Text>
        </Button>
        <Modal
          style={styles.modal}
          isVisible={this.state.severeInjuryVisible}
          onBackdropPress={() => this.setState({ severeInjuryVisible: false })}
          onBackButtonPress={() =>
            this.setState({ severeInjuryVisible: false })
          }
          useNativeDriver={true}
          backdropColor={colors.black}
          avoidKeyboard={false}
        >
          <SevereInjuryTable />
          <Button onPress={() => this.setState({ severeInjuryVisible: false })}>
            <Text>Close</Text>
          </Button>
        </Modal>
        <Modal
          style={styles.modal}
          isVisible={this.state.brainTraumaVisible}
          onBackdropPress={() => this.setState({ brainTraumaVisible: false })}
          onBackButtonPress={() => this.setState({ brainTraumaVisible: false })}
          useNativeDriver={true}
          backdropColor={colors.black}
          avoidKeyboard={false}
        >
          <BrainTraumaTable />

          <Button onPress={() => this.setState({ brainTraumaVisible: false })}>
            <Text>Close</Text>
          </Button>
        </Modal>
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
    padding: 4,
  },
}
