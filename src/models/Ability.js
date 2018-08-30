import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'

const Ability = types.model('Ability', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  expansion: types.reference(Expansion),
})

export { Ability }
