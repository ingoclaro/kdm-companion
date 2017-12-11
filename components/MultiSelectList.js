import React from 'react'
import { FlatList } from 'react-native'

import CheckboxListItem from './CheckboxListItem'

export default class MultiSelectList extends React.PureComponent {
  state = { selected: (new Map(): Map<string, boolean>) }

  _keyExtractor = (item, index) => item.id

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected)
      selected.set(id, !selected.get(id)) // toggle
      return { selected }
    })
  }

  _renderItem = ({ item }) => (
    <CheckboxListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  )

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        disableVirtualization
      />
    )
  }
}
