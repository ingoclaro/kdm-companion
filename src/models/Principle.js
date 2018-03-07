import { types } from 'mobx-state-tree'

const Principle = types.model('Principle', {
  id: types.identifier(types.string),
  name: types.string,
})

export { Principle }
