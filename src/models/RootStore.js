import { types } from 'mobx-state-tree'
import { SettlementLocation } from './SettlementLocation'
import { Campaign } from './Campaign'
import { Innovation } from './Innovation'
import { Resource } from './Resource'
import { Monster } from './Monster'
import { uuid } from '../utils'

import locationsData from '../data/settlement_locations'
import innovationsData from '../data/innovations'
import resourceData from '../data/resources'
import monsterData from '../data/monsters'

export default types
  .model({
    locations: types.optional(types.map(SettlementLocation), locationsData),
    innovations: types.optional(types.map(Innovation), innovationsData),
    resources: types.optional(types.map(Resource), resourceData),
    monsters: types.optional(types.map(Monster), monsterData),
    // gear: types.map(Gear),
    // principles: types.map(Principle),
    // expansions: types.map(Expansion),
    campaigns: types.optional(types.array(Campaign), [
      {
        id: 'new',
      },
    ]),
    selectedCampaign: types.optional(types.reference(Campaign), 'new'),
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
