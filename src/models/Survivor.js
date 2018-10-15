import { types } from 'mobx-state-tree'
import { FightingArt, SecretFightingArt } from './FightingArt'
import { Disorder } from './Disorder'
import { Ability } from './Ability'
import { WeaponProficiency } from './WeaponProficiency'
import { DragonTraits } from './DragonTraits'
import { uuid } from '../utils'
import R from 'ramda'

const Survivor = types
  .model('Survivor', {
    id: types.identifier,
    name: 'Unnamed',
    gender: types.optional(types.enumeration(['male', 'female']), 'male'),
    status: types.optional(
      types.enumeration(['alive', 'dead', 'retired']),
      'alive'
    ),

    fightingArts: types.array(
      types.reference(types.union(FightingArt, SecretFightingArt))
    ),
    disorders: types.array(types.reference(Disorder)),
    abilities: types.array(types.reference(Ability)),

    survival: 1,
    insanity: 0,
    'hunt xp': 0,

    movement: 5,
    accuracy: 0,
    strength: 0,
    evasion: 0,
    luck: 0,
    speed: 0,

    courage: 0,
    understanding: 0,

    notes: '',

    weaponProficiency: types.maybe(types.reference(WeaponProficiency)),
    weaponProficiencyLevel: 0,

    cannotUseSurvival: false,
    cannotUseFightingArts: false,
    cannotUseAbilities: false,
    rerollUsed: false, // was the reroll of survival of the fittest used?

    // People of the Stars Campaign
    dragonTraits: types.optional(DragonTraits, {}),
    // End People of the Stars Campaign
  })
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
      if (idx === 0) {
        self.abilities = self.abilities.slice(1)
      } else if (idx > 0) {
        self.abilities = self.abilities
          .slice(0, idx)
          .concat(self.abilities.slice(idx + 1))
      }
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
      }
      self.dragonTraits.handleAttributeChange(self)
    },
    saveNotes(notes) {
      self.notes = notes
    },
    cycleStatus() {
      let statusList = ['alive', 'dead', 'retired']
      let index = (statusList.indexOf(self.status) + 1) % statusList.length
      self.status = statusList[index]
    },
    toggleRerollUsed() {
      self.rerollUsed = !self.rerollUsed
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
const init = () => ({
  id: uuid(),
  name: 'Unnamed',
})

export { Survivor, init }
