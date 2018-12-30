import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'
import { lateEndeavor } from './Endeavor'
import { SettlementBonus } from './SettlementBonus'

const Innovation = types.model('Innovation', {
  id: types.identifier,
  name: types.string,
  expansion: types.reference(Expansion),
  keywords: types.array(types.string),
  bonus: '',
  settlement: types.optional(SettlementBonus, {}),
  endeavors: types.array(types.late(lateEndeavor)),
})

export { Innovation }
