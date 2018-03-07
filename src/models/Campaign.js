//TODO
import { types } from 'mobx-state-tree'
import { SettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
// import { Endeavor } from './Endeavor'

const Settlement = types
  .model('Settlement', {
    name: 'New Settlement',
  })
  .actions(self => ({
    updateName(name) {
      self.name = name
    },
  }))

export const Campaign = types
  .model('Campaign', {
    id: types.identifier(types.string),
    settlement: Settlement,
    locations: types.optional(
      types.map(types.reference(SettlementLocation)),
      {}
    ),
    innovations: types.optional(types.map(types.reference(Innovation)), {}),
    // endeavors: types.array(Endeavor),
    // expansions: types.array(Expansion),
    // bonuses: types.array(Bonus),
    // survivors: types.array(Survivor),
  })
  .actions(self => ({
    selectLocation(location) {
      if (self.locations.has(location.id)) {
        self.locations.delete(location.id)
      } else {
        self.locations.set(location.id, location.id)
      }
    },
    selectInnovation(innovation) {
      if (self.innovations.has(innovation.id)) {
        self.innovations.delete(innovation.id)
      } else {
        self.innovations.set(innovation.id, innovation.id)
      }
    },
  }))
  .views(self => ({
    get name() {
      return self.settlement.name
    },
  }))
