import { get_buildable_gear, get_keywords_count, substract } from './calculator'
import R from 'ramda'

describe('substract', () => {
  it('one element', () => {
    const a = { a: 2, b: 1 }
    const b = { a: 1 }
    expect(substract(a, b)).toEqual({ a: 1, b: 1 })
  })

  it('unexisting element', () => {
    const a = { a: 2, b: 1 }
    const b = { c: 1 }
    expect(substract(a, b)).toEqual({ a: 2, b: 1 })
  })

  it('until 0', () => {
    const a = { a: 2, b: 1 }
    const b = { a: 3 }
    expect(substract(a, b)).toEqual({ a: 0, b: 1 })
  })
})

let game_data = {
  gear: {
    white_lion_helm: {
      name: 'White Lion Helm',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'white fur': 1, organ: 1 },
        },
      ],
    },
    frenzy_drink: {
      name: 'Frenzy Drink',
      recipes: [
        {
          location: 'catarium',
          innovations: ['blah'],
          resources: { 'lion testes': 1 },
        },
      ],
    },
  },
  resources: {
    sinew: {
      keywords: ['organ'],
    },
  },
}

describe('get_keywords_count', () => {
  it('gets counts correctly', () => {
    const gear = { sinew: 2, organ: 2 }
    expect(get_keywords_count(gear, game_data)).toEqual({ organ: 4 })
  })
})

describe('get_buildable_gear', () => {
  it('gets buildable correctly', () => {
    const owned_resources = {
      'white fur': 1,
      sinew: 1,
      'lion claw': 2,
      'lion testes': 1,
    }
    expect(
      get_buildable_gear(owned_resources, ['catarium'], [], game_data)
    ).toEqual(['white_lion_helm'])
  })
})
