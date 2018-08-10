import { types, getSnapshot, getRoot, resolveIdentifier } from 'mobx-state-tree'
import { keys, values } from 'mobx'
import { SettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { Bonus } from './Bonus'
import { Endeavor } from './Endeavor'
import { Resource } from './Resource'
import { Settlement } from './Settlement'
import { Expansion } from './Expansion'
import { Principle } from './Principle'
import { Monster } from './Monster'

import R from 'ramda'

import { expansionFilter } from '../utils'

const StoredResource = types.model('StoredResource', {
  id: types.identifier(types.string),
  resource: types.reference(Resource),
  quantity: 0,
})

export const Campaign = types
  .model('Campaign', {
    id: types.identifier(types.string),
    settlement: types.optional(Settlement, {
      name: 'New Settlement',
      survivalLimit: 1,
    }),
    locations: types.optional(
      types.map(types.reference(SettlementLocation)),
      {}
    ),
    innovations: types.optional(types.map(types.reference(Innovation)), {}),
    principles: types.optional(
      types.model('principles', {
        death: types.maybe(types.reference(Principle)),
        newlife: types.maybe(types.reference(Principle)),
        society: types.maybe(types.reference(Principle)),
        conviction: types.maybe(types.reference(Principle)),
      }),
      {}
    ),
    bonuses: types.optional(types.map(Bonus), {}),
    endeavors: types.optional(types.map(Endeavor), {}),
    stored_resources: types.optional(types.map(StoredResource), {}),
    expansions: types.optional(types.map(types.reference(Expansion)), {
      core: 'core',
    }),
    hunting: types.maybe(
      types.model({
        monster: types.reference(Monster),
        level: types.string,
      })
    ),
    showdown: types.maybe(
      types.model({
        monster: types.reference(Monster),
        level: types.string,
      })
    ),
    // survivors: types.array(Survivor),
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
            item.resource.expansion &&
            item.resource.expansion !== 'core' &&
            item.resource.expansion.id === expansion.id
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
          let id = false
          if (item.expansion) {
            id = item.expansion.id ? item.expansion.id : item.expansion
          }
          return !id || self.expansionList.includes(id)
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
          item.resource.expansion.id === expansion.id && item.quantity > 0,
        values(self.stored_resources)
      )
      let length = 0 + locations.length + innovations.length + resources.length

      return { locations, innovations, resources, length }
    },
  }))
