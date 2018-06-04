import React from 'react'
import { Image, Button } from '@shoutem/ui'

const ico_male = require('../images/male-32.png')
const ico_female = require('../images/female-32.png')

export default class GenderButton extends React.Component {
  constructor(props) {
    super(props)
    this.changeGender = this.changeGender.bind(this)
  }

  state = {
    gender: 'male',
  }

  changeGender() {
    let gender = this.state.gender === 'male' ? 'female' : 'male'
    this.setState({ gender })
  }

  render() {
    let icon = this.state.gender === 'male' ? ico_male : ico_female
    return (
      <Button styleName="clear" onLongPress={this.changeGender}>
        <Image source={icon} style={{ width: 16, height: 16 }} />
      </Button>
    )
  }
}
