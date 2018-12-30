import { types } from 'mobx-state-tree'
import { SettlementBonus } from './SettlementBonus'

// all are optional because it's used by innovations as well.
export const SettlementStats = types.model('SettlementStats', {
  departing: types.optional(SettlementBonus, {}),
  newborn: types.optional(SettlementBonus, {}),
  showdown: types.optional(SettlementBonus, {}),
})
