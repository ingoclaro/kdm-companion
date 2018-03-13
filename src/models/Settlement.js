import { types, getSnapshot } from 'mobx-state-tree'
import { Survival } from './Survival'

export const Settlement = types
  .model('Settlement', {
    name: types.string,
    survival: types.optional(Survival, {}),
  })
  .actions(self => ({
    updateName(name) {
      self.name = name
    },
  }))
