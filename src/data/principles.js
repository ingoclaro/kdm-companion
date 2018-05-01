export default {
  sotf: {
    id: 'sotf',
    name: 'Survival of the Fittests',
    settlement: {
      newborn: {
        strength: 1,
        evasion: 1,
      },
    },
    providesBonuses: [
      {
        id: 'newlife',
        name: 'Survival of the Fittests',
        description: [
          'When rolling on intimacy table, roll twice and keep lowest result',
          'Once per lifetime, a survivor may reroll a single roll result',
        ],
      },
    ],
  },
  pty: {
    id: 'pty',
    name: 'Protect the Young',
    providesBonuses: [
      {
        id: 'newlife',
        name: 'Protect the Young',
        description: [
          'When rolling on intimacy table, roll twice and pick 1 result',
        ],
      },
    ],
  },
  graves: {
    id: 'graves',
    name: 'Graves',
    settlement: {
      newborn: {
        understanding: 1,
      },
    },
    providesBonuses: [
      {
        id: 'death',
        name: 'Graves',
        description: [
          'When a survivor dies during hunt or showdown phase, gain +2 endeavors',
          'When a survivor dies during settlement phase, gain +1 endeavors',
        ],
      },
    ],
  },
  cannibalize: {
    id: 'cannibalize',
    name: 'Cannibalize',
    settlement: {
      survivalLimit: 1,
    },
    providesBonuses: [
      {
        id: 'death',
        name: 'Cannibalize',
        description: ['Whenever a survivor dies, gain 1 random basic resource'],
      },
    ],
  },
  accept_darkness: {
    id: 'accept_darkness',
    name: 'Accept Darkness',
    providesBonuses: [
      {
        id: 'society',
        name: 'Accept Darkness',
        description: ['Add +2 to all Brain Trauma Rolls.'],
      },
    ],
  },
  collective_toil: {
    id: 'collective_toil',
    name: 'Collective Toil',
    providesBonuses: [
      {
        id: 'society',
        name: 'Collective Toil',
        description: [
          'At the start of the settlement phase gain +1 endeavor for every 10 population',
        ],
      },
    ],
  },
  barbaric: {
    id: 'barbaric',
    name: 'Barbaric',
    settlement: {
      survivalLimit: 1,
      newborn: {
        strength: 1,
      },
    },
  },
  romantic: {
    id: 'romantic',
    name: 'Romantic',
    settlement: {
      survivalLimit: 1,
    },
    providesBonuses: [
      {
        id: 'conviction',
        name: 'Romantic',
        description: ['When you gain a random FA, draw 3 cards and select one'],
      },
    ],
  },
}
