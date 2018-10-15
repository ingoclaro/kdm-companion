import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { CampaignType } from './CampaignType'

const Ability = types.model('Ability', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  max: 1, // Maximum number of times the ability can be added. Default is 1, some can be recorded twice (severe injuries)
  expansion: types.reference(Expansion),
  campaign: types.maybe(types.reference(CampaignType)), // stuff that only should show on a specific campaign.
})

export { Ability }
