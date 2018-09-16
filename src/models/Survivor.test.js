import { getSnapshot } from 'mobx-state-tree'
import { observable } from 'mobx'
import { Survivor } from './Survivor'
import RootStore from './RootStore'

it('creates a survivor', () => {
  const survivor = Survivor.create({ id: 'test' })

  expect(getSnapshot(survivor)).toMatchSnapshot()
})

it('.changeGender', () => {
  const survivor = Survivor.create({ id: 'test' })

  expect(survivor.gender).toBe('male')
  survivor.changeGender()
  expect(survivor.gender).toBe('female')
  survivor.changeGender()
  expect(survivor.gender).toBe('male')
})

it('cycleStatus', () => {
  const survivor = Survivor.create({ id: 'test' })

  expect(survivor.status).toBe('alive')
  survivor.cycleStatus()
  expect(survivor.status).toBe('dead')
  survivor.cycleStatus()
  expect(survivor.status).toBe('retired')
  survivor.cycleStatus()
  expect(survivor.status).toBe('alive')
})

describe('with RootStore', () => {
  let store
  let survivor

  beforeEach(() => {
    store = RootStore.create()
    survivor = store.selectedCampaign.settlement.createSurvivor('survivor')
  })

  it('handles fighting arts', () => {
    survivor.addFA({ id: 'Acrobatics' })
    survivor.addFA({ id: 'Clutch Fighter' })
    survivor.addFA({ id: 'Clarity of Darkness' })
    expect(survivor.fightingArts).toHaveLength(3)
    survivor.removeFA({ id: 'Clutch Fighter' })
    expect(survivor.fightingArts).toHaveLength(2)
  })

  it('handles disorders arts', () => {
    survivor.addDisorder({ id: 'Absent Seizures' })
    survivor.addDisorder({ id: 'Fear of the Dark' })
    survivor.addDisorder({ id: 'Indecision' })
    expect(survivor.disorders).toHaveLength(3)
    survivor.removeDisorder({ id: 'Fear of the Dark' })
    expect(survivor.disorders).toHaveLength(2)
  })

  it('handles abilities', () => {
    survivor.addAbility({ id: 'Acid Palms' })
    survivor.addAbility({ id: 'Homing Instinct' })
    survivor.addAbility({ id: 'Metal Maw' })
    survivor.addAbility({ id: 'Way of the Rust' })
    expect(survivor.abilities).toHaveLength(4)
    survivor.removeAbility({ id: 'Metal Maw' })
    expect(survivor.abilities).toHaveLength(3)
  })

  it('.setWeaponProficiency', () => {
    survivor.setWeaponProficiency({ id: 'fist & tooth' })
    expect(survivor.weaponProficiency.id).toBe('fist & tooth')
  })
})
