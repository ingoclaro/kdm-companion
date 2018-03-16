import { types, getSnapshot } from 'mobx-state-tree'
import { SettlementLocation } from './SettlementLocation'
import { Campaign } from './Campaign'
import { Innovation } from './Innovation'
import { Resource } from './Resource'
import { Monster } from './Monster'
import { Gear } from './Gear'
import { Expansion } from './Expansion'
import { uuid } from '../utils'
import R from 'ramda'

import locationsData from '../data/settlement_locations'
import innovationsData from '../data/innovations'
import resourceData from '../data/resources'
import monsterData from '../data/monsters'
import gearData from '../data/gear'
import expansionData from '../data/expansions'

export default types
  .model('RootStore', {
    locations: types.optional(types.map(SettlementLocation), locationsData),
    innovations: types.optional(types.map(Innovation), innovationsData),
    resources: types.optional(types.map(Resource), resourceData),
    monsters: types.optional(types.map(Monster), monsterData),
    gear: types.optional(types.map(Gear), gearData),
    expansions: types.optional(types.map(Expansion), expansionData),
    // principles: types.map(Principle),
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
    deleteCampaign(id) {
      self.campaigns = R.reject(c => c.id === id, self.campaigns)
      if (self.campaigns.length === 0) {
        self.createCampaign('New Settlement')
      } else {
        self.selectedCampaign = self.campaigns[0]
      }
    },
    load(data) {
      self.campaigns = data.campaigns
      self.selectedCampaign = data.selectedCampaign
    },
  }))
  .views(self => ({
    get data() {
      return {
        campaigns: getSnapshot(self.campaigns),
        selectedCampaign: self.selectedCampaign.id,
      }
    },
  }))
