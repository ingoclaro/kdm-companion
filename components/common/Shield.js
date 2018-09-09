import React from 'react'
import { Text, View, ImageBackground } from '@shoutem/ui'

const ico_shield = require('../../images/icon_shield.png')

export default class Shield extends React.Component {
  static defaultProps = {
    value: 1,
  }

  render() {
    return (
      <ImageBackground source={ico_shield} style={styles.image}>
        <Text style={styles.text}>{this.props.value}</Text>
      </ImageBackground>
    )
  }
}

const styles = {
  image: {
    width: 12,
    height: 14,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
  },
}
