import { types } from 'mobx-state-tree'

const Subscription = types
  .model('Subscription', {
    id: types.maybe(types.string), // id of the subscription received.
    response: '', // full json response (in case we need somehting else)
    purchasedAt: 0, // timestamp the subscription was purchased
    checkedAt: 0, // timestamp when was it last checked if the subscription is still active, this should trigger a re-check after some time to make sure we de-active folks that cancelled their subscription.
  })
  .actions(self => ({
    purchased(response) {
      self.response = JSON.stringify(response)
      self.id = 'purchased' // response.xxx ??

      self.purchasedAt = Date.now()
      self.checkedAt = Date.now()
    },
    checked() {
      self.checkedAt = Date.now()
    },
  }))
  .views(self => ({
    get shouldCheck() {
      const toDays = 1000 * 60 * 60 * 24
      const checkEvery = 30 //days
      if (
        self.checkedAt &&
        (Date.now() - self.checkedAt) / toDays >= checkEvery
      ) {
        return true
      } else {
        return false
      }
    },
  }))
export { Subscription }
