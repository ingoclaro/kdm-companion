import React from 'react'
import {
  View,
  Button,
  Image,
  Divider,
  Title,
  Caption,
  Text,
  Row,
  Icon,
} from '@shoutem/ui'
import Modal from 'react-native-modal'
import { observer, inject } from 'mobx-react/native'

import colors from '../src/colors'

import Innovations, { InnovationsItems } from './Innovations'
import Locations, { LocationItems } from './Locations'
import Principles, { PrinciplesItems } from './Principles'
import Note from './common/Note'

@inject(({ store }) => ({
  notes: store.selectedCampaign.notes,
  saveNotes: store.selectedCampaign.saveNotes,
}))
@observer
export default class SettlementSummary extends React.Component {
  state = {
    locationsVisible: false,
    innovationsVisible: false,
    principlesVisible: false,
  }

  render() {
    return (
      <View>
        <Button
          styleName="textual"
          style={{ alignSelf: 'flex-start' }}
          onPress={() => this.setState({ locationsVisible: true })}
        >
          <Title>Locations</Title>
          <Icon name="right-arrow" />
        </Button>
        <Divider styleName="line" />

        <LocationItems />

        <Modal
          isVisible={this.state.locationsVisible}
          onBackdropPress={() => this.setState({ locationsVisible: false })}
          onBackButtonPress={() => this.setState({ locationsVisible: false })}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View
            style={{
              backgroundColor: colors.grey900,
              paddingHorizontal: 15,
              paddingVertical: 40,
            }}
          >
            <Locations />
            <Divider />
            <Button onPress={() => this.setState({ locationsVisible: false })}>
              <Text>Close</Text>
            </Button>
          </View>
        </Modal>

        <Divider />

        <Button
          styleName="textual"
          style={{ alignSelf: 'flex-start' }}
          onPress={() => this.setState({ innovationsVisible: true })}
        >
          <Title>Innovations</Title>
          <Icon name="right-arrow" />
        </Button>
        <Divider styleName="line" />
        <InnovationsItems />

        <Modal
          isVisible={this.state.innovationsVisible}
          onBackdropPress={() => this.setState({ innovationsVisible: false })}
          onBackButtonPress={() => this.setState({ innovationsVisible: false })}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View
            style={{
              backgroundColor: colors.grey900,
              paddingHorizontal: 15,
              paddingVertical: 40,
            }}
          >
            <Innovations />
            <Divider />
            <Button
              onPress={() => this.setState({ innovationsVisible: false })}
            >
              <Text>Close</Text>
            </Button>
          </View>
        </Modal>

        <Divider />

        <Button
          styleName="textual"
          style={{ alignSelf: 'flex-start' }}
          onPress={() => this.setState({ principlesVisible: true })}
        >
          <Title>Principles</Title>
          <Icon name="right-arrow" />
        </Button>
        <Divider styleName="line" />
        <PrinciplesItems />

        <Modal
          isVisible={this.state.principlesVisible}
          onBackdropPress={() => this.setState({ principlesVisible: false })}
          onBackButtonPress={() => this.setState({ principlesVisible: false })}
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
            <Principles />
            <Divider />
            <Button onPress={() => this.setState({ principlesVisible: false })}>
              <Text>Close</Text>
            </Button>
          </View>
        </Modal>

        <Divider />

        <Note
          title="Notes"
          notes={this.props.notes}
          saveNote={this.props.saveNotes}
        />
      </View>
    )
  }
}
