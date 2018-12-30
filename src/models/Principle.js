import { types } from 'mobx-state-tree'
import { SettlementBonus } from './SettlementBonus'

const Principle = types.model('Principle', {
  id: types.identifier,
  name: types.string,
  bonus: '',
  settlement: types.optional(SettlementBonus, {}),
})

export { Principle }
