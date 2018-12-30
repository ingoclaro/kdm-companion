import { types } from 'mobx-state-tree'

export const SurvivorStats = types.model('SurvivorStats', {
  survival: 0,
  insanity: 0,
  'hunt xp': 0,

  movement: 0,
  accuracy: 0,
  strength: 0,
  evasion: 0,
  luck: 0,
  speed: 0,

  courage: 0,
  understanding: 0,

  weaponProficiencyLevel: 0,
})
