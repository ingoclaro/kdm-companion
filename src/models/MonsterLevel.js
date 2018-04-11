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
  huntExtra: types.maybe(types.string), // extra text to show when going out to hunt this monster (see Gorm for example)
  type: types.maybe(types.enumeration(['quarry', 'nemesis'])),
  movement: 0,
  toughness: 0,
  speed: 0,
  damage: 0,
  accuracy: 0,
  luck: 0,
  evasion: 0,
  deck: types.union(types.literal('custom'), Deck),
})
