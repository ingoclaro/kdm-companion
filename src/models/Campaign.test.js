import { getSnapshot } from 'mobx-state-tree'
import { keys, values, observable } from 'mobx'
import { Campaign } from './Campaign'
import RootStore from './RootStore'
import * as utils from '../utils'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('.create', () => {
  it('creates a barebones campaign', () => {
    const uuid = '960aa7ae-598a-49eb-888b-c6baa0006751'
    let uuidMock = jest.spyOn(utils, 'uuid')
    uuidMock.mockImplementation(() => uuid)

    let campaign = Campaign.create()

    expect(campaign).toBeDefined()
    expect(campaign.id).toBe(uuid)
    expect(getSnapshot(campaign)).toMatchSnapshot()
  })
})

describe('with RootStore', () => {
  let store
  beforeEach(() => {
    const uuid = '960aa7ae-598a-49eb-888b-c6baa0006751'
    let uuidMock = jest.spyOn(utils, 'uuid')
    uuidMock.mockImplementation(() => uuid)
    store = RootStore.create()
  })

  describe('.selectLocation', () => {
    it('adds location without endeavors', () => {
      let location = { id: 'catarium' }
      store.selectedCampaign.selectLocation(location)

      expect(getSnapshot(store.selectedCampaign)).toMatchSnapshot()
    })
    it('removes location without endeavors', () => {
      let location = { id: 'catarium' }
      store.selectedCampaign.selectLocation(location)
      store.selectedCampaign.selectLocation(location) // this removes the location.

      expect(getSnapshot(store.selectedCampaign)).toMatchSnapshot()
    })

    it('adds location with endeavors', () => {
      let location = { id: 'lantern_hoard' }
      store.selectedCampaign.selectLocation(location)

      expect(store.selectedCampaign.endeavors).toHaveLength(5)
      expect(store.selectedCampaign.endeavors).toMatchObject([
        { id: 'innovate' },
        { id: 'shared_experience' },
        { id: 'build_bone_smith' },
        { id: 'build_skinnery' },
        { id: 'build_organ_grinder' },
      ])
    })
    it('removes location with endeavors', () => {
      let location = { id: 'stone_circle' }
      store.selectedCampaign.selectLocation(location)
      store.selectedCampaign.selectLocation(location) // this removes the location.

      expect(store.selectedCampaign.endeavors).toHaveLength(0)
    })
    it('can add locations with multiple endeavors', () => {
      let location = { id: 'weapon_crafter' }
      store.selectedCampaign.selectLocation(location)

      expect(store.selectedCampaign.endeavors).toHaveLength(2)
    })
  })

  describe('.selectInnovation', () => {
    it('can add an innovation', () => {
      let innovation = { id: 'inner_lantern' }
      store.selectedCampaign.selectInnovation(innovation)

      expect(store.selectedCampaign.innovations.size).toEqual(1)
      expect(
        store.selectedCampaign.innovations.has('inner_lantern')
      ).toBeTruthy()
    })
    it('can remove an innovation', () => {
      let innovation = { id: 'inner_lantern' }
      store.selectedCampaign.selectInnovation(innovation)
      store.selectedCampaign.selectInnovation(innovation) // this removes the innovation

      expect(store.selectedCampaign.innovations.size).toEqual(0)
    })

    it('adds innovation with bonuses', () => {
      let innovation = { id: 'cooking' }
      store.selectedCampaign.selectInnovation(innovation)

      expect(store.selectedCampaign.bonuses).toHaveLength(1)

      expect(store.selectedCampaign.bonuses[0]).toMatchObject({
        description: 'At the start of the Settlement phase gain +1 endeavor',
      })
      expect(getSnapshot(store.selectedCampaign)).toMatchSnapshot()
    })
    it('removes innovation with bonuses', () => {
      let innovation = { id: 'cooking' }
      store.selectedCampaign.selectInnovation(innovation)
      store.selectedCampaign.selectInnovation(innovation) // this removes the innovation

      expect(store.selectedCampaign.bonuses).toHaveLength(0)

      expect(getSnapshot(store.selectedCampaign)).toMatchSnapshot()
    })

    it('handles innovation with endeavors', () => {
      let innovation = { id: 'partnership' }
      store.selectedCampaign.selectInnovation(innovation)

      expect(store.selectedCampaign.endeavors).toHaveLength(1)
      expect(store.selectedCampaign.endeavors).toMatchObject([
        { id: 'partnership' },
      ])
    })

    it('handles removing innovation with endeavors', () => {
      let innovation = { id: 'partnership' }
      store.selectedCampaign.selectInnovation(innovation)
      store.selectedCampaign.selectInnovation(innovation)

      expect(store.selectedCampaign.endeavors).toHaveLength(0)
    })
  })

  describe('.selectHunt', () => {
    it('sets the hunt', () => {
      store.selectedCampaign.selectHunt({
        monster_id: 'white_lion',
        level_id: '1',
      })

      expect(store.selectedCampaign.hunting.monster).toHaveProperty(
        'id',
        'white_lion'
      )
      expect(store.selectedCampaign.hunting).toHaveProperty('level', '1')
    })

    it('sets the showdown', () => {
      store.selectedCampaign.selectHunt({
        monster_id: 'white_lion',
        level_id: '1',
      })

      expect(store.selectedCampaign.showdown.monster).toHaveProperty(
        'id',
        'white_lion'
      )
      expect(store.selectedCampaign.showdown).toHaveProperty('level', '1')
    })
  })

  describe('.selectShowdown', () => {
    it('sets the showdown', () => {
      store.selectedCampaign.selectShowdown({
        monster_id: 'white_lion',
        level_id: '2',
      })

      expect(store.selectedCampaign.showdown.monster).toHaveProperty(
        'id',
        'white_lion'
      )
      expect(store.selectedCampaign.showdown).toHaveProperty('level', '2')
    })
  })

  describe('.selectExpansion', () => {
    it('does not remove core expansion', () => {
      store.selectedCampaign.selectExpansion({ id: 'core' })

      expect(store.selectedCampaign.expansions.get('core')).toBeDefined()
    })

    it('adds expansion', () => {
      store.selectedCampaign.selectExpansion({ id: 'dk' })

      expect(store.selectedCampaign.expansions.get('dk')).toBeDefined()
    })

    it('removes expansion', () => {
      store.selectedCampaign.selectExpansion({ id: 'dk' })
      store.selectedCampaign.selectExpansion({ id: 'dk' })

      expect(store.selectedCampaign.expansions.get('dk')).toBeUndefined()
    })

    it('resets expansion related data when removing expansion', () => {
      let campaign = { id: 'dk' }
      store.selectedCampaign.selectExpansion(campaign)
      store.selectedCampaign.selectLocation({ id: 'throne' })
      store.selectedCampaign.selectInnovation({ id: 'radiating orb' })
      store.selectedCampaign.setResourceCount({ id: 'hardened ribs' }, 2) // dk monster resource
      store.selectedCampaign.setResourceCount({ id: 'pituitary gland' }, 2) // dk expansion strange resource
      store.selectedCampaign.selectHunt({ monster_id: 'dk', level_id: '1' })

      // remove the expansion
      store.selectedCampaign.selectExpansion(campaign)

      expect(store.selectedCampaign.expansions.get('dk')).toBeUndefined()
      expect(store.selectedCampaign.hunting).toBeNull()
      expect(store.selectedCampaign.locations.get('throne')).toBeUndefined()
      expect(
        store.selectedCampaign.innovations.get('radiating orb')
      ).toBeUndefined()
      expect(
        store.selectedCampaign.stored_resources.get('pituitary gland')
      ).toHaveProperty('quantity', 0)
      expect(
        store.selectedCampaign.stored_resources.get('hardened ribs')
      ).toHaveProperty('quantity', 0)

      expect(getSnapshot(store.selectedCampaign)).toMatchSnapshot()
    })
  })

  describe('.selectPrinciple', () => {
    it('adds a principle', () => {
      store.selectedCampaign.selectPrinciple('death', { id: 'cannibalize' })

      expect(getSnapshot(store.selectedCampaign)).toMatchSnapshot()
    })

    it("accounts for principle's bonus", () => {
      store.selectedCampaign.selectPrinciple('death', { id: 'cannibalize' })

      expect(store.selectedCampaign.bonuses).toHaveLength(1)
      expect(store.selectedCampaign.bonuses[0]).toMatchObject({
        description: 'Whenever a survivor dies, gain 1 random basic resource.',
      })
    })

    it("removes a principle with it's bonus", () => {
      store.selectedCampaign.selectPrinciple('death', { id: 'cannibalize' })
      store.selectedCampaign.selectPrinciple('death', { id: null })

      expect(store.selectedCampaign.bonuses).toHaveLength(0)
      expect(getSnapshot(store.selectedCampaign)).toMatchSnapshot()
    })
  })

  describe('.setResourceCount', () => {
    it('creates new stored resource', () => {
      expect(
        store.selectedCampaign.stored_resources.get('sinew')
      ).toBeUndefined()

      store.selectedCampaign.setResourceCount({ id: 'sinew' }, 2)

      expect(store.selectedCampaign.stored_resources.get('sinew')).toBeDefined()
      expect(
        store.selectedCampaign.stored_resources.get('sinew')
      ).toHaveProperty('quantity', 2)
    })

    it('updates existing resource', () => {
      store.selectedCampaign.setResourceCount({ id: 'sinew' }, 2)
      store.selectedCampaign.setResourceCount({ id: 'sinew' }, 4)

      expect(
        store.selectedCampaign.stored_resources.get('sinew')
      ).toHaveProperty('quantity', 4)
    })
  })

  describe('.huntingMonsterLevel', () => {
    it('gets the monster level', () => {
      store.selectedCampaign.selectHunt({
        monster_id: 'white_lion',
        level_id: '3',
      })

      expect(
        getSnapshot(store.selectedCampaign.huntingMonsterLevel)
      ).toMatchSnapshot()
    })
  })

  describe('.showdownMonsterLevel', () => {
    it('gets the monster level', () => {
      store.selectedCampaign.selectHunt({
        monster_id: 'white_lion',
        level_id: '3',
      })

      expect(
        getSnapshot(store.selectedCampaign.showdownMonsterLevel)
      ).toMatchSnapshot()
    })
  })

  describe('.selectedExpansionFilter', () => {
    it('filters regular objects', () => {
      store.selectedCampaign.selectExpansion({ id: 'dk' })

      let items = [
        { id: 'test1', expansion: { id: 'core' } },
        { id: 'test2', expansion: { id: 'dk' } },
        { id: 'test3', expansion: { id: 'gorm' } },
      ]

      let filtered = store.selectedCampaign.selectedExpansionFilter(items)
      expect(filtered).toEqual([
        { id: 'test1', expansion: { id: 'core' } },
        { id: 'test2', expansion: { id: 'dk' } },
      ])
    })

    it('filters maps', () => {
      store.selectedCampaign.selectExpansion({ id: 'dk' })

      let items = observable.map(
        new Map([
          ['test1', { id: 'test1', expansion: { id: 'core' } }],
          ['test2', { id: 'test2', expansion: { id: 'dk' } }],
          ['test3', { id: 'test3', expansion: { id: 'gorm' } }],
        ])
      )

      let filtered = store.selectedCampaign.selectedExpansionFilter(items)
      expect(filtered).toEqual([
        { id: 'test1', expansion: { id: 'core' } },
        { id: 'test2', expansion: { id: 'dk' } },
      ])
    })

    it('filters campaigns', () => {
      store.selectedCampaign.setCampaignType('pots')

      let items = observable.map(
        new Map([
          ['test0', { id: 'test0' }],
          ['test1', { id: 'test1', expansion: { id: 'core' } }],
          ['test2', { id: 'test2', expansion: { id: 'dk' } }],
          ['test3', { id: 'test3', expansion: { id: 'gorm' } }],
          [
            'test4',
            {
              id: 'test4',
              expansion: { id: 'core' },
              campaign: { id: 'potl' },
            },
          ],
          [
            'test5',
            { id: 'test5', expansion: { id: 'dk' }, campaign: { id: 'pots' } },
          ],
        ])
      )

      let filtered = store.selectedCampaign.selectedExpansionFilter(items)
      expect(filtered).toEqual([
        { id: 'test0' },
        { id: 'test1', expansion: { id: 'core' } },
        { id: 'test2', expansion: { id: 'dk' } },
        { id: 'test5', expansion: { id: 'dk' }, campaign: { id: 'pots' } },
      ])

      store.selectedCampaign.setCampaignType('potl')
      filtered = store.selectedCampaign.selectedExpansionFilter(items)
      expect(filtered).toEqual([
        { id: 'test0' },
        { id: 'test1', expansion: { id: 'core' } },
        { id: 'test2', expansion: { id: 'dk' } },
        { id: 'test4', expansion: { id: 'core' }, campaign: { id: 'potl' } },
      ])
    })
  })

  describe('.expansionContent', () => {
    it('gets all content', () => {
      store.selectedCampaign.selectExpansion({ id: 'dk' })
      store.selectedCampaign.selectLocation({ id: 'throne' })
      store.selectedCampaign.selectInnovation({ id: 'radiating orb' })
      store.selectedCampaign.setResourceCount({ id: 'hardened ribs' }, 2) // dk monster resource
      store.selectedCampaign.setResourceCount({ id: 'pituitary gland' }, 2) // dk expansion strange resource

      expect(
        store.selectedCampaign.expansionContent({ id: 'dk' })
      ).toMatchSnapshot()
    })
  })

  describe('.hasSOTF', () => {
    it('has not sotf', () => {
      expect(store.selectedCampaign.hasSOTF).toBeFalsy()
    })

    it('has sotf', () => {
      store.selectedCampaign.selectPrinciple('newlife', { id: 'sotf' })
      expect(store.selectedCampaign.hasSOTF).toBeTruthy()
    })
  })

  describe('.endeavors', () => {
    it('filters endeavors that match the not_location recipe', () => {
      let innovation = { id: 'scrap_smelting' }
      store.selectedCampaign.selectInnovation(innovation)

      expect(store.selectedCampaign.endeavors).toHaveLength(2)

      let location = { id: 'blacksmith' }
      store.selectedCampaign.selectLocation(location)

      expect(store.selectedCampaign.endeavors).toHaveLength(1)
      expect(store.selectedCampaign.endeavors).toMatchObject([
        { id: 'purification' },
      ])
    })

    it('filters endeavors that do not match the innovation recipe', () => {
      let location = { id: 'leather_worker' }
      store.selectedCampaign.selectLocation(location)

      expect(store.selectedCampaign.endeavors).toHaveLength(0) // leather_making requires ammonia

      let innovation = { id: 'ammonia' }
      store.selectedCampaign.selectInnovation(innovation)

      expect(store.selectedCampaign.endeavors).toHaveLength(1)
      expect(store.selectedCampaign.endeavors).toMatchObject([
        { id: 'leather_making' },
      ])
    })

    it('filters endeavors that match the not_innovation recipe', () => {
      let location = { id: 'weapon_crafter' }
      store.selectedCampaign.selectLocation(location)

      expect(store.selectedCampaign.endeavors).toHaveLength(2)

      let innovation = { id: 'scrap_smelting' }
      store.selectedCampaign.selectInnovation(innovation)

      expect(store.selectedCampaign.endeavors).toHaveLength(3) // 1 from weapon_crafter, 2 from scrap_smelting
      expect(store.selectedCampaign.endeavors).toMatchObject([
        { id: 'purification' },
        { id: 'build_blacksmith' },
        { id: 'scrap_scavenge' },
      ])
    })
  })

  describe('.survivalLimit', () => {
    it('is 1 for a new campaign', () => {
      expect(store.selectedCampaign.survivalLimit).toEqual(1)
    })

    it('considers bonuses from innovations', () => {
      store.selectedCampaign.selectInnovation({ id: 'pottery' }) // +1
      store.selectedCampaign.selectInnovation({ id: 'storytelling' }) // +1
      store.selectedCampaign.selectInnovation({ id: 'ammonia' }) // n/a

      expect(store.selectedCampaign.survivalLimit).toEqual(3)
    })

    it('considers bonuses from principles', () => {
      store.selectedCampaign.selectPrinciple('conviction', { id: 'romantic' }) // +1

      expect(store.selectedCampaign.survivalLimit).toEqual(2)
    })

    it('considers combined bonuses', () => {
      store.selectedCampaign.selectInnovation({ id: 'pottery' }) // +1
      store.selectedCampaign.selectPrinciple('conviction', { id: 'romantic' }) // +1

      expect(store.selectedCampaign.survivalLimit).toEqual(3)
    })
  })

  describe('.newborn', () => {
    it('returns initial newborn stats', () => {
      expect(store.selectedCampaign.newbornBonus).toMatchObject({
        accuracy: 0,
        courage: 0,
        description: '',
        evasion: 0,
        'hunt xp': 0,
        insanity: 0,
        luck: 0,
        movement: 0,
        speed: 0,
        strength: 0,
        survival: 0,
        understanding: 0,
        weaponProficiencyLevel: 0,
      })
    })

    it('handles newborn bonueses from innovations', () => {
      store.selectedCampaign.selectInnovation({ id: 'saga' }) // courage: 2, understanding: 2, 'hunt xp': 2,

      expect(store.selectedCampaign.newbornBonus).toMatchObject({
        courage: 2,
        understanding: 2,
        'hunt xp': 2,
        accuracy: 0,
        description: '',
        evasion: 0,
        insanity: 0,
        luck: 0,
        movement: 0,
        speed: 0,
        strength: 0,
        survival: 0,
        weaponProficiencyLevel: 0,
      })
    })

    it('handles newborn bonuses from principles', () => {
      store.selectedCampaign.selectPrinciple('newlife', { id: 'sotf' }) // strength: 1, evasion: 1,

      expect(store.selectedCampaign.newbornBonus).toMatchObject({
        strength: 1,
        evasion: 1,
        accuracy: 0,
        courage: 0,
        description: '',
        'hunt xp': 0,
        insanity: 0,
        luck: 0,
        movement: 0,
        speed: 0,
        survival: 0,
        understanding: 0,
        weaponProficiencyLevel: 0,
      })
    })

    it('combines descriptions', () => {
      store.selectedCampaign.selectExpansion({ id: 'sunstalker' })
      store.selectedCampaign.selectInnovation({ id: 'family' }) // '**Family**: a newborn survivor inherits the surname of one of the parents, their weapon type and 1/2 their weapon proficiency.'
      store.selectedCampaign.selectInnovation({ id: 'umbilical bank' }) // '**Umbilical Bank**: You may add 1 Life String strange resource to the storage.',

      expect(store.selectedCampaign.newbornBonus.description).toMatch(
        '**Family**: a newborn survivor inherits the surname of one of the parents, their weapon type and 1/2 their weapon proficiency.\n**Umbilical Bank**: You may add 1 Life String strange resource to the storage.'
      )
    })

    it('adds bonuses properly', () => {
      store.selectedCampaign.selectInnovation({ id: 'saga' }) // courage: 2, understanding: 2, 'hunt xp': 2,
      store.selectedCampaign.selectPrinciple('newlife', { id: 'sotf' }) // strength: 1, evasion: 1,
      store.selectedCampaign.selectInnovation({ id: 'clan_of_death' }) //  accuracy: 1, strength: 1, evasion: 1,

      expect(store.selectedCampaign.newbornBonus).toMatchObject({
        strength: 2,
        evasion: 2,
        accuracy: 1,
        courage: 2,
        description: '',
        'hunt xp': 2,
        insanity: 0,
        luck: 0,
        movement: 0,
        speed: 0,
        survival: 0,
        understanding: 2,
        weaponProficiencyLevel: 0,
      })
    })

    it('all in', () => {
      store.selectedCampaign.selectInnovation({ id: 'saga' }) // courage: 2, understanding: 2, 'hunt xp': 2,
      store.selectedCampaign.selectInnovation({ id: 'clan_of_death' }) //  accuracy: 1, strength: 1, evasion: 1,
      store.selectedCampaign.selectInnovation({ id: 'radiating orb' }) //  survival: 1,
      store.selectedCampaign.selectInnovation({ id: 'empire' }) //  strength: 1,

      store.selectedCampaign.selectPrinciple('newlife', { id: 'sotf' }) // strength: 1, evasion: 1,
      store.selectedCampaign.selectPrinciple('death', { id: 'graves' }) // understanding: 1,
      store.selectedCampaign.selectPrinciple('conviction', { id: 'barbaric' }) // strength: 1,

      expect(store.selectedCampaign.newbornBonus).toMatchObject({
        strength: 4,
        evasion: 2,
        accuracy: 1,
        courage: 2,
        description: '**Empire**: gain **Pristine** ability.\n',
        'hunt xp': 2,
        insanity: 0,
        luck: 0,
        movement: 0,
        speed: 0,
        survival: 1,
        understanding: 3,
        weaponProficiencyLevel: 0,
      })
    })
  })

  describe('.departing', () => {
    it('returns initial stats', () => {
      expect(store.selectedCampaign.departingBonus).toMatchObject({
        accuracy: 0,
        courage: 0,
        description: '',
        evasion: 0,
        'hunt xp': 0,
        insanity: 0,
        luck: 0,
        movement: 0,
        speed: 0,
        strength: 0,
        survival: 0,
        understanding: 0,
        weaponProficiencyLevel: 0,
      })
    })

    it('handles departing bonueses from innovations', () => {
      store.selectedCampaign.selectExpansion({ id: 'lg' })
      store.selectedCampaign.selectExpansion({ id: 'dk' })
      store.selectedCampaign.selectInnovation({ id: 'the knowledge worm' })
      store.selectedCampaign.selectInnovation({ id: 'radiating orb' })

      expect(store.selectedCampaign.departingBonus).toMatchObject({
        accuracy: 0,
        courage: 0,
        description:
          '**The Knowledge Worm**: survivors with 10+ insanity, ![book](book) "A Gracious Host".\n**Radiating Orb**: Survivors with a constellation gain +1 survival.\n',
        evasion: 0,
        'hunt xp': 0,
        insanity: 3,
        luck: 0,
        movement: 0,
        speed: 0,
        strength: 0,
        survival: 4,
        understanding: 0,
        weaponProficiencyLevel: 0,
      })
    })
  })

  describe('.showdown', () => {
    it('returns initial stats', () => {
      expect(store.selectedCampaign.showdownBonus).toMatchObject({
        accuracy: 0,
        courage: 0,
        description: '',
        evasion: 0,
        'hunt xp': 0,
        insanity: 0,
        luck: 0,
        movement: 0,
        speed: 0,
        strength: 0,
        survival: 0,
        understanding: 0,
        weaponProficiencyLevel: 0,
      })
    })

    it('handles bonueses from innovations', () => {
      store.selectedCampaign.selectInnovation({ id: 'song_of_the_brave' })
      store.selectedCampaign.selectInnovation({ id: 'ultimate_weapon' })

      expect(store.selectedCampaign.showdownBonus).toMatchObject({
        accuracy: 0,
        courage: 0,
        description:
          '**Song of the Brave**: On arrival each non-deaf survivor may remove 1 negative attribute token.\n**Ultimate Weapon**: When you defeat a monster, gain 1 monster resource of your choice.\n',
        evasion: 0,
        'hunt xp': 0,
        insanity: 0,
        luck: 0,
        movement: 0,
        speed: 0,
        strength: 0,
        survival: 0,
        understanding: 0,
        weaponProficiencyLevel: 0,
      })
    })
  })
})
