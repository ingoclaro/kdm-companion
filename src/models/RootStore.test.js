import { getSnapshot } from 'mobx-state-tree'
import RootStore from './RootStore'
import R from 'ramda'
import * as utils from '../utils'

import expansionData from '../data/expansions'
import locationsData from '../data/settlement_locations'
import innovationsData from '../data/innovations'
import resourceData from '../data/resources'
// import monsterData from '../data/monsters'
// import gearData from '../data/gear'
// import abilitiesData from '../data/abilities'
// import weaponProficiencyData from '../data/weaponProficiencies'
// import disordersData from '../data/disorders'
// import fightingArtsData from '../data/fightingArts'
// import secretFightingArtsData from '../data/secretFightingArts'

afterEach(() => {
  jest.restoreAllMocks()
})

it('initializes', () => {
  const store = RootStore.create()
})

describe('.load', () => {
  let store

  beforeEach(() => {
    store = RootStore.create()
  })

  it('handles empty data', () => {
    store.load({})
    expect(store.data).toMatchSnapshot()
  })

  it('loads saved data', () => {
    let data = {
      campaigns: [
        {
          bonuses: {},
          endeavors: {},
          expansions: {
            core: 'core',
          },
          hunting: null,
          id: 'new',
          innovations: {},
          locations: {},
          notes: 'my notes',
          principles: {
            conviction: null,
            death: null,
            newlife: null,
            society: null,
          },
          settlement: {
            departing: null,
            name: 'New Settlement',
            newborn: null,
            showdown: null,
            survivalLimit: 3,
            survivors: {},
          },
          showdown: null,
          stored_resources: {},
        },
      ],
      selectedCampaign: 'new',
      subscription: {
        appLastActiveAt: 0,
        autoRenewing: false,
        checkedAt: 0,
        purchasedAt: 0,
        response: '',
        transactionId: undefined,
      },
      version: 1,
    }
    store.load(data)
    expect(store.data).toMatchSnapshot()
  })
})

it('all in', () => {
  const store = RootStore.create()

  let uuidMock = jest.spyOn(utils, 'uuid')
  uuidMock.mockImplementation(() => '960aa7ae-598a-49eb-888b-c6baa0006751')
  store.createCampaign('test')

  // add all expansions
  R.forEachObjIndexed(
    value => store.selectedCampaign.selectExpansion({ id: value.id }),
    expansionData
  )

  // add all locations
  R.forEachObjIndexed(
    value => store.selectedCampaign.selectLocation({ id: value.id }),
    locationsData
  )

  // add all innovations
  R.forEachObjIndexed(
    value => store.selectedCampaign.selectInnovation({ id: value.id }),
    innovationsData
  )

  // add all principles (note that priciples override each other because some have the same id)
  store.selectedCampaign.selectPrinciple('death', { id: 'cannibalize' })
  store.selectedCampaign.selectPrinciple('newlife', { id: 'pty' })
  store.selectedCampaign.selectPrinciple('society', { id: 'accept_darkness' })
  store.selectedCampaign.selectPrinciple('conviction', { id: 'romantic' })

  // one of each resource
  R.forEachObjIndexed(
    value => store.selectedCampaign.setResourceCount({ id: value.id }, 1),
    resourceData
  )

  expect(store.data).toMatchSnapshot()
})
