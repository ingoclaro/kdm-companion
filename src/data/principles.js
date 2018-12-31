export default {
  sotf: {
    id: 'sotf',
    name: 'Survival of the Fittests',
    settlement: {
      survival: 1,
      newborn: {
        strength: 1,
        evasion: 1,
      },
    },
    bonus:
      'When rolling on intimacy table, roll twice and keep lowest result.\nOnce per lifetime, a survivor may reroll a single roll result',
  },
  pty: {
    id: 'pty',
    name: 'Protect the Young',

    bonus: 'When rolling on intimacy table, roll twice and pick 1 result',
  },
  graves: {
    id: 'graves',
    name: 'Graves',
    settlement: {
      newborn: {
        understanding: 1,
      },
    },

    bonus:
      'When a survivor dies during hunt or showdown phase, gain +2 endeavors.\nWhen a survivor dies during settlement phase, gain +1 endeavors',
  },
  cannibalize: {
    id: 'cannibalize',
    name: 'Cannibalize',
    settlement: {
      survival: 1,
    },

    bonus: 'Whenever a survivor dies, gain 1 random basic resource',
  },
  accept_darkness: {
    id: 'accept_darkness',
    name: 'Accept Darkness',

    bonus: 'Add +2 to all Brain Trauma Rolls.',
  },
  collective_toil: {
    id: 'collective_toil',
    name: 'Collective Toil',

    bonus:
      'At the start of the settlement phase gain +1 endeavor for every 10 population',
  },
  barbaric: {
    id: 'barbaric',
    name: 'Barbaric',
    settlement: {
      survival: 1,
      newborn: {
        strength: 1,
      },
    },
  },
  romantic: {
    id: 'romantic',
    name: 'Romantic',
    settlement: {
      survival: 1,
    },

    bonus: 'When you gain a random FA, draw 3 cards and select one',
  },
}
