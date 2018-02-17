import React from 'react'
import { FlatList } from 'react-native'
import { kea } from 'kea'
import PropTypes from 'prop-types'
import { View, Row, Text, Caption } from '@shoutem/ui'

import CheckboxListItem from './CheckboxListItem'

const keaOptions = {
  key: props => props.name,
  path: key => ['scenes', 'multiselect', key],
  actions: () => ({
    toggleItem: id => ({ id }),
  }),
  reducers: ({ actions, key, props }) => ({
    selected: [
      {},
      PropTypes.object,
      {
        [actions.toggleItem]: (state, payload) => {
          return payload.key === key
            ? { ...state, [payload.id]: !state[payload.id] }
            : state
        },
      },
    ],
  }),
}
export const logic = kea(keaOptions)

class MultiSelectList extends React.PureComponent {
  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) => (
    <CheckboxListItem
      id={item.id}
      onPressItem={() => this.actions.toggleItem(item.id)}
      selected={!!this.props.selected[item.id]}
      title={item.title}
    />
  )

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.props}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        disableVirtualization
      />
    )
  }
}
MultiSelectList.propTypes = {
  data: PropTypes.array.isRequired,
}
const connectedMultiSelectList = logic(MultiSelectList)
connectedMultiSelectList.propTypes = {
  name: PropTypes.string.isRequired,
}

class MultiSelectItems extends React.PureComponent {
  render() {
    let keys = Object.keys(this.props.items || {})
    let items = keys.filter(item => this.props.items[item])
    // .map(item => <Text key={item}>{item}</Text>)

    return (
      <View>
        <Row>
          {items.length > 0 ? (
            <Caption>{items.join(', ')}</Caption>
          ) : (
            <Caption>{this.props.emptyText}</Caption>
          )}
        </Row>
      </View>
    )
  }
}
const itemsLogic = kea({
  connect: {
    props: [logic.withKey(props => props.name), ['selected as items']],
  },
})

const connectedMultiSelectItems = itemsLogic(MultiSelectItems)

MultiSelectItems.propTypes = {
  items: PropTypes.object,
}

connectedMultiSelectItems.propTypes = {
  name: PropTypes.string.isRequired,
}

export default connectedMultiSelectList
export { connectedMultiSelectItems as MultiSelectItems }
