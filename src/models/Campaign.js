import { types, getSnapshot } from 'mobx-state-tree'
import { keys, values } from 'mobx'
import { SettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { Bonus } from './Bonus'
import { Endeavor } from './Endeavor'
import { Resource } from './Resource'
import { Settlement } from './Settlement'
import { Expansion } from './Expansion'
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
    settlement: types.optional(Settlement, { name: 'New Settlement' }),
    locations: types.optional(
      types.map(types.reference(SettlementLocation)),
      {}
    ),
    innovations: types.optional(types.map(types.reference(Innovation)), {}),
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
        if (inno.providesSurvival) {
          self.settlement.survival.remove(getSnapshot(inno.providesSurvival))
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
        if (inno.providesSurvival) {
          self.settlement.survival.add(getSnapshot(inno.providesSurvival))
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
    get innovationsList() {
      return self.selectedExpansionFilter(self.innovations)
    },
    get locationsList() {
      return self.selectedExpansionFilter(self.locations)
    },
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
