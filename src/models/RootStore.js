import { types } from 'mobx-state-tree'
import { SettlementLocation } from './SettlementLocation'
import { Campaign } from './Campaign'
import { Innovation } from './Innovation'
import { uuid } from '../utils'

import locationsData from '../data/settlement_locations'
import innovationsData from '../data/innovations'

export const RootStore = types
  .model({
    locations: types.optional(types.map(SettlementLocation), locationsData),
    innovations: types.optional(types.map(Innovation), innovationsData),
    // resources: types.map(Resource),
    // gear: types.map(Gear),
    // monsters: types.map(Monster),
    // principles: types.map(Principle),
    // expansions: types.map(Expansion),
    campaigns: types.optional(types.array(Campaign), []),
    selectedCampaign: types.maybe(types.reference(Campaign)),
  })
  .actions(self => ({
    createCampaign(name) {
      id = uuid()
      self.campaigns.push({ id, settlement: { name: name } })
      self.selectCampaign(id)
    },
    selectCampaign(id) {
      self.selectedCampaign = id
    },
  }))
