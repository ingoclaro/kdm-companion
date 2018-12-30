import { getSnapshot, setLivelynessChecking } from 'mobx-state-tree'
import { Settlement, init as newSettlementData } from './Settlement'
import RootStore from './RootStore'

import * as utils from '../utils'

setLivelynessChecking('error')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('.create', () => {
  it('works with empty data', () => {
    let settlement = Settlement.create()

    expect(getSnapshot(settlement)).toMatchSnapshot()
  })
})

it('.hasSOTF throws if not attached', () => {
  let settlement = Settlement.create({})
  expect(() => settlement.hasSOTF).toThrow()
})

describe('with RootStore', () => {
  let store
  let settlement

  beforeEach(() => {
    // this also affects the survivor creation.
    // const uuid = '960aa7ae-598a-49eb-888b-c6baa0006751'
    // let uuidMock = jest.spyOn(utils, 'uuid')
    // uuidMock.mockImplementation(() => uuid)
    store = RootStore.create()
    settlement = store.selectedCampaign.settlement
  })

  describe('.createSurvivor', () => {
    it('creates a survivor and assings it to the settlement', () => {
      let surv1 = settlement.createSurvivor('test name')

      expect(settlement.survivors.size).toEqual(1)
      expect(settlement.activeSurvivorsList).toHaveLength(1)
      expect(settlement.activeSurvivorsList[0].id).toEqual(surv1.id)
    })
  })

  it('keeps activeSurvivorsList up to date', () => {
    let surv1 = settlement.createSurvivor()
    let surv2 = settlement.createSurvivor()

    expect(settlement.activeSurvivorsList).toHaveLength(2)
    surv2.cycleStatus()
    expect(settlement.activeSurvivorsList).toHaveLength(1)
    expect(settlement.activeSurvivorsList[0].id).toBe(surv1.id)
  })

  describe('.filterSurvivors', () => {
    it('filters survivors by status', () => {
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
      let surv1 = settlement.createSurvivor()
      let surv2 = settlement.createSurvivor()
      let surv3 = settlement.createSurvivor()
      let surv4 = settlement.createSurvivor()

      expect(settlement.activeSurvivorsList).toHaveLength(4)
      settlement.reorderSurvivor(surv3, 0)
      expect(settlement.activeSurvivorsList).toHaveLength(4)

      let survivorList = settlement.activeSurvivorsList

      expect(survivorList[0].id).toBe(surv3.id)
      expect(survivorList[1].id).toBe(surv1.id)
      expect(survivorList[2].id).toBe(surv2.id)
      expect(survivorList[3].id).toBe(surv4.id)
    })

    it('moves survivor to 2nd position', () => {
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

  describe('.hasSOTF', () => {
    it('has not sotf', () => {
      expect(settlement.hasSOTF).toBeFalsy()
    })

    it('has sotf', () => {
      store.selectedCampaign.selectPrinciple('newlife', { id: 'sotf' })
      expect(settlement.hasSOTF).toBeTruthy()
    })
  })
})
