import { types } from 'mobx-state-tree'
import { Settlement } from './Settlement'

const Principle = types.model('Principle', {
  id: types.identifier,
  name: types.string,
  bonus: '',
  settlement: types.optional(Settlement, {}),
})

export { Principle }
