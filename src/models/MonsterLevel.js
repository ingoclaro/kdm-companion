import { types } from 'mobx-state-tree'

const Deck = types.model('Deck', {
  B: types.number,
  A: types.number,
  L: 0,
  S: types.optional(types.array(types.string), []),
})

export const MonsterLevel = types.model('MonsterLevel', {
  id: types.identifier(types.string),
  name: types.string,
  huntboard: types.maybe(types.string),
  movement: types.number,
  toughness: types.number,
  speed: types.number,
  damage: types.number,
  accuracy: 0,
  luck: 0,
  evasion: 0,
  deck: types.union(types.literal('custom'), Deck),
})
