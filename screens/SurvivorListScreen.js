import React from 'react'
import {
  Screen,
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Row,
  Caption,
  Divider,
} from '@shoutem/ui'

import SurvivorList from '../components/survivor/SurvivorList'

export default class SurvivorScreen extends React.Component {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
  }

  navigate(survivorId, survivorName) {
    this.props.navigation.navigate('Survivor', {
      survivorId,
      title: survivorName,
    })
  }

  render() {
    return (
      <Screen
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          // paddingTop: 5,
          paddingLeft: 5,
        }}
      >
        <SurvivorList navigate={this.navigate} />
      </Screen>
    )
  }
}
