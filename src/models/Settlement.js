import { types, getSnapshot, getParent } from 'mobx-state-tree'
import { Survivor } from './Survivor'
import { SurvivorStats } from './SurvivorStats'
import R from 'ramda'
import { values } from 'mobx'

// all are optional because it's used by innovations as well.
export const Settlement = types
  .model({
    name: 'New Settlement',
    survivors: types.map(
      types.compose(
        'SorterSurvivor',
        Survivor,
        types.model({ order: 0 }).actions(self => ({
          setOrder(_order) {
            self.order = _order
          },
        }))
      )
    ),
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

      self.survivors.put(survivor)
      survivor.applyNewbornMilestones()

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
      // let idx = self.activeSurvivorsList.findIndex(
      //   item => item.id === survivor.id
      // )
      // if (idx >= 0) {
      //   // remove from array
      //   self.activeSurvivorsList = self.activeSurvivorsList
      //     .slice(0, idx)
      //     .concat(self.activeSurvivorsList.slice(idx + 1))
      //   // add in new position
      //   self.activeSurvivorsList.splice(position, 0, survivor.id)
      // }
      self.survivors.forEach(surv => {
        if (surv.order >= position) {
          surv.setOrder(surv.order + 1)
        }
      })
      survivor.setOrder(position)
    },
  }))
  .views(self => ({
    filterSurvivors(status = 'alive') {
      console.log('filterSurvivors')
      const sorter = R.sortWith([
        R.ascend(R.prop('order')),
        R.descend(R.prop('weaponProficiencyLevel')),
        R.descend(R.prop('strength')),
        R.ascend(R.prop('hunt xp')),
      ])

      const filter = R.filter(item => {
        return item.status === status
      })

      return R.compose(
        filter,
        sorter
      )(values(self.survivors))
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
