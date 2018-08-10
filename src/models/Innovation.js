import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { Bonus } from './Bonus'
import { lateEndeavor } from './Endeavor'
import { Settlement } from './Settlement'

const Innovation = types.model('Innovation', {
  id: types.identifier,
  name: types.string,
  expansion: types.reference(Expansion),
  keywords: types.maybeNull(types.array(types.string)),
  providesBonuses: types.array(Bonus),
  settlement: types.maybeNull(Settlement),
  endeavors: types.array(types.late(lateEndeavor)),
})

export { Innovation }
