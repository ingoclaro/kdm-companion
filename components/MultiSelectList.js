import React from 'react'
import { FlatList } from 'react-native'
import { View, Text, Icon, TouchableOpacity } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'

class DefaultListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id)
  }

  styles = this.props.style

  render() {
    const styleName = this.props.selected ? 'selected' : ''
    const Checkbox = this.props.selected ? (
      <Icon name="checkbox-on" style={styles.checkbox} />
    ) : (
      <Icon name="checkbox-off" style={styles.checkbox} />
    )
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View styleName={styleName} style={styles.row}>
          {Checkbox}
          <Text styleName="md-gutter">{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class MultiSelectList extends React.PureComponent {
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
    <DefaultListItem
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

const styles = {
  checkbox: {
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    text: {
      color: 'red',
    },
  },
}

export default connectStyle('kdm-companion.SettlementScreen', styles)(MultiSelectList)
