import { types } from 'mobx-state-tree'
import { SurvivorStats } from './SurvivorStats'

export const SettlementStat = types.compose(
  'SettlementStat',
  SurvivorStats,
  types.model({ description: '' })
)

export const SettlementBonus = types.model('SettlementBonus', {
  survival: 0,
  departing: types.optional(SettlementStat, {}),
  newborn: types.optional(SettlementStat, {}),
  showdown: types.optional(SettlementStat, {}),
})
