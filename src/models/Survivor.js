import { types } from 'mobx-state-tree'
import { FightingArt } from './FightingArt'
import { uuid } from '../utils'

const Survivor = types.model('Survivor', {
  id: types.identifier,
  name: types.string,
  fightingArts: types.map(types.reference(FightingArt)),
})

const init = () => ({ id: uuid(), name: 'Unnamed', fightingArts: {} })

export { Survivor, init }
