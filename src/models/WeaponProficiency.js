import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'

const WeaponProficiency = types.model('WeaponProficiency', {
  id: types.identifier,
  name: types.string,
  expansion: types.reference(Expansion),
  specialistBonus: types.string,
  masterBonus: types.string,
})

export { WeaponProficiency }
