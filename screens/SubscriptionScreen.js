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
import Subscription from '../components/Subscription'
import colors from '../src/colors'

export default class SubscriptionScreen extends React.Component {
  render() {
    return (
      <Screen style={styles.screen}>
        <Subscription />
      </Screen>
    )
  }
}

const styles = {
  screen: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  modal: {
    backgroundColor: colors.grey900,
    padding: 8,
  },
}
