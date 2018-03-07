import { types } from 'mobx-state-tree'
import { SettlementLocation } from './SettlementLocation'
import { Innovation } from './Innovation'
import { Resource } from './Resource'
import { Keyword } from './Keyword'
import { Expansion } from './Expansion'

const Gear = types.model('Gear', {
  id: types.identifier(types.string),
  name: types.string,
  expansion: types.reference(Expansion),
  recipes: types.array(Recipe),
})

const Recipe = types.model('Recipe', {
  location: types.maybe(types.reference(SettlementLocation)),
  innovation: types.maybe(types.reference(Innovation)),
  resources: types.map(types.model('Resources'), {
    resource: types.maybe(types.reference(Resource)),
    keyword: types.maybe(types.reference(Keyword)),
    quantity: 0,
  }),
})

export { Gear }
