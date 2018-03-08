import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { lateEndeavor } from './Endeavor'

export function lateSettlementLocation() {
  return types.model('SettlementLocation', {
    id: types.identifier(types.string),
    name: types.string,
    expansion: types.reference(Expansion),
    endeavors: types.optional(types.array(types.late(lateEndeavor)), []),
  })
}

export const SettlementLocation = lateSettlementLocation()
