import { types } from 'mobx-state-tree'
import Constants from 'expo-constants'

const toDays = 1000 * 60 * 60 * 24

export const checkEvery = 1 * toDays // 1000 * 60 * 7
export const activeGracePeriod = 31 * toDays // since last check

const Subscription = types
  .model('Subscription', {
    transactionId: types.maybe(types.string), // id of the subscription received.
    productId: '', // product sku purchased.
    response: '', // full json response (in case we need somehting else)
    purchasedAt: 0, // timestamp the subscription was purchased
    autoRenewing: false, // if the subscription is autoRenewing, false => is not going to review, but it might still be active.
    checkedAt: 0, // timestamp when was it last checked if the subscription is still active, this should trigger a re-check after some time to make sure we de-active folks that cancelled their subscription.
    appLastActiveAt: 0, // timestamp when the app was last active (eg: context switched or opened), this is used so that we can re-check if the app is never closed.
  })
  .actions(self => ({
    // when subscription is still active and going to be renewed, the subscription is returned and autoRenewing = true, note that date of purchase is always the first one.
    // when subscription is still active and not going to be renewed, the subscription is returned and autoRenewing = false. Ideally a warning should be displayed in the app and a button to renew the subscription.
    // when subscription already expired, an empty response is returned.
    purchased(response) {
      if (!response || !response.transactionId) {
        self.response = ''
        self.transactionId = undefined
        self.productId = ''
        self.autoRenewing = false
        self.purchasedAt = 0
        self.checkedAt = Date.now()
        return
      }

      let purchasedAt = Number.parseInt(response.transactionDate)
      // only keep the latest purchase
      if (purchasedAt < self.purchasedAt) {
        return
      }

      self.response = JSON.stringify(response)
      self.transactionId = response.transactionId
      self.productId = response.productId
      self.autoRenewing = response.autoRenewingAndroid
      self.purchasedAt = purchasedAt
      self.checkedAt = Date.now()
    },
    updateAppLastActiveAt() {
      self.appLastActiveAt = Date.now()
    },
    // these are actions instead of view to avoid memoization (because Date is used.)
    shouldCheck() {
      if (
        self.hasActiveSubscription() &&
        Date.now() - self.checkedAt >= checkEvery
      ) {
        return true
      } else {
        return false
      }
    },
    hasActiveSubscription() {
      if (
        Constants &&
        Constants.manifest &&
        (Constants.manifest.releaseChannel === undefined ||
          Constants.manifest.releaseChannel === 'default')
      ) {
        return true
      }
      if (self.purchasedAt && Date.now() - self.checkedAt < activeGracePeriod) {
        return true
      }
      return false
    },
  }))
export { Subscription }

// log of check subscription responses
// initial check after a successful subscription
// [10:05:17] purchases Array [
// [10:05:17]   Object {
// [10:05:17]     "autoRenewingAndroid": true,
// [10:05:17]     "dataAndroid": "{\"orderId\":\"GPA.3394-3697-8517-09181\",\"packageName\":\"com.github.ingoclaro.kdmcompanion\",\"productId\":\"premium_subscription_1\",\"purchaseTime\":1536944678259,\"purchaseState\":0,\"purchaseToken\":\"elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ\",\"autoRenewing\":true}",
// [10:05:17]     "productId": "premium_subscription_1",
// [10:05:17]     "purchaseToken": "elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ",
// [10:05:17]     "signatureAndroid": "jJWtCsOSWp355YWNVUClS+wKS+OnezmCsi8L4lWYfZrmpqlm6JFYe7A9iLbTAQLpHY+HaOKOli/EnRgLF82grElDs/DE4ujbARqdXCz2d2Dp6a7vVsQhJLYF3gSLTEgKFDXWIBtnRY1FfocF5CEgiuZ+5pF6keTmQJk9/M5RY5xew408jvSpDfP8haC2jxanPAL6mZ9lJZTOr1lsNhXOtJRJ7BvCRZlXBQYThsaZKt5qBRp9btApq4PlkI8mUCuaKwD5j3kXbZw9ZLHVN1i0guj76+yi54EExjAZ/fitRrjFvLxWo0aZJFqgWtVQ/bXGyw5ZuANr5S2GhxG1JntgkA==",
// [10:05:17]     "transactionDate": "1536944678259",
// [10:05:17]     "transactionId": "GPA.3394-3697-8517-09181",
// [10:05:17]     "transactionReceipt": "elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ",
// [10:05:17]   },
// [10:05:17] ]
// in playstore UI: subscriber since: Sep 14, 2018, 10:04 AM PDT. Renews on: Sep 14, 2018, 10:09 AM PDT.

