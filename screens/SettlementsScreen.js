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
import { observer, inject } from 'mobx-react/native'
import colors from '../src/colors'

@inject(({ store }) => ({
  subscription: store.subscription,
}))
@observer
export default class SettlementsScreen extends React.Component {
  state = {
    renameVisible: false,
    createVisible: false,
    deleteVisible: false,
    showSubscriptionWarning: false,
  }

  showCreateModal = () => {
    if (!this.props.subscription.hasActiveSubscription()) {
      this.setState(
        {
          renameVisible: false,
          createVisible: false,
          deleteVisible: false,
        },
        () => this.props.navigation.navigate('Subscription')
      )
    } else {
      this.setState({
        renameVisible: false,
        createVisible: true,
        deleteVisible: false,
      })
    }
  }

  render() {
    return (
      <Screen style={{ paddingTop: 5, paddingLeft: 5 }}>
        <Title>Select a Settlement:</Title>
        <SettlementSelector
          subscribeButton={() => this.props.navigation.navigate('Subscription')}
        />

        <Divider />

        <Button
          onPress={() => {
            this.setState({
              renameVisible: true,
              createVisible: false,
              deleteVisible: false,
            })
          }}
        >
          <Text>Rename</Text>
        </Button>

        <Divider />
        <Divider />

        <Button onPress={this.showCreateModal}>
          <Text>Create Settlement</Text>
        </Button>

        <Divider />
        <Divider />
        <Divider />

        <Button
          onPress={() =>
            this.setState({
              renameVisible: false,
              createVisible: false,
              deleteVisible: true,
            })
          }
        >
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
              subscribeButton={() =>
                this.props.navigation.navigate('Subscription')
              }
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
