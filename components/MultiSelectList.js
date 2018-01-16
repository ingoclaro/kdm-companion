import React from 'react'
import { FlatList } from 'react-native'
import { kea } from 'kea'
import PropTypes from 'prop-types'

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

export default kea(keaOptions)(MultiSelectList)
