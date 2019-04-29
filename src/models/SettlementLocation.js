import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { CampaignType } from './CampaignType'
import { lateEndeavor } from './Endeavor'

export function lateSettlementLocation() {
  return types.model('SettlementLocation', {
    id: types.identifier,
    name: types.string,
    expansion: types.reference(Expansion),
    campaigns: types.optional(types.map(types.reference(CampaignType)), {
      potl: 'potl',
      pots: 'pots',
      potsun: 'potsun',
    }),
    endeavors: types.array(types.late(lateEndeavor)),
  })
}

export const SettlementLocation = lateSettlementLocation()
