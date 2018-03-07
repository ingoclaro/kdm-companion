import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'

const Instinct = types.model('Instinct', {
  name: types.string,
  description: types.string,
})

const Deck = types.model('Deck', {
  B: types.number,
  A: types.number,
  L: 0,
  S: types.optional(types.array(types.string), []),
})

const Level = types.model('Level', {
  id: types.identifier(types.string),
  movement: types.number,
  toughness: types.number,
  speed: types.number,
  damage: types.number,
  accuracy: 0,
  luck: 0,
  evasion: 0,
  deck: types.union(types.literal('custom'), Deck),
})

const Monster = types.model('Monster', {
  id: types.identifier(types.string),
  name: types.string,
  expansion: types.reference(Expansion),
  instinct: Instinct,
  levels: types.map(Level),
})

export { Monster }
