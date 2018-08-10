import { types } from 'mobx-state-tree'

const Expansion = types.model('Expansion', {
  id: types.identifier,
  name: types.string,
})

export { Expansion }
