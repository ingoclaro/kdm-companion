import React from 'react'
import { View, Text, Image } from '@shoutem/ui'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

export default class AttributeSmall extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    icon: PropTypes.any, // image element
    text: PropTypes.string, // character
  }

  render() {
    let styleName =
      this.props.value < 0 ? 'attributeTextNegative' : 'attributeText'
    if (this.props.label === 'Movement' && this.props.value < 6) {
      styleName = 'attributeTextNegative'
    }
    return (
      <View styleName="horizontal" style={styles.attributeContainer}>
        <Text style={styles[styleName]}>{this.props.value}</Text>
        {this.props.icon ? (
          <Image source={this.props.icon} style={{ width: 16, height: 16 }} />
        ) : (
          <Text>{this.props.text}</Text>
        )}
      </View>
    )
  }
}

const styles = {
  attributeText: {
    paddingRight: 2,
  },
  attributeTextNegative: {
    paddingRight: 2,
    color: colors.red800,
  },
  attributeContainer: {
    justifyContent: 'flex-end',
    marginHorizontal: 3,
    width: 34,
  },
}
