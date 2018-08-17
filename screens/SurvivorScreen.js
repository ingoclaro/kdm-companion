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
        <Survivor survivor="16a7f801-0b64-4847-8516-fb5b79fe0e9a" />
      </Screen>
    )
  }
}
