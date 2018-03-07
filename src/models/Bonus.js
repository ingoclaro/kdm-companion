import { types } from 'mobx-state-tree'

const Bonus = types.model('Bonus', {
  id: types.identifier(types.string),
  name: types.string,
  description: types.array(types.string),
})

export { Bonus }
