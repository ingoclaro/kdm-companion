import { types } from 'mobx-state-tree'
import { lateSettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { RecipeItem } from './RecipeItem'

export function lateRecipe() {
  return types.model('Recipe', {
    location: types.maybe(types.reference(types.late(lateSettlementLocation))),
    innovation: types.maybe(types.reference(Innovation)),
    items: types.array(RecipeItem),
  })
}

export const Recipe = lateRecipe()
