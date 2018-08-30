import { types, getSnapshot } from 'mobx-state-tree'
import { SettlementLocation } from './SettlementLocation'
import { Campaign } from './Campaign'
import { Innovation } from './Innovation'
import { Resource } from './Resource'
import { Monster } from './Monster'
import { Gear } from './Gear'
import { Expansion } from './Expansion'
import { Principle } from './Principle'
import { FightingArt } from './FightingArt'
import { Disorder } from './Disorder'
import { Ability } from './Ability'
import { uuid } from '../utils'
import R from 'ramda'

import locationsData from '../data/settlement_locations'
import innovationsData from '../data/innovations'
import fightingArtsData from '../data/fightingArts'
import disordersData from '../data/disorders'
import resourceData from '../data/resources'
import monsterData from '../data/monsters'
import gearData from '../data/gear'
import expansionData from '../data/expansions'
import principlesData from '../data/principles'
import abilitiesData from '../data/abilities'

export default types
  .model('RootStore', {
    locations: types.optional(types.map(SettlementLocation), locationsData),
    innovations: types.optional(types.map(Innovation), innovationsData),
    fightingArts: types.optional(types.map(FightingArt), fightingArtsData),
    disorders: types.optional(types.map(Disorder), disordersData),
    resources: types.optional(types.map(Resource), resourceData),
    monsters: types.optional(types.map(Monster), monsterData),
    gear: types.optional(types.map(Gear), gearData),
    expansions: types.optional(types.map(Expansion), expansionData),
    principles: types.optional(types.map(Principle), principlesData),
    abilities: types.optional(types.map(Ability), abilitiesData),
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
      self.campaigns.push({ id, settlement: { name: name, survivalLimit: 1 } })
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
    get campaignExpansions() {
      return self.selectedCampaign.expansionList
    },
    selectedExpansionFilter(map) {
      return self.selectedCampaign.selectedExpansionFilter(map)
    },
    get availableLocations() {
      return R.sortBy(
        R.prop('name'),
        self.selectedExpansionFilter(self.locations)
      )
    },
    get availableInnovations() {
      return R.sortBy(
        R.prop('name'),
        self.selectedExpansionFilter(self.innovations)
      )
    },
    get availableFightingArts() {
      return R.sortBy(
        R.prop('name'),
        self.selectedExpansionFilter(self.fightingArts)
      )
    },
    get availableDisorders() {
      return R.sortBy(
        R.prop('name'),
        self.selectedExpansionFilter(self.disorders)
      )
    },
    get availableHunts() {
      return self.selectedExpansionFilter(self.monsters)
    },
    get numCampaigns() {
      return self.campaigns.length
    },
  }))
