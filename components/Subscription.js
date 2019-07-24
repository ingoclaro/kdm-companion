import React from 'react'
import { Button, Divider, Spinner, Text, Title, View } from '@shoutem/ui'
import { Alert, Platform, NativeModules, Linking } from 'react-native'
import RNIap, {
  purchaseUpdatedListener,
  purchaseErrorListener,
  acknowledgePurchaseAndroid,
} from 'react-native-iap'
import { observer, inject } from 'mobx-react'
import Constants from 'expo-constants'

import colors from '../src/colors'

function hasIAP() {
  return !!NativeModules.RNIapModule
}

function isDevMode() {
  if (
    Constants &&
    Constants.manifest &&
    (Constants.manifest.releaseChannel === undefined ||
      Constants.manifest.releaseChannel === 'default')
  ) {
    return true
  } else {
    return false
  }
}

export const SubscriptionUpdater = inject(({ store }) => ({
  subscription: store.subscription,
}))(
  observer(
    class SubscriptionUpdater extends React.Component {
      state = {
        connected: false,
      }

      checkPurchases = async () => {
        if (!this.props.subscription.shouldCheck()) {
          return
        }

        try {
          const purchases = await RNIap.getAvailablePurchases()
          console.log('purchases', purchases)
          if (purchases.length === 0) {
            // no active subscriptions
            this.props.subscription.purchased({})
          }
          purchases.forEach(purchase => {
            this.props.subscription.purchased(purchase)
          })
        } catch (err) {
          if (err.code === 'E_NOT_PREPARED') {
            // lost connection, try to re-connect the next time.
            this.setState({ connected: false })
          } else if (isDevMode()) {
            Alert.alert(err.code, err.message)
          }
          console.warn(err.code, err.message)
        }
      }

      connectIAP = async () => {
        if (this.state.connected) {
          return
        }

        try {
          await RNIap.initConnection()
          this.setState({ connected: true })
        } catch (err) {
          if (err.code === 'E_NOT_ENDED') {
            // already connected, ignore.
            this.setState({ connected: true })
          } else {
            // 'E_SERVICE_ERROR' => store is not available.
            console.warn(err.code, err.message)
            if (isDevMode()) {
              Alert.alert(err.code, err.message)
            }
          }
        }
      }

      async componentDidMount() {
        if (hasIAP()) {
          await this.connectIAP()
          this.checkPurchases() // check right away.
        }
      }

      async componentWillUnmount() {
        if (hasIAP()) {
          try {
            await RNIap.endConnectionAndroid()
          } catch (err) {
            console.warn(err.code, err.message)
            if (isDevMode()) {
              Alert.alert(err.code, err.message)
            }
          }
        }
      }

      async componentDidUpdate(prevProps, prevState, snapshot) {
        if (hasIAP()) {
          await this.connectIAP()
          this.checkPurchases()
        }
      }

      render() {
        return this.props.children
      }
    }
  )
)

