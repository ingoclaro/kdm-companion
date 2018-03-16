import React from 'react'
import { ScrollView } from 'react-native'
import { Screen, View, Button, Divider, Title, Text } from '@shoutem/ui'
import Modal from 'react-native-modal'
import {
  SettlementSelector,
  EditSettlement,
  CreateSettlement,
  DeleteSettlement,
} from '../components/Settlements'
import colors from '../src/colors'

export default class SettlementsScreen extends React.Component {
  state = {
    renameVisible: false,
    createVisible: false,
    deleteVisible: false,
  }

  render() {
    return (
      <Screen style={{ paddingTop: 5, paddingLeft: 5 }}>
        <SettlementSelector />

        <Divider />

        <Button onPress={() => this.setState({ renameVisible: true })}>
          <Text>Rename</Text>
        </Button>

        <Divider />
        <Divider />

        <Button onPress={() => this.setState({ createVisible: true })}>
          <Text>Create Settlement</Text>
        </Button>

        <Divider />
        <Divider />
        <Divider />

        <Button onPress={() => this.setState({ deleteVisible: true })}>
          <Text>Delete Settlement</Text>
        </Button>

        <Modal
          isVisible={this.state.renameVisible}
          onBackdropPress={() => this.setState({ renameVisible: false })}
          onBackButtonPress={() => this.setState({ renameVisible: false })}
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
            <EditSettlement
              onUpdate={() => {
                this.setState({ renameVisible: false })
                //TODO: see how to redraw the Selector above.
              }}
            />
          </View>
        </Modal>

        <Modal
          isVisible={this.state.createVisible}
          onBackdropPress={() => this.setState({ createVisible: false })}
          onBackButtonPress={() => this.setState({ createVisible: false })}
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
            <CreateSettlement
              onCreate={() => {
                this.setState({ createVisible: false })
              }}
            />

            <Divider />

            <Button onPress={() => this.setState({ createVisible: false })}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.deleteVisible}
          onBackdropPress={() => this.setState({ deleteVisible: false })}
          onBackButtonPress={() => this.setState({ deleteVisible: false })}
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
            <DeleteSettlement
              onDelete={() => {
                this.setState({ deleteVisible: false })
              }}
            />

            <Divider />

            <Button onPress={() => this.setState({ deleteVisible: false })}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </Modal>
      </Screen>
    )
  }
}

const styles = {
  delete: {
    backgroundColor: colors.red800,
    borderColor: colors.red900,
  },
}
