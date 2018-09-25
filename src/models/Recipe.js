import { types } from 'mobx-state-tree'
// manual ref: import { SettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { RecipeItem } from './RecipeItem'

export function lateRecipe() {
  return types.model('Recipe', {
    location: types.maybeNull(types.string), // manual ref to location because circular dependency TODO: could this be changed to late? I think it gave me some problems.
    not_location: types.maybeNull(types.string), // manual ref to location
    innovation: types.maybeNull(types.reference(Innovation)),
    not_innovation: types.maybeNull(types.reference(Innovation)),
    items: types.array(RecipeItem),
  })
}

export const Recipe = lateRecipe()
