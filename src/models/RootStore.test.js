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

const fs = require('fs')

afterEach(() => {
  jest.restoreAllMocks()
})

it('initializes', () => {
  const store = RootStore.create()

  expect(store).toBeDefined()
  expect(store.selectedCampaign).toBeDefined()
  expect(store.selectedCampaign.settlement.survivalLimit).toBe(1)
})

it('creates random id for default campaign', () => {
  const uuid = '960aa7ae-598a-49eb-888b-c6baa0006751'
  let uuidMock = jest.spyOn(utils, 'uuid')
  uuidMock.mockImplementation(() => uuid)

  const store = RootStore.create()
  expect(store.campaigns).toHaveLength(1)
  expect(store.selectedCampaign.id).toBe(store.campaigns[0].id)
  expect(store.campaigns[0].id).toBe(uuid)
})

describe('.createCampaign', () => {
  it('selects the created campaign', () => {
    const store = RootStore.create()
    let campaign = store.createCampaign('my test')

    expect(store.selectedCampaign.id).toBe(campaign.id)
    expect(store.selectedCampaign.name).toBe('my test')
  })
})

describe('.deleteCampaign', () => {
  it('creates new campaign when deleting the last one', () => {
    const store = RootStore.create()
    const previousId = store.selectCampaign.id
    store.deleteCampaign(store.selectCampaign.id)

    expect(store.campaigns).toHaveLength(1)
    expect(store.selectedCampaign).toBeDefined()
    expect(store.selectedCampaign.id).not.toBe(previousId)
    expect(store.selectedCampaign.id).toBe(store.campaigns[0].id)
  })
})

describe('.load', () => {
  let store
  let uuidMock
  const uuid = '960aa7ae-598a-49eb-888b-c6baa0006751'

  beforeEach(() => {
    uuidMock = jest.spyOn(utils, 'uuid')
    uuidMock.mockImplementation(() => uuid)
    store = RootStore.create()
  })

  it('handles empty data', () => {
    uuidMock.mockImplementation(() => '11111111-598a-49eb-888b-c6baa0006751')
    store.load({})
    expect(store.data).toMatchSnapshot()
  })

  it('loads saved data', () => {
    let updateUuid = '11111111-598a-49eb-888b-c6baa0006751'
    uuidMock.mockImplementation(() => updateUuid)

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

    // should convert 'new' id to an uuid
    expect(store.selectedCampaign.id).toBe(updateUuid)
    expect(store.data).toMatchSnapshot()
  })

  it('handles orphan selectedCampaign', () => {
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
      selectedCampaign: 'orphan',
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

  describe('loading previous versions', () => {
    beforeEach(() => {
      uuidMock.mockImplementation(() => '11111111-598a-49eb-888b-c6baa0006751')
    })

    it('loads v1 save', () => {
      const data = require('./__test_data__/save_v1.json')
      store.load(data)
      // expect(store.data).toEqual(data) // to compare upgrade
      expect(store.data).toMatchSnapshot()
    })

    it('loads v3 save', () => {
      const data = require('./__test_data__/save_v3.json')
      store.load(data)
      // expect(store.data).toEqual(data) // to compare upgrade
      expect(store.data).toMatchSnapshot()
    })

    it('loads v4 save', () => {
      const data = require('./__test_data__/save_v4.json')
      store.load(data)
      // expect(store.data).toEqual(data) // to compare upgrade
      expect(store.data).toMatchSnapshot()
    })

    it('loads v5 save', () => {
      const data = require('./__test_data__/save_v5.json')
      store.load(data)
      // expect(store.data).toEqual(data) // to compare upgrade
      expect(store.data).toMatchSnapshot()
    })

    it('loads real life data v4', () => {
      const data = require('./__test_data__/real_example_v4.json')
      store.load(data)

      expect(store).toBeDefined()
      expect(store.data).toMatchSnapshot() // not sure about this one...
    })

    it('loads real life data v5', () => {
      const data = require('./__test_data__/real_example_v5.json')
      store.load(data)

      expect(store).toBeDefined()
      expect(store.data).toEqual(data) // to compare upgrade
      expect(store.data).toMatchSnapshot() // not sure about this one...
    })
  })
})

it('all in', done => {
  let uuidMock = jest.spyOn(utils, 'uuid')
  uuidMock.mockImplementation(() => '11111111-598a-49eb-888b-c6baa0006751')
  const store = RootStore.create()

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

  // add all principles
  store.selectedCampaign.selectPrinciple('death', { id: 'cannibalize' })
  store.selectedCampaign.selectPrinciple('newlife', { id: 'pty' })
  store.selectedCampaign.selectPrinciple('society', { id: 'accept_darkness' })
  store.selectedCampaign.selectPrinciple('conviction', { id: 'romantic' })

  // one of each resource
  R.forEachObjIndexed(
    value => store.selectedCampaign.setResourceCount({ id: value.id }, 1),
    resourceData
  )

  // add a couple of survivors
  uuidMock.mockImplementation(() => '3352353f-f7df-44ab-8c13-a350c7e35a7b')
  let survivor1 = store.selectedCampaign.settlement.createSurvivor('survivor 1')

  expect(store.selectedCampaign.newbornBonus).toHaveProperty('survival', 1)
  expect(survivor1).toMatchObject({
    strength: 2,
    evasion: 1,
    accuracy: 1,
    courage: 2,
    'hunt xp': 2,
    insanity: 0,
    luck: 0,
    movement: 5,
    speed: 0,
    survival: 2,
    understanding: 2,
  })

  uuidMock.mockImplementation(() => '3792b21e-fc96-4a5e-a2cd-6cccff3747a8')
  let survivor2 = store.selectedCampaign.settlement.createSurvivor('survivor 2')

  // add some stuff to the survivor
  survivor2.setWeaponProficiency({ id: 'fist & tooth' })
  survivor2.addFA({ id: 'Acrobatics' })
  survivor2.addFA({ id: 'Clutch Fighter' })
  survivor2.addFA({ id: 'Clarity of Darkness' })
  survivor2.addDisorder({ id: 'Absent Seizures' })
  survivor2.addDisorder({ id: 'Fear of the Dark' })
  survivor2.addDisorder({ id: 'Indecision' })
  survivor2.addAbility({ id: 'Acid Palms' })
  survivor2.addAbility({ id: 'Homing Instinct' })
  survivor2.addAbility({ id: 'Metal Maw' })
  survivor2.addAbility({ id: 'Way of the Rust' })

  uuidMock.mockImplementation(() => '4452353f-f7df-44ab-8c13-a350c7e35a7b')
  let survivor3 = store.selectedCampaign.settlement.createSurvivor('survivor 3')
  survivor3.cycleStatus()
  expect(store.data).toMatchSnapshot()
  done()

  // fs.writeFile('save_v5.json', JSON.stringify(store.data), err => {
  //   if (err) throw err
  //   done()
  // })
})
