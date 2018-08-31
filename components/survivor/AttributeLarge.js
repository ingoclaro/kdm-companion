import React from 'react'
import { View, Text, Image } from '@shoutem/ui'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

export default class AttributeLarge extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    icon: PropTypes.any.isRequired, // image element
    label: PropTypes.string.isRequired,
  }

  render() {
    let styleName =
      this.props.value < 0 ? 'attributeTextNegative' : 'attributeText'
    if (this.props.label === 'Movement' && this.props.value < 6) {
      styleName = 'attributeTextNegative'
    }

    return (
      <View styleName="horizontal v-center">
        <Image source={this.props.icon} style={styles.attributeIcon} />
        <Text>{this.props.label}: </Text>
        <Text style={styles[styleName]}>{this.props.value}</Text>
      </View>
    )
  }
}

const styles = {
  attributeIcon: {
    width: 14,
    height: 14,
    marginRight: 2,
  },
  attributeText: {
    paddingRight: 2,
  },
  attributeTextNegative: {
    paddingRight: 2,
    color: colors.red800,
  },
}
