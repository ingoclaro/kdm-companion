import { types } from 'mobx-state-tree'
import { FightingArt } from './FightingArt'
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

    fightingArts: types.array(types.reference(FightingArt)),
    disorders: types.array(types.reference(Disorder)),
    abilities: types.array(types.reference(Ability)),

    survival: 1,
    insanity: 0,
    age: 0,

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
      // TODO: removing an element other than the last gives an error.
      self.fightingArts.remove(fa)
    },
    addDisorder(disorder) {
      let found = R.find(item => disorder.id === item.id, self.disorders)
      if (!found) {
        self.disorders.push(disorder)
      }
    },
    removeDisorder(disorder) {
      // TODO: removing an element other than the last gives an error.
      self.disorders.remove(disorder)
    },
    changeGender() {
      let gender = self.gender === 'male' ? 'female' : 'male'
      self.gender = gender
    },
    setAttribute(attribute, quantity) {
      if (self[attribute] !== undefined) {
        self[attribute] = quantity
      }
    },
    saveNotes(notes) {
      self.notes = notes
    },
  }))
const init = () => ({ id: uuid(), name: 'Unnamed' })

export { Survivor, init }
