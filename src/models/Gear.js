import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { lateRecipe } from './Recipe'

export function lateGear() {
  return types.model('Gear', {
    id: types.identifier(types.string),
    name: types.string,
    expansion: types.reference(Expansion),
    recipes: types.maybe(types.array(types.late(lateRecipe))),
  })
}

export const Gear = lateGear()
