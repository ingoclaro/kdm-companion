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
import { kea } from 'kea'
import PropTypes from 'prop-types'
import R from 'ramda'
import colors from '../src/colors'

function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    a => (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)[0]
  )
}

class Settlements extends React.Component {
  constructor(props) {
    super(props)
  }

  selectSettlement() {
    return (
      <View>
        <Title>Select a Settlement:</Title>
        <DropDownMenu
          options={this.props.settlements}
          selectedOption={this.props.selectedObject}
          onOptionSelected={selected => this.actions.select(selected)}
          titleProperty="name"
          valueProperty="id"
        />
      </View>
    )
  }

  render() {
    let selector = null
    if (this.props.settlements.length > 0) {
      selector = this.selectSettlement()
    }
    return (
      <View>
        {selector}
        <Title>Create new Settlement:</Title>
        <TextInput
          placeholder={'Settlement name'}
          onChangeText={name => this.actions.settlementName(name)}
          value={this.props.name}
        />
        <Divider />
        <Button onPress={() => this.actions.create(this.props.name)}>
          <Text>Create</Text>
        </Button>
      </View>
    )
  }
}
Settlements.propTypes = {
  settlements: PropTypes.array.isRequired,
  selectedObject: PropTypes.object,
  name: PropTypes.string,
}

const settlementsLogic = kea({
  path: () => ['scenes', 'settlements'],
  actions: () => ({
    create: name => ({ id: uuid(), name }),
    select: settlement => settlement,
    settlementName: name => ({ name }),
  }),
  reducers: ({ actions }) => ({
    settlements: [
      [],
      PropTypes.array,
      {
        [actions.create]: (state, payload) => {
          return [...state, { id: payload.id, name: payload.name }]
        },
      },
    ],
    selected: [
      '',
      PropTypes.string,
      {
        [actions.select]: (state, payload) => {
          return payload.id
        },
      },
    ],
    name: [
      '',
      PropTypes.string,
      {
        [actions.settlementName]: (state, payload) => {
          return payload.name
        },
        [actions.create]: (state, payload) => '',
      },
    ],
  }),
  selectors: ({ selectors }) => ({
    selectedObject: [
      () => [selectors.selected, selectors.settlements],
      (selected, settlements) => {
        let item = settlements.find(element => {
          return element.id === selected
        })
        return item || settlements[0]
      },
      PropTypes.object,
    ],
  }),
})

const connectedSettlements = settlementsLogic(Settlements)

const styles = {}

export default connectedSettlements
export { settlementsLogic as logic }
