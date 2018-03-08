import React from 'react'
import {
  Screen,
  Button,
  View,
  Text,
  Title,
  Image,
  DropDownMenu,
  Row,
  Icon,
  Divider,
  TextInput,
} from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'

import colors from '../src/colors'

@inject('store')
@observer
export default class Settlements extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    createName: null,
    editName: null,
  }

  create() {
    return (
      <View>
        <Title>Create new Settlement:</Title>
        <TextInput
          placeholder={'Settlement name'}
          onChangeText={name => this.setState({ createName: name })}
          value={this.state.createName}
        />
        <Divider />
        <Button
          onPress={() => {
            this.props.store.createCampaign(this.state.createName)
            this.setState({ createName: null, editName: this.state.createName })
          }}
        >
          <Text>Create</Text>
        </Button>
      </View>
    )
  }

  update() {
    return (
      <View>
        <Title>Update Name:</Title>
        <TextInput
          placeholder={'Settlement name'}
          onChangeText={name => this.setState({ editName: name })}
          value={this.state.editName}
        />
        <Divider />
        <Button
          onPress={() => {
            this.props.store.selectedCampaign.settlement.updateName(
              this.state.editName
            )
            this.forceUpdate()
          }}
        >
          <Text>Update</Text>
        </Button>
      </View>
    )
  }

  select() {
    return (
      <View>
        <Title>Select a Settlement:</Title>
        <DropDownMenu
          options={this.props.store.campaigns.peek()}
          selectedOption={this.props.store.selectedCampaign}
          onOptionSelected={selected => {
            this.props.store.selectCampaign(selected.id)
            this.setState({ editName: selected.name })
          }}
          titleProperty="name"
          valueProperty="id"
        />
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.props.store.campaigns.length > 0 ? this.select() : null}
        {this.props.store.selectedCampaign ? this.update() : null}
        <Divider />
        <Divider />
        {this.create()}
      </View>
    )
  }
}
