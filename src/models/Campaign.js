import { types, getSnapshot } from 'mobx-state-tree'
import { SettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { Bonus } from './Bonus'
import { Endeavor } from './Endeavor'
import { Resource } from './Resource'
import { Settlement } from './Settlement'
import { Expansion } from './Expansion'
import { Monster } from './Monster'

import R from 'ramda'

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
    hunting: types.optional(
      types.model({
        monster: types.reference(Monster),
        level: types.string,
      }),
      { monster: 'white_lion', level: 'white_lion-1' }
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
    selectHunt(hunt) {
      self.hunting.monster = hunt.monster_id
      self.hunting.level = hunt.level_id
    },
  }))
  .views(self => ({
    get name() {
      return self.settlement.name
    },
    get huntBoard() {
      if (!self.hunting) {
        return null
      }
      let monsterLevel = self.hunting.monster.levels.get(self.hunting.level)
      return monsterLevel.huntboard
    },
    get expansionList() {
      return self.expansions.keys()
    },
    expansionFilter(map) {
      return R.filter(
        item => self.expansionList.includes(item.expansion.id),
        map.values()
      )
    },
    get innovationsList() {
      return self.expansionFilter(self.innovations)
    },
    get locationsList() {
      return self.expansionFilter(self.locations)
    },
  }))
