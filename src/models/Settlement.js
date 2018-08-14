import { types, getSnapshot } from 'mobx-state-tree'
import { SettlementBonus, init as defaultBonus } from './SettlementBonus'
import { Survivor, init as defaultSurvivor } from './Survivor'

// all are maybe because it's used by innovations as well.
export const Settlement = types
  .model('Settlement', {
    name: types.maybeNull(types.string),
    survivalLimit: types.maybeNull(types.number),
    departing: types.maybeNull(SettlementBonus),
    newborn: types.maybeNull(SettlementBonus),
    showdown: types.maybeNull(SettlementBonus),
    survivors: types.map(Survivor),
  })
  .actions(self => ({
    updateName(name) {
      self.name = name
    },
    add(settlement) {
      if (settlement.survivalLimit) {
        self.survivalLimit += settlement.survivalLimit
      }
      if (settlement.departing) {
        if (!self.departing) {
          self.departing = defaultBonus
        }
        self.departing.add(settlement.departing)
      }
      if (settlement.newborn) {
        if (!self.newborn) {
          self.newborn = defaultBonus
        }
        self.newborn.add(settlement.newborn)
      }
      if (settlement.showdown) {
        if (!self.showdown) {
          self.showdown = defaultBonus
        }
        self.showdown.add(settlement.showdown)
      }
    },
    remove(settlement) {
      if (settlement.survivalLimit) {
        self.survivalLimit -= settlement.survivalLimit
      }
      if (settlement.departing) {
        if (!self.departing) {
          self.departing = defaultBonus
        }
        self.departing.remove(settlement.departing)
      }
      if (settlement.newborn) {
        if (!self.newborn) {
          self.newborn = defaultBonus
        }
        self.newborn.remove(settlement.newborn)
      }
      if (settlement.showdown) {
        if (!self.showdown) {
          self.showdown = defaultBonus
        }
        self.showdown.remove(settlement.showdown)
      }
    },
    createSurvivor(name = undefined) {
      let survivorData = defaultSurvivor()
      if (name) {
        survivorData.name = name
      }
      self.survivors.set(survivorData.id, survivorData)
      let survivor = self.survivors.get(survivorData.id)
      return survivor
    },
  }))