export default inject(({ store }) => ({
  subscription: store.subscription,
}))(
  observer(
    class Subscription extends React.Component {
      state = {
        waiting: false,
        //
        // example: [{
        //   introductoryPricePeriodAndroid: '',
        //   introductoryPriceCyclesAndroid: '',
        //   productId: 'premium_subscription_1',
        //   price: '0.99',
        //   currency: 'USD',
        //   type: 'subs',
        //   localizedPrice: '$0.99',
        //   freeTrialPeriodAndroid: 'P5D',
        //   title: 'Premium Subscription (Kingdom Death: Monster Companion)',
        //   description: 'Access premium features of the app',
        //   introductoryPrice: '',
        //   subscriptionPeriodAndroid: 'P1M',
        // }],
        products: [],
        error: false,
        connected: false,
      }

      connectIAP = async () => {
        if (this.state.connected) {
          return true
        }

        let connected = false

        try {
          await RNIap.initConnection()
          connected = true
        } catch (err) {
          if (err.code === 'E_NOT_ENDED') {
            // already connected, ignore.
            connected = true
          } else {
            // 'E_SERVICE_ERROR' => store is not available.
            if (isDevMode()) {
              Alert.alert('connectIAP error', JSON.stringify(err))
            }
            connected = false
          }
        }
        this.setState({ connected })
        return connected
      }

      getSubscriptions = async () => {
        if (!this.state.connected) {
          return true
        }

        const itemSkus = Platform.select({
          ios: ['premium_subscription_1', 'premium_subscription_2'],
          android: ['premium_subscription_1', 'premium_subscription_2'],
        })
        let products = []
        try {
          products = await RNIap.getSubscriptions(itemSkus)
        } catch (err) {
          if (err.code === 'E_NOT_PREPARED') {
            // lost connection, try to re-connect the next time.
            this.setState({ connected: false, error: true })
          } else {
            if (isDevMode()) {
              Alert.alert('getSubscriptions error', JSON.stringify(err))
            }
          }
        }
        return products
      }

      purchaseListenerHandler = null
      purchaseListenerErrorHandler = null
      setupPurchaseListeners = () => {
        this.purchaseListenerHandler = purchaseUpdatedListener(purchase => {
          // if (isDevMode()) {
          //   Alert.alert('purchaseUpdatedListener', JSON.stringify(purchase))
          // }
          if (purchase.transactionId) {
            this.props.subscription.purchased(purchase)
            this.setState({ error: false, waiting: false })

            if (
              Platform.OS === 'android' &&
              purchase.isAcknowledgedAndroid === false
            ) {
              acknowledgePurchaseAndroid(purchase.purchaseToken)
            }
          }
        })
        this.purchaseListenerErrorHandler = purchaseErrorListener(error => {
          switch (error.responseCode) {
            case 7: // 7 -> already purchased?
              this.checkPurchases()
              this.setState({ error: false })
              break
            case 1:
              this.setState({ error: false })
              break
            default:
              // 1 -> user cancelled (back button)
              // 6 -> CC failure.
              this.setState({ error: true })
              if (isDevMode()) {
                Alert.alert('purchaseErrorListener', JSON.stringify(error))
              }
          }
          this.setState({ waiting: false })
        })
      }

      buySubscribeItem = sku => {
        if (!this.state.connected) {
          return true
        }

        this.setState({ error: false, waiting: true })
        RNIap.requestSubscription(sku)
      }

      checkPurchases = async () => {
        try {
          this.setState({ error: false, waiting: true })
          const purchases = await RNIap.getAvailablePurchases()
          // if (isDevMode()) {
          //   Alert.alert('purchases', JSON.stringify(purchases))
          // }
          if (purchases.length === 0) {
            // no active subscriptions
            this.props.subscription.purchased({})
            if (this.state.products.length === 0) {
              let products = await this.getSubscriptions()
              let error = products.length === 0
              this.setState({ products, error })
            }
          }
          purchases.forEach(purchase => {
            this.props.subscription.purchased(purchase)
          })
          this.setState({ waiting: false })
        } catch (err) {
          if (err.code === 'E_NOT_PREPARED') {
            // lost connection, try to re-connect the next time.
            this.setState({ connected: false, error: true, waiting: false })
          } else if (isDevMode()) {
            Alert.alert('checkPurchases error', JSON.stringify(err))
          }
        }
      }

      async componentDidMount() {
        if (hasIAP() && !this.props.subscription.hasActiveSubscription()) {
          let result = await this.connectIAP()
          if (!result) {
            this.setState({ waiting: false, error: true })
          } else {
            let products = await this.getSubscriptions()
            let error = products.length === 0
            this.setState({ products, waiting: false, error })
            this.setupPurchaseListeners()
          }
        }
      }

      async componentDidUpdate(prevProps, prevState, snapshot) {
        if (hasIAP() && !this.state.connected) {
          this.connectIAP()
        }
      }

      async componentWillUnmount() {
        if (hasIAP()) {
          try {
            if (this.purchaseListenerHandler) {
              this.purchaseListenerHandler.remove()
              this.purchaseListenerHandler = null
            }
            if (this.purchaseListenerErrorHandler) {
              this.purchaseListenerErrorHandler.remove()
              this.purchaseListenerErrorHandler = null
            }
            await RNIap.endConnectionAndroid()
          } catch (err) {
            if (err.code === 'endConnection') {
              // already ended, ignore.
            } else {
              if (isDevMode()) {
                Alert.alert('componentWillUnmount error', JSON.stringify(err))
              }
            }
          }
        }
      }

      subscribed() {
        const url = `https://play.google.com/store/account/subscriptions?sku=${this.props.subscription.productId}&package=com.github.ingoclaro.kdmcompanion`
        return (
          <View>
            <Text>
              Thanks for your support! you are already subscribed to Premium.
            </Text>
            <Text>
              Your Order id is {this.props.subscription.transactionId}
            </Text>
            <Divider />
            <Button onPress={() => Linking.openURL(url)}>
              <Text>Manage Subscription</Text>
            </Button>
            {isDevMode() && (
              <View>
                <Divider />
                <Button onPress={this.checkPurchases}>
                  <Text>Force Subscription Check</Text>
                </Button>
              </View>
            )}
          </View>
        )
      }

      unsubscribed() {
        return (
          <View>
            <Text>This feature is only enabled for Premium users.</Text>

            <Divider />

            <Text>
              It takes lots of time and effort to develop and maintain this
              application, and I want it the best it can be. Other apps have
              ads, but I don't like them because they clutter the interface and
              affect the user experience, so instead this app has a subscription
              model to unlock the more advanced features of the app. Please
              consider supporting the app by becoming a subscriber.
            </Text>

            <Divider />

            <Text>
              By becoming a Premium subscriber you can unlock advanced features
              and also you will be supporting further development of the app. If
              you feel generous you can contribute more (buy me a coffee)
            </Text>
            <Divider />
            {this.state.error && (
              <View>
                <Text style={styles.error}>
                  An error ocurred contacting the store.
                </Text>
                <Text style={styles.error}>Please try again later.</Text>
              </View>
            )}

            {this.state.products.map((prod, idx) => (
              <View key={idx}>
                <Button onPress={() => this.buySubscribeItem(prod.productId)}>
                  {this.state.waiting && (
                    <Spinner style={styles.buttonSpinner} />
                  )}
                  <Text>Subscribe for {prod.localizedPrice}</Text>
                </Button>
                <Divider />
              </View>
            ))}
          </View>
        )
      }

      render() {
        let text = this.props.subscription.hasActiveSubscription()
          ? this.subscribed()
          : this.unsubscribed()
        return (
          <View>
            <Title>Premium Subscription</Title>
            {text}
            {this.state.waiting && this.state.products.length === 0 && (
              <View styleName="horizontal">
                <Text>Connecting to the store</Text>
                <Spinner />
              </View>
            )}
          </View>
        )
      }
    }
  )
)

const styles = {
  modal: {
    backgroundColor: colors.grey900,
    padding: 8,
  },
  error: {
    color: colors.red900,
  },
  buttonSpinner: {
    color: colors.grey900,
  },
}
