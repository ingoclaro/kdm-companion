import { types } from 'mobx-state-tree'

const Deck = types.model('Deck', {
  B: types.integer,
  A: types.integer,
  L: 0,
  S: types.array(types.string),
})

export const MonsterLevel = types.model('MonsterLevel', {
  id: types.identifier,
  name: types.string,
  huntboard: types.maybeNull(types.string),
  huntExtra: types.maybeNull(types.string), // extra text to show when going out to hunt this monster (see Gorm for example)
  type: types.maybeNull(types.enumeration(['quarry', 'nemesis'])),
  movement: 0,
  toughness: 0,
  speed: 0,
  damage: 0,
  accuracy: 0,
  luck: 0,
  evasion: 0,
  deck: types.union(types.literal('custom'), Deck),
})
