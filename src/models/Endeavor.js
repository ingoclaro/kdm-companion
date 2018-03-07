import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { lateSettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { Resource } from './Resource'

export const Endeavor = lateEndeavor()

export function lateEndeavor() {
  const Item = types.model('Resource', {
    resource: types.maybe(types.reference(Resource)),
    keyword: types.maybe(types.string),
    quantity: 0,
  })

  const Recipe = types.model('Recipe', {
    location: types.maybe(types.reference(types.late(lateSettlementLocation))),
    innovation: types.maybe(types.reference(Innovation)),
    items: types.array(Item),
  })

  return types.model('Endeavor', {
    id: types.identifier(types.string),
    name: types.string,
    expansion: types.reference(Expansion),
    recipe: Recipe,
  })
}
