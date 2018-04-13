import { types, getSnapshot } from 'mobx-state-tree'
import R from 'ramda'

export const SettlementBonus = types
  .model('SettlementBonus', {
    survival: types.maybe(types.number),
    accuracy: types.maybe(types.number),
    strength: types.maybe(types.number),
    evasion: types.maybe(types.number),
    insanity: types.maybe(types.number),
    courage: types.maybe(types.number),
    understanding: types.maybe(types.number),
    'hunt xp': types.maybe(types.number),
    description: types.maybe(types.array(types.string)),
  })
  .actions(self => ({
    add(bonus) {
      self.survival += bonus.survival || 0
      self.accuracy += bonus.accuracy || 0
      self.strength += bonus.strength || 0
      self.evasion += bonus.evasion || 0
      self.insanity += bonus.insanity || 0
      self.courage += bonus.courage || 0
      self.understanding += bonus.understanding || 0
      self['hunt xp'] += bonus['hunt xp'] || 0

      if (bonus.description) {
        if (!self.description) {
          self.description = []
        }
        self.description = self.description.concat(bonus.description)
      }
    },
    remove(bonus) {
      self.survival -= bonus.survival || 0
      self.accuracy -= bonus.accuracy || 0
      self.strength -= bonus.strength || 0
      self.evasion -= bonus.evasion || 0
      self.insanity -= bonus.insanity || 0
      self.courage -= bonus.courage || 0
      self.understanding -= bonus.understanding || 0
      self['hunt xp'] -= bonus['hunt xp'] || 0

      self.description = R.filter(text => {
        return !bonus.description.includes(text)
      }, self.description)
    },
  }))

export const init = {
  survival: 0,
  accuracy: 0,
  strength: 0,
  evasion: 0,
  insanity: 0,
  courage: 0,
  understanding: 0,
  'hunt xp': 0,
  description: [],
}
