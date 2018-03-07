import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'

const Innovation = types.model('Innovation', {
  id: types.identifier(types.string),
  name: types.string,
  expansion: types.reference(Expansion),
  keywords: types.maybe(types.array(types.string)),
})

export { Innovation }
