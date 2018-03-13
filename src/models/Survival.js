import { types, getSnapshot } from 'mobx-state-tree'

export const Survival = types
  .model('Survival', {
    limit: 1,
    departing: 0,
  })
  .actions(self => ({
    add(survival) {
      if (survival.limit) {
        self.limit += survival.limit
      }
      if (survival.departing) {
        self.departing += survival.departing
      }
    },
    remove(survival) {
      if (survival.limit) {
        self.limit -= survival.limit
      }
      if (survival.departing) {
        self.departing -= survival.departing
      }
    },
  }))
