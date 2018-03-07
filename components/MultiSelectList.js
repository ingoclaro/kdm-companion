import React from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { View, Row, Text, Caption } from '@shoutem/ui'

import CheckboxListItem from './CheckboxListItem'

class MultiSelectList extends React.PureComponent {
  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) => {
    const selected = this.props.selected ? this.props.selected : {}
    const toggle = this.props.toggle ? this.props.toggle : () => {}
    return (
      <CheckboxListItem
        id={item.id}
        onPressItem={() => toggle(item)}
        selected={!!selected[item.id]}
        title={item.name}
      />
    )
  }

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
  toggle: PropTypes.func.isRequired,
  selected: PropTypes.object,
}

class MultiSelectItems extends React.PureComponent {
  render() {
    let keys = Object.keys(this.props.selectedItems || {})
    let selectedItems = keys.filter(item => this.props.selectedItems[item])
    // .map(item => <Text key={item}>{item}</Text>)

    return (
      <View>
        <Row>
          {selectedItems.length > 0 ? (
            <Caption>
              {selectedItems
                .map(item => this.props.items[item].name)
                .join(', ')}
            </Caption>
          ) : (
            <Caption>{this.props.emptyText}</Caption>
          )}
        </Row>
      </View>
    )
  }
}
MultiSelectItems.propTypes = {
  items: PropTypes.object.isRequired,
}

export default MultiSelectList
export { MultiSelectItems }
