import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { MonsterLevel } from './MonsterLevel'

const Instinct = types.model('Instinct', {
  name: types.string,
  description: types.string,
})

const Monster = types.model('Monster', {
  id: types.identifier,
  name: types.string,
  expansion: types.reference(Expansion),
  type: types.optional(types.enumeration(['quarry', 'nemesis']), 'nemesis'),
  instinct: Instinct,
  levels: types.map(MonsterLevel),
})

export { Monster }
