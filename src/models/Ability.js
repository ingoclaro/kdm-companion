import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'

const Ability = types.model('Ability', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  max: 1, // Maximum number of times the ability can be added. Default is 1, some can be recorded twice (severe injuries)
  expansion: types.reference(Expansion),
})

export { Ability }
