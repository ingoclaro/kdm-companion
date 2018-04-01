import { types } from 'mobx-state-tree'
import { Monster } from './Monster'
import { capitalize } from '../utils'

const Resource = types
  .model('Resource', {
    id: types.identifier(types.string),
    // name: types.string,
    monster: types.maybe(types.reference(Monster)),
    type: types.maybe(
      types.enumeration('Type', ['basic', 'strange', 'vermin', 'endeavor'])
    ),
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
    get expansion() {
      let expansion = 'core'
      if (self.monster) {
        // TODO: there might be expansion specific resources (strange?), consider adding expansion to the model with default to 'core'
        expansion = self.monster.expansion
      }
      return expansion
    },
  }))

export { Resource }
