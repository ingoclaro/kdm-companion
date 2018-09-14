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
import { ScrollView } from 'react-native'

export default class SubscriptionScreen extends React.Component {
  render() {
    return (
      <Screen style={styles.screen}>
        <ScrollView>
          <Subscription />
        </ScrollView>
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
