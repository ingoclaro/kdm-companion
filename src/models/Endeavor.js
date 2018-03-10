import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { lateRecipe } from './Recipe'

export const Endeavor = lateEndeavor()

export function lateEndeavor() {
  return types.model('Endeavor', {
    id: types.identifier(types.string),
    name: types.string,
    expansion: types.reference(Expansion),
    recipe: types.late(lateRecipe),
  })
}
