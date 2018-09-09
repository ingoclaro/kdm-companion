import { types } from 'mobx-state-tree'
import { FightingArt, SecretFightingArt } from './FightingArt'
import { Disorder } from './Disorder'
import { Ability } from './Ability'
import { uuid } from '../utils'
import R from 'ramda'

const Survivor = types
  .model('Survivor', {
    id: types.identifier,
    name: types.string,
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
  })
  .actions(self => ({
    addFA(fa) {
      let found = R.find(item => fa.id === item.id, self.fightingArts)
      if (!found) {
        self.fightingArts.push(fa)
      }
    },
    removeFA(fa) {
      self.fightingArts = R.reject(item => fa.id === item.id, self.fightingArts)
      // self.fightingArts.remove(fa) this throws an error.
    },
    addDisorder(disorder) {
      let found = R.find(item => disorder.id === item.id, self.disorders)
      if (!found) {
        self.disorders.push(disorder)
      }
    },
    removeDisorder(disorder) {
      self.disorders = R.reject(item => disorder.id === item.id, self.disorders)
      // self.disorders.remove(disorder)
    },
    addAbility(ability) {
      let found = R.find(item => ability.id === item.id, self.abilities)
      if (!found) {
        self.abilities.push(ability)
      }
    },
    removeAbility(ability) {
      self.abilities = R.reject(item => ability.id === item.id, self.abilities)
      // self.abilities.remove(ability)
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
    },
    saveNotes(notes) {
      self.notes = notes
    },
    cycleStatus() {
      let statusList = ['alive', 'dead', 'retired']
      let index = (statusList.indexOf(self.status) + 1) % statusList.length
      self.status = statusList[index]
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
  }))
const init = () => ({ id: uuid(), name: 'Unnamed' })

export { Survivor, init }
