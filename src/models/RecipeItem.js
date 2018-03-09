import { types } from 'mobx-state-tree'
import { Resource } from './Resource'
import { lateGear } from './Gear'

export function lateRecipeItem() {
  return types.model('Resource', {
    resource: types.maybe(types.reference(Resource)),
    gear: types.maybe(types.reference(types.late(lateGear))), //god_mask requires founding_store
    keyword: types.maybe(types.string),
    quantity: 0,
  })
}

export const RecipeItem = lateRecipeItem()
