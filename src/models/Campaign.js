//TODO
import { types, getSnapshot } from 'mobx-state-tree'
import { SettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { Bonus } from './Bonus'
import { Endeavor } from './Endeavor'

const Settlement = types
  .model('Settlement', {
    name: types.string,
  })
  .actions(self => ({
    updateName(name) {
      self.name = name
    },
  }))

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
    // expansions: types.array(Expansion),
    // survivors: types.array(Survivor),
  })
  .actions(self => ({
    selectLocation(location) {
      if (self.locations.has(location.id)) {
        self.locations.get(locations.id).endeavors.forEach(endeavor => {
          self.removeEndeavor(getSnapshot(endeavor))
        })
        self.locations.delete(location.id)
      } else {
        self.locations.set(location.id, location.id)
        self.locations.get(location.id).endeavors.forEach(endeavor => {
          self.addEndeavor(getSnapshot(endeavor))
        })
      }
    },
    selectInnovation(innovation) {
      if (self.innovations.has(innovation.id)) {
        self.innovations.get(innovation.id).providesBonuses.forEach(bonus => {
          self.removeBonus(getSnapshot(bonus))
        })
        self.innovations.delete(innovation.id)
      } else {
        self.innovations.set(innovation.id, innovation.id)
        self.innovations.get(innovation.id).providesBonuses.forEach(bonus => {
          self.addBonus(getSnapshot(bonus))
        })
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
  }))
  .views(self => ({
    get name() {
      return self.settlement.name
    },
  }))
