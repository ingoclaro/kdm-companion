import { getSnapshot } from 'mobx-state-tree'
import { advanceBy, advanceTo, clear } from 'jest-date-mock'
import { Subscription, checkEvery, activeGracePeriod } from './Subscription'

const startTime = 1536939811199

describe('.shouldCheck', () => {
  let sub

  beforeEach(() => {
    advanceTo(startTime)
    sub = Subscription.create({
      transactionId: 'test',
      purchasedAt: startTime,
      checkedAt: startTime,
    })
  })

  afterEach(() => {
    clear()
  })

  it('at moment of purchase', () => {
    expect(sub.shouldCheck()).toBeFalsy()
  })

  it('with old date and an active subscription', () => {
    advanceBy(checkEvery)

    expect(sub.shouldCheck()).toBeTruthy()
  })

  it('with recent date and an active subscription', () => {
    advanceBy(checkEvery - 1)

    expect(sub.shouldCheck()).toBeFalsy()
  })

  it('with old date and an inactive subscription', () => {
    advanceBy(activeGracePeriod)

    expect(sub.shouldCheck()).toBeFalsy()
    expect(sub.hasActiveSubscription()).toBeFalsy()
  })
})

describe('.purchased', () => {
  beforeEach(() => {
    advanceTo(startTime)
  })

  afterEach(() => {
    clear()
  })

  it('handles the IAP response', () => {
    const purchaseResponse = {
      autoRenewingAndroid: true,
      dataAndroid:
        "{orderId: GPA.3327-6252-8328-19548, packageName: 'com.github.ingoclaro.kdmcompanion', productId: 'premium_subscription_1', purchaseTime: 1536906424588, purchaseState: 0, purchaseToken: '[redacted]', autoRenewing: true}",
      productId: 'premium_subscription_1',
      purchaseToken: '[redacted]',
      signatureAndroid: '[redacted]',
      transactionDate: `${startTime}`,
      transactionId: 'GPA.3327-6252-8328-19548',
      transactionReceipt: '[redacted]',
    }
    let sub = Subscription.create()
    sub.purchased(purchaseResponse)

    expect(getSnapshot(sub)).toMatchSnapshot()
  })
})

describe('.hasActiveSubscription', () => {
  let sub

  beforeEach(() => {
    advanceTo(startTime)
    sub = Subscription.create({
      transactionId: 'test',
      purchasedAt: startTime,
      checkedAt: startTime,
    })
  })

  afterEach(() => {
    clear()
  })

  it('at moment of purchase', () => {
    expect(sub.hasActiveSubscription()).toBeTruthy()
  })

  it('after checkEvery', () => {
    advanceBy(checkEvery)
    expect(sub.hasActiveSubscription()).toBeTruthy()
  })

  it('after activeGracePeriod', () => {
    advanceBy(activeGracePeriod)
    expect(sub.hasActiveSubscription()).toBeFalsy()
  })
})
