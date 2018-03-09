import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { lateSettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { lateRecipeItem } from './RecipeItem'

export const Endeavor = lateEndeavor()

export function lateEndeavor() {
  const Recipe = types.model('Recipe', {
    location: types.maybe(types.reference(types.late(lateSettlementLocation))),
    innovation: types.maybe(types.reference(Innovation)),
    items: types.array(types.late(lateRecipeItem)),
  })

  return types.model('Endeavor', {
    id: types.identifier(types.string),
    name: types.string,
    expansion: types.reference(Expansion),
    recipe: Recipe,
  })
}
