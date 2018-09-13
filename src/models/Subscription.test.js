import { getSnapshot } from 'mobx-state-tree'
import { Subscription } from './Subscription'

// afterEach(() => {
//   jest.restoreAllMocks()
// })

it('.shouldCheck with old date', () => {
  let sub = Subscription.create({
    id: 'test',
    purchasedAt: Date.now() - 1000 * 60 * 60 * 24 * 31,
    checkedAt: Date.now() - 1000 * 60 * 60 * 24 * 31,
  })

  expect(sub.shouldCheck).toBeTruthy()
})

it('.shouldCheck with recent date', () => {
  let sub = Subscription.create({
    id: 'test',
    purchasedAt: Date.now() - 1000 * 60 * 60 * 24 * 29,
    checkedAt: Date.now() - 1000 * 60 * 60 * 24 * 29,
  })

  expect(sub.shouldCheck).toBeFalsy()
})
