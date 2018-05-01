import { types } from 'mobx-state-tree'
import { Bonus } from './Bonus'
import { Settlement } from './Settlement'

const Principle = types.model('Principle', {
  id: types.identifier(types.string),
  name: types.string,
  providesBonuses: types.optional(types.array(Bonus), []),
  settlement: types.maybe(Settlement),
})

export { Principle }
