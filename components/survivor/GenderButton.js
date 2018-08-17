import React from 'react'
import { Image, Button } from '@shoutem/ui'
import PropTypes from 'prop-types'

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
      <Button styleName="clear" onLongPress={this.props.changeGender}>
        <Image source={icon} style={{ width: 16, height: 16 }} />
      </Button>
    )
  }
}