// after auto renewal (note that json response didn't change):
// [10:10:14] purchases Array [
// [10:10:14]   Object {
// [10:10:14]     "autoRenewingAndroid": true,
// [10:10:14]     "dataAndroid": "{\"orderId\":\"GPA.3394-3697-8517-09181\",\"packageName\":\"com.github.ingoclaro.kdmcompanion\",\"productId\":\"premium_subscription_1\",\"purchaseTime\":1536944678259,\"purchaseState\":0,\"purchaseToken\":\"elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ\",\"autoRenewing\":true}",
// [10:10:14]     "productId": "premium_subscription_1",
// [10:10:14]     "purchaseToken": "elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ",
// [10:10:14]     "signatureAndroid": "jJWtCsOSWp355YWNVUClS+wKS+OnezmCsi8L4lWYfZrmpqlm6JFYe7A9iLbTAQLpHY+HaOKOli/EnRgLF82grElDs/DE4ujbARqdXCz2d2Dp6a7vVsQhJLYF3gSLTEgKFDXWIBtnRY1FfocF5CEgiuZ+5pF6keTmQJk9/M5RY5xew408jvSpDfP8haC2jxanPAL6mZ9lJZTOr1lsNhXOtJRJ7BvCRZlXBQYThsaZKt5qBRp9btApq4PlkI8mUCuaKwD5j3kXbZw9ZLHVN1i0guj76+yi54EExjAZ/fitRrjFvLxWo0aZJFqgWtVQ/bXGyw5ZuANr5S2GhxG1JntgkA==",
// [10:10:14]     "transactionDate": "1536944678259",
// [10:10:14]     "transactionId": "GPA.3394-3697-8517-09181",
// [10:10:14]     "transactionReceipt": "elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ",
// [10:10:14]   },
// [10:10:14] ]
// in playstore UI: subscriber since: Sep 14, 2018, 10:04 AM PDT. Renews on: Sep 14, 2018, 10:14 AM PDT.

// after auto renewal (note that json response didn't change):
// [10:15:06] purchases Array [
// [10:15:06]   Object {
// [10:15:06]     "autoRenewingAndroid": true,
// [10:15:06]     "dataAndroid": "{\"orderId\":\"GPA.3394-3697-8517-09181\",\"packageName\":\"com.github.ingoclaro.kdmcompanion\",\"productId\":\"premium_subscription_1\",\"purchaseTime\":1536944678259,\"purchaseState\":0,\"purchaseToken\":\"elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ\",\"autoRenewing\":true}",
// [10:15:06]     "productId": "premium_subscription_1",
// [10:15:06]     "purchaseToken": "elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ",
// [10:15:06]     "signatureAndroid": "jJWtCsOSWp355YWNVUClS+wKS+OnezmCsi8L4lWYfZrmpqlm6JFYe7A9iLbTAQLpHY+HaOKOli/EnRgLF82grElDs/DE4ujbARqdXCz2d2Dp6a7vVsQhJLYF3gSLTEgKFDXWIBtnRY1FfocF5CEgiuZ+5pF6keTmQJk9/M5RY5xew408jvSpDfP8haC2jxanPAL6mZ9lJZTOr1lsNhXOtJRJ7BvCRZlXBQYThsaZKt5qBRp9btApq4PlkI8mUCuaKwD5j3kXbZw9ZLHVN1i0guj76+yi54EExjAZ/fitRrjFvLxWo0aZJFqgWtVQ/bXGyw5ZuANr5S2GhxG1JntgkA==",
// [10:15:06]     "transactionDate": "1536944678259",
// [10:15:06]     "transactionId": "GPA.3394-3697-8517-09181",
// [10:15:06]     "transactionReceipt": "elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ",
// [10:15:06]   },
// [10:15:06] ]
// in playstore UI: subscriber since: Sep 14, 2018, 10:04 AM PDT. Renews on: Sep 14, 2018, 10:19 AM PDT.

// changing to failed CC, after renewal (note that json response didn't change):
// [10:20:33] purchases Array [
// [10:20:33]   Object {
// [10:20:33]     "autoRenewingAndroid": true,
// [10:20:33]     "dataAndroid": "{\"orderId\":\"GPA.3394-3697-8517-09181\",\"packageName\":\"com.github.ingoclaro.kdmcompanion\",\"productId\":\"premium_subscription_1\",\"purchaseTime\":1536944678259,\"purchaseState\":0,\"purchaseToken\":\"elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ\",\"autoRenewing\":true}",
// [10:20:33]     "productId": "premium_subscription_1",
// [10:20:33]     "purchaseToken": "elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ",
// [10:20:33]     "signatureAndroid": "jJWtCsOSWp355YWNVUClS+wKS+OnezmCsi8L4lWYfZrmpqlm6JFYe7A9iLbTAQLpHY+HaOKOli/EnRgLF82grElDs/DE4ujbARqdXCz2d2Dp6a7vVsQhJLYF3gSLTEgKFDXWIBtnRY1FfocF5CEgiuZ+5pF6keTmQJk9/M5RY5xew408jvSpDfP8haC2jxanPAL6mZ9lJZTOr1lsNhXOtJRJ7BvCRZlXBQYThsaZKt5qBRp9btApq4PlkI8mUCuaKwD5j3kXbZw9ZLHVN1i0guj76+yi54EExjAZ/fitRrjFvLxWo0aZJFqgWtVQ/bXGyw5ZuANr5S2GhxG1JntgkA==",
// [10:20:33]     "transactionDate": "1536944678259",
// [10:20:33]     "transactionId": "GPA.3394-3697-8517-09181",
// [10:20:33]     "transactionReceipt": "elnaofdgfkndkkdbpdmplppl.AO-J1OzCazlSEK0i7DtQVeEXxDYHgsyqjDKJMC9hZjMwyEKCb2uYxjG9Muamb8bdv-5lSs1FyRRr7p8O15JLV70-Ujit8-ywejmFJcWng5aVvqk5nU08yA0nGgBoZuABJxYs7NVTNRWF6nZAs0HP_zrp1DDbD7rijQ",
// [10:20:33]   },
// [10:20:33] ]
// in playstore UI: subscriber since: Sep 14, 2018, 10:04 AM PDT. Renews on: Sep 14, 2018, 10:19 AM PDT.
// + error message "last payment declined"
// after a while a new error message shows with a "fix" call to action: "Payment declined, to keep your subscription, update payment method."
// json response is still the same.
// after some while, subscription is removed automatically, and empty json response.
