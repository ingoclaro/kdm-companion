import { types, applySnapshot } from 'mobx-state-tree'

it('overrides composed defaults', () => {
  let m1 = types.model({
    a: 0,
    b: '',
  })
  let m2 = types.model({
    a: 3,
    c: 'hello',
  })
  let m3 = types.compose(
    m1,
    m2
  )

  let instance = m3.create()

  expect(instance.a).toEqual(3)
})

it('applies snapshot on instance', () => {
  const DataStore = types
    .model('Store', {
      id: types.identifier,
      name: '',
      life: 0,
    })
    .actions(self => ({
      setName(name) {
        self.name = name
      },
      setLife(life) {
        self.life = life
      },
    }))

  let store = DataStore.create({ id: 'store1' })

  let snapshot = JSON.parse('{"id":"store1","name":"another name","life":44}')
  applySnapshot(store, snapshot)

  expect(store).toHaveProperty('name', 'another name')
  expect(store).toHaveProperty('life', 44)
})

it('cannot apply snapshot on instance with different id', () => {
  const DataStore = types
    .model('Store', {
      id: types.identifier,
      name: '',
      life: 0,
    })
    .actions(self => ({
      setName(name) {
        self.name = name
      },
      setLife(life) {
        self.life = life
      },
    }))

  let store = DataStore.create({ id: 'store2' })

  let snapshot = JSON.parse('{"id":"store1","name":"another name","life":44}')

  expect(() => applySnapshot(store, snapshot)).toThrowError()
})
