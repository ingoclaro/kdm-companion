import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { Endeavor } from './Endeavor'

export function lateSettlementLocation() {
  return types.model('SettlementLocation', {
    id: types.identifier(types.string),
    name: types.string,
    expansion: types.reference(Expansion),
    endeavors: types.optional(types.array(Endeavor), []),
  })
}

export const SettlementLocation = lateSettlementLocation()
