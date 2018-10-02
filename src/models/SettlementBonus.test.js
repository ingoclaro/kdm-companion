import { getSnapshot } from 'mobx-state-tree'
import { SettlementBonus } from './SettlementBonus'

it('initializes', () => {
  let sb = SettlementBonus.create()

  expect(getSnapshot(sb)).toMatchSnapshot()
})

it('.add empty bonus', () => {
  let sb = SettlementBonus.create()
  sb.add({})

  expect(getSnapshot(sb)).toMatchSnapshot()
})

it('.add bonus', () => {
  let sb = SettlementBonus.create()
  sb.add({ strength: 1, description: ['test1', 'test2'] })

  expect(getSnapshot(sb)).toMatchSnapshot()
})

it('.remove empty bonus', () => {
  let sb = SettlementBonus.create()
  sb.remove({})

  expect(getSnapshot(sb)).toMatchSnapshot()
})

it('.remove empty bonus description', () => {
  let bonus = { strength: 1, description: [] }
  let sb = SettlementBonus.create()
  sb.add(bonus)
  sb.remove(bonus)

  expect(getSnapshot(sb)).toMatchSnapshot()
})

it('.remove bonus', () => {
  let sb = SettlementBonus.create()
  sb.add({ strength: 1, description: ['test1', 'test2'] })
  sb.remove({ strength: 1, description: ['test1', 'test2'] })

  expect(getSnapshot(sb)).toMatchSnapshot()
})

it('.remove one bonus', () => {
  let sb = SettlementBonus.create()
  sb.add({ strength: 1, description: ['test1', 'test2'] })
  sb.add({ strength: 1, evasion: 1, description: ['test3'] })
  sb.remove({ strength: 1, description: ['test1', 'test2'] })

  expect(getSnapshot(sb)).toMatchSnapshot()
})
