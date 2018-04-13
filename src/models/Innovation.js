import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { Bonus } from './Bonus'
import { lateEndeavor } from './Endeavor'
import { Settlement } from './Settlement'

const Innovation = types.model('Innovation', {
  id: types.identifier(types.string),
  name: types.string,
  expansion: types.reference(Expansion),
  keywords: types.maybe(types.array(types.string)),
  providesBonuses: types.optional(types.array(Bonus), []),
  settlement: types.maybe(Settlement),
  endeavors: types.optional(types.array(types.late(lateEndeavor)), []),
})

export { Innovation }
