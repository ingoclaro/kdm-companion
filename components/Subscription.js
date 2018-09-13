import React from 'react'
import {
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
import { Platform, NativeModules } from 'react-native'
import * as RNIap from 'react-native-iap'
import { observer, inject } from 'mobx-react/native'

import colors from '../src/colors'

function hasIAP() {
  return !!NativeModules.RNIapModule
}

@inject(({ store }) => ({
  subscription: store.subscription,
}))
@observer
export default class Subscription extends React.Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    if (hasIAP()) {
      const itemSkus = Platform.select({
        ios: ['premium_subscription_1'],
        android: ['premium_subscription_1'],
      })
      try {
        await RNIap.initConnection()
        const products = await RNIap.getSubscriptions(itemSkus)
        this.setState({ products })
      } catch (err) {
        console.warn(err) // standardized err.code and err.message available
      }
    }
  }

  componentWillUnmount() {
    if (hasIAP()) {
      RNIap.endConnection()
    }
  }

  subscribed() {
    return (
      <Text>
        Thanks for your support! you are already subscribed to Premium.
      </Text>
    )
  }

  unsubscribed() {
    return (
      <View>
        <Text>
          When you subscribe to Premium you are getting advanced features in the
          app and also support the development of new features.
        </Text>
        <Text>Multiple Settlement support is part of the premium features</Text>
        <Text>{JSON.stringify(this.state.products)}</Text>
      </View>
    )
  }

  render() {
    let text = this.props.subscription.id
      ? this.subscribed()
      : this.unsubscribed()
    return (
      <View>
        <Title>Premium Subscription</Title>
        {text}
      </View>
    )
  }
}

const styles = {
  modal: {
    backgroundColor: colors.grey900,
    padding: 8,
  },
}
