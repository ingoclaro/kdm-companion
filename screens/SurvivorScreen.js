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

import Survivor from '../components/survivor/Survivor'

export default class SurvivorScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('survivorName', 'Unnamed'), // This isn't working yet.
    }
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
        <Survivor survivorId={this.props.navigation.getParam('survivorId')} />
      </Screen>
    )
  }
}
