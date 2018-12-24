import { types, getSnapshot, getRoot, resolveIdentifier } from 'mobx-state-tree'
import { keys, values } from 'mobx'
import { SettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { Bonus } from './Bonus'
import { Endeavor } from './Endeavor'
import { Resource } from './Resource'
import { Settlement, init as newSettlementData } from './Settlement'
import { Expansion } from './Expansion'
import { Principle } from './Principle'
import { Monster } from './Monster'
import { CampaignType } from './CampaignType'

import R from 'ramda'

import { expansionFilter, uuid } from '../utils'

const StoredResource = types.model('StoredResource', {
  id: types.identifier,
  resource: types.reference(Resource),
  quantity: 0,
})

const SelectedMonsterLevel = types.model('SelectedMonsterLevel', {
  monster: types.reference(Monster),
  level: types.string,
})

export const Campaign = types
  .model('Campaign', {
    id: types.optional(types.identifier, () => uuid()),
    settlement: types.optional(Settlement, newSettlementData),
    locations: types.map(types.reference(SettlementLocation)),
    innovations: types.map(types.reference(Innovation)),
    principles: types.optional(
      types.model('Principles', {
        death: types.maybeNull(types.reference(Principle)),
        newlife: types.maybeNull(types.reference(Principle)),
        society: types.maybeNull(types.reference(Principle)),
        conviction: types.maybeNull(types.reference(Principle)),
      }),
      {}
    ),
    bonuses: types.map(Bonus),
    endeavors: types.map(Endeavor),
    stored_resources: types.map(StoredResource),
    expansions: types.optional(types.map(types.reference(Expansion)), {
      core: 'core',
    }),
    hunting: types.maybeNull(SelectedMonsterLevel),
    showdown: types.maybeNull(SelectedMonsterLevel),
    notes: '',
    type: types.optional(types.reference(CampaignType), 'potl'),
  })
  .actions(self => ({
    selectLocation(location) {
      if (self.locations.has(location.id)) {
        // process extensions
        let loc = self.locations.get(location.id)
        loc.endeavors.forEach(endeavor => {
          self.removeEndeavor(getSnapshot(endeavor))
        })
        self.locations.delete(location.id)
      } else {
        self.locations.set(location.id, location.id)
        // process extensions
        let loc = self.locations.get(location.id)
        loc.endeavors.forEach(endeavor => {
          self.addEndeavor(getSnapshot(endeavor))
        })
      }
    },
    selectInnovation(innovation) {
      if (self.innovations.has(innovation.id)) {
        // process extensions
        let inno = self.innovations.get(innovation.id)
        inno.providesBonuses.forEach(bonus => {
          self.removeBonus(getSnapshot(bonus))
        })
        inno.endeavors.forEach(endeavor => {
          self.removeEndeavor(getSnapshot(endeavor))
        })
        if (inno.settlement) {
          self.settlement.remove(getSnapshot(inno.settlement))
        }

        self.innovations.delete(innovation.id)
      } else {
        self.innovations.set(innovation.id, innovation.id)

        // process extensions
        let inno = self.innovations.get(innovation.id)
        inno.providesBonuses.forEach(bonus => {
          self.addBonus(getSnapshot(bonus))
        })
        inno.endeavors.forEach(endeavor => {
          self.addEndeavor(getSnapshot(endeavor))
        })
        if (inno.settlement) {
          self.settlement.add(getSnapshot(inno.settlement))
        }
      }
    },
    selectExpansion(expansion) {
      if (expansion.id === 'core') {
        // don't allow to remove core expansion.
        return
      }
      if (self.expansions.has(expansion.id)) {
        // reset some stuff when expansions are removed
        self.hunting = null
        self.showdown = null

        // remove all expansion locations
        let remove = []
        for (let [id, item] of self.locations) {
          if (item.expansion.id === expansion.id) {
            remove.push({ id })
          }
        }
        remove.forEach(item => self.selectLocation(item))

        // remove all expansion innovations
        remove = []
        for (let [id, item] of self.innovations) {
          if (item.expansion.id === expansion.id) {
            remove.push({ id })
          }
        }
        remove.forEach(item => self.selectInnovation(item))

        // remove all expansion monster resources
        for (let [id, item] of self.stored_resources) {
          if (
            (item.resource.expansion &&
              item.resource.expansion !== 'core' &&
              item.resource.expansion.id === expansion.id) ||
            (item.resource.monster &&
              item.resource.monster.expansion.id === expansion.id)
          ) {
            item.quantity = 0
          }
        }

        self.expansions.delete(expansion.id)
      } else {
        self.expansions.set(expansion.id, expansion.id)
      }
    },
    selectPrinciple(type, principle) {
      if (self.principles[type]) {
        let principle = self.principles[type]
        principle.providesBonuses.forEach(bonus => {
          self.removeBonus(getSnapshot(bonus))
        })
        if (principle.settlement) {
          self.settlement.remove(getSnapshot(principle.settlement))
        }
      }

      // selecting
      self.principles[type] = principle.id

      // process extensions
      let prin = self.principles[type]
      if (prin) {
        //handle unselected principle
        prin.providesBonuses.forEach(bonus => {
          self.addBonus(getSnapshot(bonus))
        })
        if (prin.settlement) {
          self.settlement.add(getSnapshot(prin.settlement))
        }
      }
    },
    addBonus(bonus) {
      self.bonuses.put(bonus)
    },
    removeBonus(bonus) {
      self.bonuses.delete(bonus.id)
    },
    addEndeavor(endeavor) {
      self.endeavors.put(endeavor)
    },
    removeEndeavor(endeavor) {
      self.endeavors.delete(endeavor.id)
    },
    setResourceCount(resource, count) {
      if (self.stored_resources.get(resource.id)) {
        self.stored_resources.get(resource.id).quantity = count
      } else {
        // create a new entry
        self.stored_resources.put({
          id: resource.id,
          resource: resource.id,
          quantity: count,
        })
      }
    },
    selectHunt(monster) {
      if (monster.monster_id) {
        self.hunting = { monster: monster.monster_id, level: monster.level_id }
        self.showdown = { monster: monster.monster_id, level: monster.level_id } // default showdown to hunted monster
      } else {
        self.hunting = null
      }
    },
    selectShowdown(monster) {
      if (monster.monster_id) {
        self.showdown = { monster: monster.monster_id, level: monster.level_id }
      } else {
        self.showdown = null
      }
    },
    saveNotes(notes) {
      self.notes = notes
    },
    setCampaignType(type) {
      self.type = type
      switch (type) {
        case 'pots':
          if (!self.expansions.get('dk')) {
            self.expansions.set('dk', 'dk')
          }
          break
      }
    },
    updateName(name) {
      self.settlement.updateName(name)
    },
  }))
  .views(self => ({
    get name() {
      return self.settlement.name
    },
    get huntingMonsterLevel() {
      return self.hunting
        ? self.hunting.monster.levels.get(self.hunting.level)
        : null
    },
    get showdownMonsterLevel() {
      return self.showdown
        ? self.showdown.monster.levels.get(self.showdown.level)
        : null
    },
    get expansionList() {
      return keys(self.expansions)
    },
    // Returns items from the map that are in the expansionList of this campaign
    selectedExpansionFilter(map) {
      return R.filter(
        item => {
          let include = false
          if (item.expansion) {
            include = self.expansionList.includes(item.expansion.id)
          } else {
            include = true
          }
          if (include && item.campaign) {
            include = item.campaign.id === self.type.id
          }
          return include
        },
        map.get //is it a real map?
          ? values(map)
          : map
      )
    },
    // gets selected innovations validated with selected expansions
    // TODO: do we need to do this since we are removing innovations when removing campaign.
    get innovationsList() {
      return self.selectedExpansionFilter(self.innovations)
    },
    // gets selected locations validated with selected expansions
    // TODO: do we need to do this since we are removing locations when removing campaign.
    get locationsList() {
      return self.selectedExpansionFilter(self.locations)
    },
    // Returns all content being used by an expansion
    expansionContent(expansion) {
      let locations = expansionFilter(self.locations, expansion)
      let innovations = expansionFilter(self.innovations, expansion)
      let resources = R.filter(
        item =>
          ((item.resource.expansion &&
            item.resource.expansion.id === expansion.id) ||
            (item.resource.monster &&
              item.resource.monster.expansion.id === expansion.id)) &&
          item.quantity > 0,
        values(self.stored_resources)
      )
      let length = 0 + locations.length + innovations.length + resources.length

      return { locations, innovations, resources, length }
    },
    get hasSOTF() {
      return self.principles.newlife && self.principles.newlife.id === 'sotf'
    },
    get courageMilestones() {
      if (self.type === 'pots') {
        return {
          3: { description: '![book](book) Awake (DK p.11)' },
          9: { description: '![book](book) See the Truth (p.167)' },
        }
      }
      return {
        3: { description: '![book](book) Bold (p.113)' },
        9: { description: '![book](book) See the Truth (p.167)' },
      }
    },
    get understandingMilestones() {
      if (self.type === 'pots') {
        return {
          3: { description: '![book](book) Awake (DK p.11)' },
          9: { description: '![book](book) White Secret (p.181)' },
        }
      }
      return {
        3: { description: '![book](book) Insight (p.131)' },
        9: { description: '![book](book) White Secret (p.181)' },
      }
    },
    get data() {
      return getSnapshot(self)
    },
  }))
