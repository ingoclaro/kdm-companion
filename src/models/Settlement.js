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
    activeSurvivorsList: types.array(types.reference(Survivor)),
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
      self.activeSurvivorsList.push(survivor)

      return survivor
    },
    handleSurvivorStatusChange(survivor) {
      if (survivor.status === 'dead') {
        self.deactivateSurvivor(survivor)
      } else {
        self.activateSurvivor(survivor)
      }
    },
    activateSurvivor(survivor) {
      if (!self.activeSurvivorsList.find(item => item.id === survivor.id)) {
        self.activeSurvivorsList.push(survivor.id)
      }
    },
    deactivateSurvivor(survivor) {
      let idx
      if (
        (idx = self.activeSurvivorsList.findIndex(
          item => item.id === survivor.id
        ))
      ) {
        self.activeSurvivorsList = self.activeSurvivorsList
          .slice(0, idx)
          .concat(self.activeSurvivorsList.slice(idx + 1))
      }
    },
    reorderSurvivor(survivor, position) {
      let idx = self.activeSurvivorsList.findIndex(
        item => item.id === survivor.id
      )
      if (idx >= 0) {
        // remove from array
        self.activeSurvivorsList = self.activeSurvivorsList
          .slice(0, idx)
          .concat(self.activeSurvivorsList.slice(idx + 1))
        // add in new position
        self.activeSurvivorsList.splice(position, 0, survivor.id)
      }
    },
  }))
  .views(self => ({
    filterSurvivors(status = 'alive') {
      if (status === 'alive') {
        return self.activeSurvivorsList
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
