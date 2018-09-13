import { types, getSnapshot } from 'mobx-state-tree'
import { SettlementLocation } from './SettlementLocation'
import { Campaign } from './Campaign'
import { Innovation } from './Innovation'
import { Resource } from './Resource'
import { Monster } from './Monster'
import { Gear } from './Gear'
import { Expansion } from './Expansion'
import { Principle } from './Principle'
import { FightingArt, SecretFightingArt } from './FightingArt'
import { Disorder } from './Disorder'
import { Ability } from './Ability'
import { WeaponProficiency } from './WeaponProficiency'
import { Subscription } from './Subscription'
import { uuid } from '../utils'
import R from 'ramda'

import locationsData from '../data/settlement_locations'
import innovationsData from '../data/innovations'
import fightingArtsData from '../data/fightingArts'
import secretFightingArtsData from '../data/secretFightingArts'
import disordersData from '../data/disorders'
import resourceData from '../data/resources'
import monsterData from '../data/monsters'
import gearData from '../data/gear'
import expansionData from '../data/expansions'
import principlesData from '../data/principles'
import abilitiesData from '../data/abilities'
import weaponProficiencyData from '../data/weaponProficiencies'

export default types
  .model('RootStore', {
    locations: types.optional(types.map(SettlementLocation), locationsData),
    innovations: types.optional(types.map(Innovation), innovationsData),
    fightingArts: types.optional(types.map(FightingArt), fightingArtsData),
    secretFightingArts: types.optional(
      types.map(SecretFightingArt),
      secretFightingArtsData
    ),
    disorders: types.optional(types.map(Disorder), disordersData),
    resources: types.optional(types.map(Resource), resourceData),
    monsters: types.optional(types.map(Monster), monsterData),
    gear: types.optional(types.map(Gear), gearData),
    expansions: types.optional(types.map(Expansion), expansionData),
    principles: types.optional(types.map(Principle), principlesData),
    abilities: types.optional(types.map(Ability), abilitiesData),
    weaponProficiencies: types.optional(
      types.map(WeaponProficiency),
      weaponProficiencyData
    ),
    // stuff stored to disc after this
    version: 1,
    campaigns: types.optional(types.array(Campaign), [
      {
        id: 'new',
      },
    ]),
    selectedCampaign: types.optional(types.reference(Campaign), 'new'),
    subscription: types.optional(Subscription, {}),
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
    setVersion(version) {
      self.version = version
    },
    load(data) {
      self.campaigns = data.campaigns
      self.selectedCampaign = data.selectedCampaign
      self.version = data.version || 1
      self.subscription = data.subscription || {}
    },
  }))
  .views(self => ({
    get data() {
      return {
        campaigns: getSnapshot(self.campaigns),
        selectedCampaign: self.selectedCampaign.id,
        version: self.version,
        subscription: getSnapshot(self.subscription),
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
    get availableSecretFightingArts() {
      return R.sortBy(
        R.prop('name'),
        self.selectedExpansionFilter(self.secretFightingArts)
      )
    },
    get availableDisorders() {
      return R.sortBy(
        R.prop('name'),
        self.selectedExpansionFilter(self.disorders)
      )
    },
    get availableAbilities() {
      return R.sortBy(
        R.prop('name'),
        self.selectedExpansionFilter(self.abilities)
      )
    },
    get availableHunts() {
      return self.selectedExpansionFilter(self.monsters)
    },
    get availableWeaponProficiencies() {
      return self.selectedExpansionFilter(self.weaponProficiencies)
    },
    get numCampaigns() {
      return self.campaigns.length
    },
  }))
