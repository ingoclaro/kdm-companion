import { types } from 'mobx-state-tree'
import { Monster } from './Monster'
import { Expansion } from './Expansion'
import { capitalize } from '../utils'

const Resource = types
  .model('Resource', {
    id: types.identifier(types.string),
    // name: types.string,
    monster: types.maybe(types.reference(Monster)),
    type: types.maybe(
      types.enumeration('Type', ['basic', 'strange', 'vermin', 'endeavor'])
    ),
    expansion: types.optional(types.reference(Expansion), 'core'),
    keywords: types.maybe(types.array(types.string)),
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
