import { types } from 'mobx-state-tree'

const values = [
  'purified',
  'purificationCeremony',
  'sunEater',
  'childOfTheSun',
  'solarRitual',
]

export const PotSun = types
  .model('PotSun', {
    attributes: types.map(types.enumeration(values)),
  })
  .actions(self => ({
    change(property) {
      if (property === 'purified') {
        self.cyclePurified()
      } else if (self.attributes.has(property)) {
        self.attributes.delete(property)
      } else {
        self.attributes.set(property, property)
      }
    },
    cyclePurified() {
      if (self.attributes.has('purificationCeremony')) {
        self.attributes.delete('purified')
        self.attributes.delete('purificationCeremony')
      } else if (self.attributes.has('purified')) {
        self.attributes.set('purificationCeremony', 'purificationCeremony')
      } else {
        self.attributes.set('purified', 'purified')
      }
    },
  }))
  .views(self => ({
    has(property) {
      return self.attributes.has(property)
    },
  }))
