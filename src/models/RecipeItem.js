import { types } from 'mobx-state-tree'
import { Resource } from './Resource'
import { Gear } from './Gear'

export function lateRecipeItem() {
  return types
    .model('RecipeItem', {
      resource: types.maybeNull(types.reference(Resource)),
      gear: types.maybeNull(types.reference(Gear)), //god_mask requires founding_store
      keyword: types.maybeNull(types.string),
      quantity: 1,
    })
    .views(self => ({
      get name() {
        let name
        if (self.gear) {
          name = self.gear.name
        } else if (self.resource) {
          name = self.resource.name
        } else if (self.keyword) {
          name = self.keyword
        }

        return name
      },
    }))
}

export const RecipeItem = lateRecipeItem()
