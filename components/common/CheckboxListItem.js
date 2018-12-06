import React from 'react'
import { View, Text, Icon, TouchableOpacity } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'
import colors from '../../src/colors'

export default class CheckboxListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id)
  }

  styles = this.props.style

  render() {
    let styleName = this.props.selected ? 'selected' : ''
    if (this.props.styleName) {
      styleName += ` ${this.props.styleName}`
    }
    const Checkbox = this.props.selected ? (
      <Icon name="checkbox-on" style={styles.checkbox} />
    ) : (
      <Icon name="checkbox-off" style={styles.checkbox} />
    )
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View styleName={styleName} style={styles.row}>
          {Checkbox}
          <Text styleName={styleName}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  checkbox: {
    marginRight: 5,
    fontSize: 19,
    color: colors.grey300,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    'shoutem.ui.Text': {
      color: colors.grey300,
      fontSize: 24,
      '.selected': {
        color: colors.grey100,
      },
      '.title': {
        fontSize: 20,
      },
      '.small': {
        fontSize: 18,
      },
    },
  },
}
