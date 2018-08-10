import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'

const FightingArt = types.model('FightingArt', {
  id: types.identifier(types.string),
  name: types.string,
  description: types.string,
  expansion: types.reference(Expansion),
})

export { FightingArt }
