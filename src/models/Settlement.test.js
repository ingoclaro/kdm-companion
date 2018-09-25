import { getSnapshot } from 'mobx-state-tree'
import { Settlement, init as newSettlementData } from './Settlement'
import { init as defaultSurvivor } from './Survivor'
import RootStore from './RootStore'

import * as utils from '../utils'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('.create', () => {
  it('creates a barebones settlement', () => {
    let settlement = Settlement.create(newSettlementData)

    expect(getSnapshot(settlement)).toMatchSnapshot()
  })

  it('works with empty data', () => {
    let settlement = Settlement.create({})

    expect(getSnapshot(settlement)).toMatchSnapshot()
  })
})

describe('.add', () => {
  it('adds bonuses to settlement', () => {
    let settlement = Settlement.create(newSettlementData)
    let bonus = {
      survivalLimit: 1,
      departing: {
        survival: 3,
        insanity: 3,
        description: ['a description'],
      },
      newborn: {
        accuracy: 1,
        strength: 1,
        evasion: 1,
      },
      showdown: {
        description: ['another description'],
      },
    }
    settlement.add(bonus)
    expect(getSnapshot(settlement)).toMatchSnapshot()
  })
})

describe('.remove', () => {
  it('removes bonuses from settlement', () => {
    let settlement = Settlement.create(newSettlementData)
    let bonus = {
      survivalLimit: 1,
      departing: {
        survival: 3,
        insanity: 3,
        description: ['a description'],
      },
      newborn: {
        accuracy: 1,
        strength: 1,
        evasion: 1,
      },
      showdown: {
        description: ['another description'],
      },
    }
    settlement.add(bonus)
    settlement.remove(bonus)

    expect(getSnapshot(settlement)).toMatchSnapshot()
  })
})

describe('.createSurvivor', () => {
  it('creates a survivor and assings it to the settlement', () => {
    let settlement = Settlement.create(newSettlementData)

    let uuidMock = jest.spyOn(utils, 'uuid')
    uuidMock.mockImplementation(() => '4e55b990-5b16-480f-81d2-06765c52ec72')

    settlement.createSurvivor('test name')

    expect(getSnapshot(settlement)).toMatchSnapshot()
  })
})

describe('.filterSurvivors', () => {
  it('filters survivors by status', () => {
    let survivor1 = defaultSurvivor()
    let survivor2 = Object.assign(defaultSurvivor(), { status: 'dead' })

    let settlement = Settlement.create(
      Object.assign(newSettlementData, {
        survivors: {
          [survivor1.id]: survivor1,
          [survivor2.id]: survivor2,
        },
      })
    )

    let survivorList = settlement.filterSurvivors('alive')
    let deadList = settlement.filterSurvivors('dead')

    expect(survivorList).toHaveLength(1)
    expect(survivorList[0].id).toBe(survivor1.id)

    expect(deadList).toHaveLength(1)
    expect(deadList[0].id).toBe(survivor2.id)
  })
})

it('.hasSOTF throws if not attached', () => {
  let settlement = Settlement.create({})
  expect(() => settlement.hasSOTF).toThrow()
})

describe('with RootStore', () => {
  let store
  beforeEach(() => {
    store = RootStore.create()
  })

  describe('.hasSOTF', () => {
    it('has not sotf', () => {
      expect(store.selectedCampaign.settlement.hasSOTF).toBeFalsy()
    })

    it('has sotf', () => {
      store.selectedCampaign.selectPrinciple('newlife', { id: 'sotf' })
      expect(store.selectedCampaign.settlement.hasSOTF).toBeTruthy()
    })
  })
})
