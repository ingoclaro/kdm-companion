import React from 'react'
import {
  Button,
  Divider,
  DropDownMenu,
  Icon,
  Text,
  TextInput,
  Title,
  TouchableOpacity,
  View,
} from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import { Segment } from 'expo'
import colors from '../src/colors'

@inject(({ store }) => ({
  campaigns: store.campaigns.peek(),
  selectedCampaign: store.selectedCampaign,
  selectCampaign: store.selectCampaign,
  campaignName: store.selectedCampaign.name, // map it so that it redraws when renaming.
  subscription: store.subscription,
}))
@observer
export class SettlementSelector extends React.Component {
  constructor(props) {
    super(props)
  }

  disabledDropdown() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.subscribeButton}>
          <View styleName="horizontal v-center h-center">
            <Text>{this.props.selectedCampaign.name}</Text>
            <Icon
              name="drop-down"
              style={{
                color: colors.grey200,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    if (!this.props.subscription.hasActiveSubscription()) {
      return this.disabledDropdown()
    }
    return (
      <View>
        <DropDownMenu
          options={this.props.campaigns}
          selectedOption={this.props.selectedCampaign}
          onOptionSelected={selected => {
            this.props.selectCampaign(selected.id)
          }}
          titleProperty="name"
          valueProperty="id"
        />
      </View>
    )
  }
}

@inject(({ store }) => ({
  updateName: store.selectedCampaign.settlement.updateName,
  name: store.selectedCampaign.settlement.name,
}))
@observer
export class EditSettlement extends React.Component {
  constructor(props) {
    super(props)
    this.state.editName = this.props.name
  }

  state = {
    editName: null,
  }

  render() {
    return (
      <View>
        <Title>Update Settlement Name:</Title>
        <Divider styleName="line" />
        <Divider />
        <TextInput
          placeholder={'Settlement name'}
          onChangeText={name => this.setState({ editName: name })}
          value={this.state.editName}
          style={styles.input}
        />
        <Divider />
        <Button
          onPress={() => {
            this.props.updateName(this.state.editName)
            if (this.props.onUpdate) {
              this.props.onUpdate()
            }
          }}
        >
          <Text>Update</Text>
        </Button>
      </View>
    )
  }
}

@inject(({ store }) => ({
  createCampaign: store.createCampaign,
  numCampaigns: store.numCampaigns,
  subscription: store.subscription,
}))
@observer
export class CreateSettlement extends React.Component {
  constructor(props) {
    super(props)
    this.onCreate = this.onCreate.bind(this)
  }

  state = {
    createName: null,
  }

  onCreate() {
    this.props.createCampaign(this.state.createName)
    Segment.trackWithProperties('Settlement Created', {
      numSettlements: this.props.numCampaigns + 1,
    })
    this.setState({ createName: null })
    if (this.props.onCreate) {
      this.props.onCreate()
    }
  }

  render() {
    return (
      <View>
        <Title>Create new Settlement:</Title>
        <Divider styleName="line" />
        <Divider />
        <TextInput
          placeholder={'Settlement name'}
          onChangeText={name => this.setState({ createName: name })}
          value={this.state.createName}
          style={styles.input}
        />
        <Divider />
        <Button onPress={this.onCreate}>
          <Text>Create</Text>
        </Button>
      </View>
    )
  }
}

@inject(({ store }) => ({
  delete: store.deleteCampaign,
  campaign: store.selectedCampaign,
  numCampaigns: store.numCampaigns,
}))
@observer
export class DeleteSettlement extends React.Component {
  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
  }

  onDelete() {
    Segment.trackWithProperties('Settlement Deleted', {
      numSettlements: this.props.numCampaigns - 1,
    })
    this.props.delete(this.props.campaign.id)
    if (this.props.onDelete) {
      this.props.onDelete()
    }
  }

  render() {
    return (
      <View>
        <Title>Delete settlement?</Title>
        <Divider styleName="line" />
        <Divider />
        <Text>
          Are you sure you want to delete settlement "{this.props.campaign.name}
          "?
        </Text>
        <Text>This will delete all data associated with that Settlement.</Text>
        <Divider />
        <Button onPress={this.onDelete} style={styles.delete}>
          <Text>DELETE</Text>
        </Button>
      </View>
    )
  }
}

const styles = {
  delete: {
    backgroundColor: colors.red800,
    borderColor: colors.red900,
  },
}
