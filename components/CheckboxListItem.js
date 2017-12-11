import React from 'react'
import { View, Text, Icon, TouchableOpacity } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'

export default class CheckboxListItem extends React.PureComponent {
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
          <Text styleName={styleName}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  checkbox: {
    marginRight: 5,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    'shoutem.ui.Text': {
      color: 'grey',
      fontSize: 20,
      '.selected': {
        color: 'white',
      },
    },
  },
}

// export default connectStyle('CheckboxListItem', styles)(CheckboxListItem)
