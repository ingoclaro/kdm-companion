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
    get section() {
      return self.monster ? self.monster.name : self.type
    },
  }))

export { Resource }
