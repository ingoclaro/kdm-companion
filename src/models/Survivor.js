import { types } from 'mobx-state-tree'
import { FightingArt } from './FightingArt'
import { uuid } from '../utils'

const Survivor = types.model('Survivor', {
  id: types.identifier(types.string),
  name: types.string,
  fightingArts: types.optional(types.map(types.reference(FightingArt)), {}),
})

const init = () => ({ id: uuid(), name: 'Unnamed', fightingArts: {} })

export { Survivor, init }
