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
import { CampaignType } from './CampaignType'
import R from 'ramda'
import { uuid } from '../utils'

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
import campaignTypeData from '../data/campaignTypes'

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
    campaignTypes: types.optional(types.map(CampaignType), campaignTypeData),
    weaponProficiencies: types.optional(
      types.map(WeaponProficiency),
      weaponProficiencyData
    ),
    // stuff stored to disc after this
    version: 5,
    campaigns: types.optional(types.array(Campaign), [{}]),
    selectedCampaign: types.maybe(types.reference(Campaign)),
    subscription: types.optional(Subscription, {}),
  })
  .actions(self => ({
    afterCreate() {
      // auto select the default campaign
      if (!self.selectedCampaign) {
        self.selectCampaign(self.campaigns[0].id)
      }
    },
    createCampaign(name) {
      let campaign = Campaign.create()
      campaign.updateName(name)
      self.campaigns.push(campaign)
      self.selectCampaign(campaign.id)
      return campaign
    },
    selectCampaign(id) {
      self.selectedCampaign = id
    },
    deleteCampaign(id) {
      self.campaigns = R.reject(c => c.id === id, self.campaigns)
      if (self.campaigns.length === 0) {
        self.createCampaign()
      }

      self.selectCampaign(self.campaigns[0].id)
    },
    load(data) {
      // here is where old versions could be upgraded if needed.
      if (!data.version) {
        // upgrade from first release.
        data.version = 2
      }
      switch (data.version) {
        case 1:
        case 2:
        case 3:
          if (data.campaigns) {
            data.campaigns = data.campaigns.map(campaign => {
              let newCampaign = Object.assign({}, campaign)

              // change 'new' id into a uuid
              if (newCampaign.id === 'new') {
                newCampaign.id = uuid()
              }

              // v3
              let survivorKeys = Object.keys(
                newCampaign.settlement.survivors || []
              )
              newCampaign.settlement.activeSurvivorsList = []
              survivorKeys.forEach(key => {
                if (newCampaign.settlement.survivors[key].status !== 'dead') {
                  newCampaign.settlement.activeSurvivorsList.push(key)
                }
              })

              return newCampaign
            })
          }
          break
      }
      data.version = 5

      self.campaigns = data.campaigns

      // handle orphan selectedCampaign
      if (
        !self.campaigns.find(campaign => campaign.id === data.selectedCampaign)
      ) {
        self.selectedCampaign = self.campaigns[0].id
      } else {
        self.selectedCampaign = data.selectedCampaign
      }

      // upgrade version
      self.version = data.version

      // initialize subscription
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
      //TODO: filter innovations for campaign, maybe defer to Campaign model?
      // pots: removes Language, Lantern Oven, Family & Clan of Death. adds Dragon Speech, Bloodline, Empire, Radiant Orb, Arena.
      // potentially add CampaignType reference to innovations and filter by that.
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
