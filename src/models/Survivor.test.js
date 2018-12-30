import { getSnapshot } from 'mobx-state-tree'
import { observable } from 'mobx'
import { Survivor } from './Survivor'
import RootStore from './RootStore'

it('creates a survivor', () => {
  const survivor = Survivor.create({ id: 'test' })

  expect(getSnapshot(survivor)).toMatchSnapshot()
})

it('handles passed in properties', () => {
  const survivor = Survivor.create({ name: 'test', survival: 3, strength: 1 })

  expect(survivor).toHaveProperty('name', 'test')
  expect(survivor).toHaveProperty('survival', 3)
  expect(survivor).toHaveProperty('strength', 1)
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

  it('has a name', () => {
    expect(survivor.name).toMatch('survivor')
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

  it('has initial survival', () => {
    expect(survivor.survival).toBe(1)
  })

  it('gives all bonus', () => {
    store.selectedCampaign.setCampaignType('pots')
    store.selectedCampaign.selectInnovation({ id: 'saga' }) // courage: 2, understanding: 2, 'hunt xp': 2,
    store.selectedCampaign.selectInnovation({ id: 'clan_of_death' }) //  accuracy: 1, strength: 1, evasion: 1,
    store.selectedCampaign.selectInnovation({ id: 'radiating orb' }) //  survival: 1,
    store.selectedCampaign.selectInnovation({ id: 'empire' }) //  strength: 1,

    store.selectedCampaign.selectPrinciple('newlife', { id: 'sotf' }) // strength: 1, evasion: 1,
    store.selectedCampaign.selectPrinciple('death', { id: 'graves' }) // understanding: 1,
    store.selectedCampaign.selectPrinciple('conviction', { id: 'barbaric' }) // strength: 1,

    survivor2 = store.selectedCampaign.settlement.createSurvivor('survivor2')

    expect(survivor2).toMatchObject({
      strength: 4,
      evasion: 2,
      accuracy: 1,
      courage: 2,
      'hunt xp': 2,
      insanity: 0,
      luck: 0,
      movement: 5,
      speed: 0,
      survival: 2,
      understanding: 3,
    })

    expect(survivor2.dragonTraits).toHaveProperty('accuracy', true)
    expect(survivor2.dragonTraits).toHaveProperty('strength', true)
  })
})
