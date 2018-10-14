import { types, getSnapshot, getParent } from 'mobx-state-tree'
import { SettlementBonus, init as defaultBonus } from './SettlementBonus'
import { Survivor, init as defaultSurvivor } from './Survivor'
import R from 'ramda'
import { values } from 'mobx'

// all are optional because it's used by innovations as well.
export const Settlement = types
  .model('Settlement', {
    name: 'New Settlement',
    survivalLimit: 0, // default is 0 because Settlement is also used for bonuses of innovations. This has to be setup to 1 for new Settlements.
    departing: types.optional(SettlementBonus, {}),
    newborn: types.optional(SettlementBonus, {}), // default survial = 1 needs to be setup for new settlements (same reason as above)
    showdown: types.optional(SettlementBonus, {}),
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
      // TODO: this needs to be moved to the Survivor model!
      let survivorData = Object.assign(
        defaultSurvivor(),
        self.newborn ? self.newborn.bonus : {}
      )
      survivorData.survival = Math.min(
        survivorData.survival,
        self.survivalLimit
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

export const init = {
  name: 'New Settlement',
  survivalLimit: 1,
  newborn: { survival: 1 },
}
