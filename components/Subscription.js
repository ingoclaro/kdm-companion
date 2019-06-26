import React from 'react'
import { Button, Divider, Spinner, Text, Title, View } from '@shoutem/ui'
import { Alert, Platform, NativeModules, Linking } from 'react-native'
import RNIap, {
  purchaseUpdatedListener,
  purchaseErrorListener,
  acknowledgePurchaseAndroid,
} from 'react-native-iap'
import { observer, inject } from 'mobx-react'
import { Constants } from 'expo'

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
        if (!this.state.connected) {
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
          this.connectIAP()
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
        if (hasIAP() && this.props.subscription.shouldCheck()) {
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
        showSubscriptionButton: false,
        connected: false,
      }

      connectIAP = async () => {
        if (this.state.connected) {
          return true
        }

        let status = true

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
            status = false
          }
        }
        return status
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
            console.warn(err.code, err.message)
            if (isDevMode()) {
              Alert.alert(err.code, err.message)
            }
          }
        }
        return products
      }

      purchaseListenerHandler = null
      purchaseListenerErrorHandler = null
      setupPurchaseListeners = async () => {
        this.purchaseListenerHandler = purchaseUpdatedListener(
          async purchase => {
            this.setState({ error: false, waiting: false })
            console.log('purchaseUpdatedListener', purchase)
            if (
              purchase.purchaseStateAndroid === 1 &&
              !purchase.isAcknowledgedAndroid
            ) {
              try {
                const ackResult = await acknowledgePurchaseAndroid(
                  purchase.purchaseToken
                )
                console.log('ackResult', ackResult)
              } catch (ackErr) {
                console.warn('ackErr', ackErr)
                this.setState({ error: true, waiting: false })
                return
              }
            }
            if (purchase.transactionId) {
              this.props.subscription.purchased(purchase)
            }
          }
        )
        this.purchaseListenerErrorHandler = purchaseErrorListener(error => {
          this.setState({ error: true, waiting: false })
          console.warn('purchaseErrorListener', error)
          if (isDevMode()) {
            Alert.alert('purchase error', JSON.stringify(error))
          }
        })
      }

      buySubscribeItem = async sku => {
        if (!this.state.connected) {
          return true
        }

        try {
          this.setState({ error: false, waiting: true })
          const request = RNIap.requestSubscription(sku)
        } catch (err) {
          if (err.code === 'E_USER_CANCELLED') {
            // 'E_USER_CANCELLED' => user closed the window without completing purchase
          } else if (err.code === 'E_NOT_PREPARED') {
            // lost connection, try to re-connect the next time.
            this.setState({ connected: false, error: true })
          } else if (err.code === 'E_ALREADY_OWNED') {
            // user already has the subscription, but we don't have it in our side :/, let's synch the purchases.
            await this.checkPurchases()
          } else {
            console.warn(err.code, err.message)
            if (isDevMode()) {
              Alert.alert(err.code, err.message)
            }
            // 'E_UNKNOWN' => CC fails ?
            this.setState({ error: true })
          }
          this.setState({ waiting: false })
        }
      }

      checkPurchases = async () => {
        if (!this.state.connected) {
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

      async componentDidMount() {
        if (hasIAP() && !this.props.subscription.hasActiveSubscription()) {
          let result = await this.connectIAP()
          if (!result) {
            this.setState({ waiting: false, error: true })
          } else {
            let products = await this.getSubscriptions()
            console.log('products', products)
            let error = products.length === 0
            this.setState({ products, waiting: false, error })
            this.setupPurchaseListeners()
          }
        }
      }

      async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
          hasIAP() &&
          !this.props.subscription.hasActiveSubscription() &&
          !this.state.connected
        ) {
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
              console.warn(err.code, err.message)
              if (isDevMode()) {
                Alert.alert(err.code, err.message)
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
