import { types, getSnapshot, getParent } from 'mobx-state-tree'
import { SettlementBonus, init as defaultBonus } from './SettlementBonus'
import { Survivor, init as defaultSurvivor } from './Survivor'
import R from 'ramda'
import { values } from 'mobx'

// all are maybe because it's used by innovations as well.
// TODO: this could be changed to optional and have always initialized data, should make the UI simpler and avoid null checks there.
export const Settlement = types
  .model('Settlement', {
    name: types.maybeNull(types.string),
    survivalLimit: types.maybeNull(types.integer),
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
      // here a combination of destroy(item) + beforeDestroy hook on the item itself could be used to maybe simplify this stuff a little bit. does it work with references?
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
      let survivorData = Object.assign(
        defaultSurvivor(),
        self.newborn ? self.newborn.bonus : {}
      )
      if (name) {
        survivorData.name = name
      }
      let survivor = Survivor.create(survivorData)
      survivor.applyNewbornMilestones() // TODO: this could be moved to afterCreate if that hook is only called when creating models and not when applying a snapshot.
      self.survivors.put(survivor)

      return survivor
    },
  }))
  .views(self => ({
    filterSurvivors(status = 'alive') {
      if (status === 'alive') {
        return R.filter(
          item => item.status === 'alive' || item.status === 'retired',
          values(self.survivors)
        )
      } else {
        return R.filter(item => {
          return item.status === status
        }, values(self.survivors))
      }
    },
    get hasSOTF() {
      return getParent(self).hasSOTF
    },
  }))
