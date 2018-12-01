import { getSnapshot } from 'mobx-state-tree'
import { Settlement, init as newSettlementData } from './Settlement'
import { Survivor, init as defaultSurvivor } from './Survivor'
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

it('keeps activeSurvivorsList up to date', () => {
  let settlement = Settlement.create({})
  let surv1 = settlement.createSurvivor()
  let surv2 = settlement.createSurvivor()

  expect(settlement.activeSurvivorsList).toHaveLength(2)
  surv2.cycleStatus()
  expect(settlement.activeSurvivorsList).toHaveLength(1)
  expect(settlement.activeSurvivorsList[0].id).toBe(surv1.id)
})

describe('.filterSurvivors', () => {
  it('filters survivors by status', () => {
    let settlement = Settlement.create({})
    let surv1 = settlement.createSurvivor()
    let surv2 = settlement.createSurvivor()

    surv2.cycleStatus()

    let survivorList = settlement.filterSurvivors('alive')
    let deadList = settlement.filterSurvivors('dead')

    expect(survivorList).toHaveLength(1)
    expect(survivorList[0].id).toBe(surv1.id)

    expect(deadList).toHaveLength(1)
    expect(deadList[0].id).toBe(surv2.id)
  })
})

describe('.reorderSurvivor', () => {
  it('moves survivor to the top', () => {
    let settlement = Settlement.create({})
    let surv1 = settlement.createSurvivor()
    let surv2 = settlement.createSurvivor()
    let surv3 = settlement.createSurvivor()
    let surv4 = settlement.createSurvivor()

    expect(settlement.activeSurvivorsList).toHaveLength(4)
    settlement.reorderSurvivor(surv3, 0)
    expect(settlement.activeSurvivorsList).toHaveLength(4)

    let survivorList = settlement.activeSurvivorsList

    console.log('survivorList', survivorList)

    expect(survivorList[0].id).toBe(surv3.id)
    expect(survivorList[1].id).toBe(surv1.id)
    expect(survivorList[2].id).toBe(surv2.id)
    expect(survivorList[3].id).toBe(surv4.id)
  })

  it('moves survivor to 2nd position', () => {
    let settlement = Settlement.create({})
    let surv1 = settlement.createSurvivor()
    let surv2 = settlement.createSurvivor()
    let surv3 = settlement.createSurvivor()
    let surv4 = settlement.createSurvivor()

    settlement.reorderSurvivor(surv3, 1)
    let survivorList = settlement.activeSurvivorsList

    expect(survivorList[0].id).toBe(surv1.id)
    expect(survivorList[1].id).toBe(surv3.id)
    expect(survivorList[2].id).toBe(surv2.id)
    expect(survivorList[3].id).toBe(surv4.id)
  })

  it('moves survivor to last position', () => {
    let settlement = Settlement.create({})
    let surv1 = settlement.createSurvivor()
    let surv2 = settlement.createSurvivor()
    let surv3 = settlement.createSurvivor()
    let surv4 = settlement.createSurvivor()

    settlement.reorderSurvivor(surv1, 3)
    let survivorList = settlement.activeSurvivorsList

    expect(survivorList[0].id).toBe(surv2.id)
    expect(survivorList[1].id).toBe(surv3.id)
    expect(survivorList[2].id).toBe(surv4.id)
    expect(survivorList[3].id).toBe(surv1.id)
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
