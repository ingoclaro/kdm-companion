import { types, getSnapshot, getParent } from 'mobx-state-tree'
import { Survivor } from './Survivor'
import { SurvivorStats } from './SurvivorStats'
import R from 'ramda'
import { values } from 'mobx'

// all are optional because it's used by innovations as well.
export const Settlement = types
  .model({
    name: 'New Settlement',
    survivors: types.map(Survivor),
    activeSurvivorsList: types.array(types.reference(Survivor)), // this was initially a view, but it was constantly being re-calculated
    // for any survivor stat change (not only their status), adding high latency to the UI. So this keeps a more stable cache.
  })
  .actions(self => ({
    updateName(name) {
      self.name = name
    },
    createSurvivor(name = undefined) {
      let survivor = Survivor.create()
      if (name) {
        survivor.setAttribute('name', name)
      }

      // apply newborn bonus
      for (let key in SurvivorStats.create()) {
        survivor.setAttribute(key, survivor[key] + self.newborn[key])
      }

      survivor.setAttribute(
        'survival',
        Math.min(survivor.survival, self.survivalLimit)
      )
      survivor.applyNewbornMilestones()

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
    get survivalLimit() {
      return getParent(self).survivalLimit
    },
    get newborn() {
      return getParent(self).newbornBonus
    },
    get departing() {
      return getParent(self).departingBonus
    },
    get showdown() {
      return getParent(self).showdownBonus
    },
  }))
