import { types } from 'mobx-state-tree'

export const CampaignType = types.model('CampaignType', {
  id: types.identifier,
  name: types.string,
})
