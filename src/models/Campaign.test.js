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
        description: 'Whenever a survivor dies, gain 1 random basic resource',
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
})
