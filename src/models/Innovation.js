import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { Bonus } from './Bonus'
import { Survival } from './Survival'
import { lateEndeavor } from './Endeavor'

const Innovation = types.model('Innovation', {
  id: types.identifier(types.string),
  name: types.string,
  expansion: types.reference(Expansion),
  keywords: types.maybe(types.array(types.string)),
  providesBonuses: types.optional(types.array(Bonus), []),
  providesSurvival: types.maybe(Survival),
  endeavors: types.optional(types.array(types.late(lateEndeavor)), []),
})

export { Innovation }
