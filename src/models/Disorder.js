import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'

const Disorder = types.model('Disorder', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  expansion: types.reference(Expansion),
})

export { Disorder }
