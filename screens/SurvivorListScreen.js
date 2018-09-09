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
import { ScrollView } from 'react-native'

import SurvivorList from '../components/survivor/SurvivorList'
import CreateButton from '../components/survivor/CreateButton'

export default class SurvivorScreen extends React.Component {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
  }

  navigate(survivorId, edit = false) {
    this.props.navigation.navigate('Survivor', {
      survivorId,
      edit,
    })
  }

  render() {
    return (
      <Screen
        style={{
          paddingTop: 5,
          paddingLeft: 5,
        }}
      >
        <ScrollView>
          <SurvivorList navigate={this.navigate} />
          <Divider />
          <CreateButton navigate={this.navigate} />
        </ScrollView>
      </Screen>
    )
  }
}
