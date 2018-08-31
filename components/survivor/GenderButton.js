import React from 'react'
import { Image, Button } from '@shoutem/ui'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

const ico_male = require('../../images/male-32.png')
const ico_female = require('../../images/female-32.png')

export default class GenderButton extends React.Component {
  static propTypes = {
    gender: PropTypes.string.isRequired,
    changeGender: PropTypes.func.isRequired,
  }

  render() {
    let icon = this.props.gender === 'male' ? ico_male : ico_female
    return (
      <Button
        styleName="clear"
        style={styles.button}
        onPress={this.props.changeGender}
      >
        <Image source={icon} style={styles.image} />
      </Button>
    )
  }
}

const styles = {
  button: {
    borderColor: colors.grey100,
    borderBottomWidth: 1,
    paddingHorizontal: 2,
  },
  image: {
    width: 16,
    height: 16,
  },
}
