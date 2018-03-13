import { types } from 'mobx-state-tree'
// manual ref: import { SettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { RecipeItem } from './RecipeItem'

export function lateRecipe() {
  return types.model('Recipe', {
    location: types.maybe(types.string), // manual ref to location because circular dependency
    not_location: types.maybe(types.string), // manual ref to location
    innovation: types.maybe(types.reference(Innovation)),
    not_innovation: types.maybe(types.reference(Innovation)),
    items: types.array(RecipeItem),
  })
}

export const Recipe = lateRecipe()
