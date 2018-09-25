import { types } from 'mobx-state-tree'
import { Bonus } from './Bonus'
import { Settlement } from './Settlement'

const Principle = types.model('Principle', {
  id: types.identifier,
  name: types.string,
  providesBonuses: types.array(Bonus),
  settlement: types.optional(Settlement, {}),
})

export { Principle }
