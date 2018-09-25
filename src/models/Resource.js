import { types } from 'mobx-state-tree'
import { Monster } from './Monster'
import { Expansion } from './Expansion'
import { capitalize } from '../utils'

const Resource = types
  .model('Resource', {
    id: types.identifier,
    // name: types.string,
    monster: types.maybe(types.reference(Monster)), // could be a monster resource or a generic type.
    type: types.maybe(
      types.enumeration('Type', ['basic', 'strange', 'vermin', 'endeavor'])
    ),
    expansion: types.optional(types.reference(Expansion), 'core'),
    keywords: types.array(types.string),
  })
  .views(self => ({
    get name() {
      return capitalize(self.id)
    },
    get section_id() {
      let id = null
      if (self.monster) {
        id = self.monster.id
      } else if (self.type) {
        id = self.type
      }
      return id
    },
  }))

export { Resource }
