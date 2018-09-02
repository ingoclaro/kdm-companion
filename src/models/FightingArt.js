import { types } from 'mobx-state-tree'
import { Expansion } from './Expansion'

const FightingArt = types.model('FightingArt', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  expansion: types.reference(Expansion),
})

const SecretFightingArt = FightingArt.named('SecretFightingArt')

export { FightingArt, SecretFightingArt }
