import React from 'react'
import { View, Text } from '@shoutem/ui'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

export default class Tooltip extends React.Component {
  static defaultProps = {
    visible: true,
  }

  render() {
    if (!this.props.visible) {
      return null
    }
    return (
      <View style={styles.tooltip}>
        <View style={styles.tooltipArrow} />
        <View style={styles.tooltipTextContainer}>{this.props.children}</View>
      </View>
    )
  }
}

const styles = {
  tooltip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.grey700,
    transform: [{ rotate: '-90deg' }],
  },
  tooltipTextContainer: {
    borderRadius: 4,
    padding: 4,
    backgroundColor: colors.grey700,
  },
  // tooltipText: {
  //   fontSize: 9,
  // },
}
