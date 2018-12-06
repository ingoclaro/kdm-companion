import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { CampaignType } from './CampaignType'

// TODO: cleanup, see issue #2
const SurvivorEffect = types.model('SurvivorEffect', {
  cannotUseSurvival: types.maybe(types.boolean),
  cannotUseFightingArts: types.maybe(types.boolean),
  cannotUseAbilities: types.maybe(types.boolean),
  skipNextHunt: types.maybe(types.boolean),
  status: types.maybe(types.enumeration(['alive', 'dead', 'retired'])),
  bleedingTokens: 0, // TODO: not used yet
  gainDisorder: false, // TODO: not used yet, if gain automatically need to account when survivor has 3 disorders, user needs to choose which to replace.
  evasion: 0,
  accuracy: 0,
  strength: 0,
  movement: 0,
  speed: 0,
  luck: 0,
  insanity: 0,
  understanding: 0, //TODO: not used yet, can hit a milestone, need to alert user about it.
})

const Ability = types.model('Ability', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  max: 1, // Maximum number of times the ability can be added. Default is 1, some can be recorded twice (severe injuries)
  expansion: types.reference(Expansion),
  campaign: types.maybe(types.reference(CampaignType)), // stuff that only should show on a specific campaign.
  survivorEffects: types.array(SurvivorEffect),
})

export { Ability }
