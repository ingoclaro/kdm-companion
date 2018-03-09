import { types } from 'mobx-state-tree'
import { lateSettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { Resource } from './Resource'
import { Expansion } from './Expansion'
import { lateRecipeItem } from './RecipeItem'

export function lateGear() {
  const Recipe = types.model('Recipe', {
    location: types.maybe(types.reference(types.late(lateSettlementLocation))),
    innovation: types.maybe(types.reference(Innovation)),
    items: types.array(types.late(lateRecipeItem)),
  })

  return types.model('Gear', {
    id: types.identifier(types.string),
    name: types.string,
    expansion: types.reference(Expansion),
    recipes: types.maybe(types.array(Recipe)),
  })
}

export const Gear = lateGear()
