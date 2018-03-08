import { types } from 'mobx-state-tree'
import { Monster } from './Monster'

const Resource = types.model('Resource', {
  id: types.identifier(types.string),
  // name: types.string,
  monster: types.maybe(types.reference(Monster)),
  type: types.maybe(
    types.enumeration('Type', ['basic', 'strange', 'vermin', 'endeavor'])
  ),
  keywords: types.maybe(types.array(types.string)),
})

export { Resource }
