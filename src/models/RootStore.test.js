import { getSnapshot } from 'mobx-state-tree'
import RootStore from './RootStore'
import * as utils from '../utils'

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
  //TODO: read data file and activate all, same for the other stuff.
  store.selectedCampaign.selectExpansion({ id: 'dbk' })
  store.selectedCampaign.selectExpansion({ id: 'dk' })
  store.selectedCampaign.selectExpansion({ id: 'fk' })
  store.selectedCampaign.selectExpansion({ id: 'gka' })
  store.selectedCampaign.selectExpansion({ id: 'gorm' })
  store.selectedCampaign.selectExpansion({ id: 'lg' })
  store.selectedCampaign.selectExpansion({ id: 'lk' })
  store.selectedCampaign.selectExpansion({ id: 'lt' })
  store.selectedCampaign.selectExpansion({ id: 'manhunter' })
  store.selectedCampaign.selectExpansion({ id: 'slenderman' })
  store.selectedCampaign.selectExpansion({ id: 'spidicules' })
  store.selectedCampaign.selectExpansion({ id: 'sunstalker' })

  store.selectedCampaign.selectLocation({ id: 'mask_maker' })
  store.selectedCampaign.selectLocation({ id: 'the sun' })

  expect(store.data).toMatchSnapshot()
})
