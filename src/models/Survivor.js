import { types, getParent } from 'mobx-state-tree'
import { SurvivorStats } from './SurvivorStats'
import { FightingArt, SecretFightingArt } from './FightingArt'
import { Disorder } from './Disorder'
import { Ability } from './Ability'
import { WeaponProficiency } from './WeaponProficiency'
import { DragonTraits } from './DragonTraits'
import { uuid } from '../utils'

const statusList = ['alive', 'dead', 'retired']

const Survivor = types
  .compose(
    'Survivor',
    SurvivorStats,
    types.model({
      id: types.optional(types.identifier, () => uuid()),
      name: 'Unnamed',
      gender: types.optional(types.enumeration(['male', 'female']), 'male'),
      status: types.optional(types.enumeration(statusList), statusList[0]),

      fightingArts: types.array(
        types.reference(types.union(FightingArt, SecretFightingArt))
      ),
      disorders: types.array(types.reference(Disorder)),
      abilities: types.array(types.reference(Ability)),

      survival: 1,
      movement: 5,

      notes: '',

      weaponProficiency: types.maybe(types.reference(WeaponProficiency)),

      cannotUseSurvival: false,
      cannotUseFightingArts: false,
      cannotUseAbilities: false,
      rerollUsed: false, // was the reroll of survival of the fittest used?
      skipNextHunt: false, // should the survivor skip the next hunt?

      // People of the Stars Campaign
      dragonTraits: types.optional(DragonTraits, {}),
      // End People of the Stars Campaign
    })
  )
  .actions(self => ({
    addFA(fa) {
      let found = self.fightingArts.find(item => item.id === fa.id)
      if (!found) {
        self.fightingArts.push(fa.id)
      }
      self.dragonTraits.handleFAChange(self)
    },
    removeFA(fa) {
      self.fightingArts = self.fightingArts.filter(item => item.id !== fa.id)
    },
    addDisorder(disorder) {
      let found = self.disorders.find(item => item.id === disorder.id)
      if (!found) {
        self.disorders.push(disorder.id)
      }
      self.dragonTraits.handleDisorderChange(self)
    },
    removeDisorder(disorder) {
      self.disorders = self.disorders.filter(item => item.id !== disorder.id)
    },
    addAbility(ability) {
      let numFound = self.abilities.filter(item => item.id === ability.id)
        .length
      if (numFound === 0 || numFound < ability.max) {
        self.abilities.push(ability.id)
      }
      self.dragonTraits.handleAbilityChange(self)
    },
    removeAbility(ability) {
      let idx = self.abilities.findIndex(item => item.id === ability.id)

      self.abilities = self.abilities
        .slice(0, idx)
        .concat(self.abilities.slice(idx + 1))
    },
    changeGender() {
      let gender = self.gender === 'male' ? 'female' : 'male'
      self.gender = gender
    },
    setAttribute(attribute, quantity) {
      if (self[attribute] !== undefined) {
        self[attribute] = quantity
      }
      if (self['hunt xp'] >= 16) {
        self.status = 'retired'
        self.handleStatusChange()
      }
      if (attribute === 'status') {
        self.handleStatusChange()
      }
      self.dragonTraits.handleAttributeChange(self)
    },
    saveNotes(notes) {
      self.notes = notes
    },
    cycleStatus() {
      let index = (statusList.indexOf(self.status) + 1) % statusList.length
      self.status = statusList[index]

      self.handleStatusChange()
    },
    toggleRerollUsed() {
      self.rerollUsed = !self.rerollUsed
    },
    toggleSkipNextHunt() {
      self.skipNextHunt = !self.skipNextHunt
    },
    applyNewbornMilestones() {
      // handle newborn milestones derived by bonuses
      if (self.understanding >= 3) {
        self.abilities.push('Tinker')
      }
      if (self.courage >= 3) {
        self.abilities.push('Matchmaker')
      }
    },
    setWeaponProficiency(prof) {
      if (!self.weaponProficiency || self.weaponProficiency.id !== prof.id) {
        self.weaponProficiencyLevel = 0
        self.weaponProficiency = prof.id
      }
    },
    handleStatusChange() {
      try {
        let settlement = getParent(self, 2)
        settlement.handleSurvivorStatusChange(self)
      } catch (e) {
        // not attached to a settlement
      }
    },
    // afterAttach() { // This doesn't work because after loading a campaign from disc it triggers again :(
    //   let settlement = getParent(self, 2)
    //   // apply newborn bonus
    //   for (let key in SurvivorStats.create()) {
    //     self[key] += settlement.newborn[key]
    //   }

    //   self.survival = Math.min(self.survival, settlement.survivalLimit)

    //   self.applyNewbornMilestones()
    // },
  }))
  .views(self => ({
    get weaponProficiencySpecialization() {
      if (self.weaponProficiency && self.weaponProficiencyLevel >= 3) {
        return self.weaponProficiency.specialistBonus
      } else {
        return null
      }
    },
    get weaponProficiencyMastery() {
      if (self.weaponProficiency && self.weaponProficiencyLevel >= 8) {
        return self.weaponProficiency.masterBonus
      } else {
        return null
      }
    },
  }))

export { Survivor }
