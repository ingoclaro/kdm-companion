export default {
  white_lion: {
    id: 'white_lion',
    name: 'White Lion',
    expansion: 'core',
    resources: [
      'curious hand',
      'eye of cat',
      'golden whiskers',
      'great cat bone',
      'lion claw',
      'lion tail',
      'lion testes',
      'shimmering mane',
      'sinew',
      'white fur',
    ],
    type: 'quarry',
    instinct: {
      name: 'Sniff',
      description:
        "The White Lion sniffs and ends it's turn. Until the end of the next round, all survivors are now threats. At level 3+ gain +1 accuracy token.",
    },
    levels: {
      'white_lion-prologue': {
        id: 'white_lion-prologue',
        name: 'Prologue',
        type: 'nemesis',
        movement: 6,
        toughness: 6,
        speed: 0,
        damage: 0,
        deck: 'custom', // TODO: get list of cards
      },
      'white_lion-1': {
        id: 'white_lion-1',
        name: '1',
        huntboard: 'MMBXMOBMMBBS',
        movement: 6,
        toughness: 8,
        speed: 0,
        damage: 0,
        deck: {
          B: 7,
          A: 3,
        },
      },
      'white_lion-2': {
        id: 'white_lion-2',
        name: '2',
        huntboard: 'MMBBMOXMMBBS',
        movement: 7,
        toughness: 10,
        speed: 1,
        damage: 1,
        deck: {
          B: 10,
          A: 5,
          S: ['Cunning'],
        },
      },
      'white_lion-3': {
        id: 'white_lion-3',
        name: '3',
        huntboard: 'MMBBMOBMMBBXS',
        movement: 8,
        toughness: 14,
        speed: 2,
        damage: 2,
        accuracy: 2,
        luck: 1,
        deck: {
          B: 10,
          A: 9,
          L: 2,
          S: ['Cunning', 'Merciless'],
        },
      },
    },
  },
  screaming_antelope: {
    id: 'screaming_antelope',
    name: 'Screaming Antelope',
    expansion: 'core',
    resources: [
      'beast steak',
      'bladder',
      'large flat tooth',
      'muscly gums',
      'pelt',
      'screaming brain',
      'shank bone',
      'spiral horn',
    ],
    type: 'quarry',
    instinct: {
      name: 'Graze',
      description:
        "The monster full moves to the closest Acanthus plant and ends it's turn. If the monster is on or adjacent to an Acanthus plant, archive it and heal 1 wound. If there are no Acanthus plants, full move forward in a straight line.",
    },
    levels: {
      'screaming_antelope-1': {
        id: 'screaming_antelope-1',
        name: '1',
        huntboard: 'MBMXBOMBMBBS',
        movement: 6,
        toughness: 8,
        speed: 0,
        damage: 0,
        deck: {
          B: 7,
          A: 3,
          S: ['Trample'],
        },
      },
      'screaming_antelope-2': {
        id: 'screaming_antelope-2',
        name: '2',
        huntboard: 'MBMBBOMXMBBS',
        movement: 8,
        toughness: 10,
        speed: 1,
        damage: 1,
        deck: {
          B: 10,
          A: 5,
          S: ['Trample', 'Diabolical'],
        },
      },
      'screaming_antelope-3': {
        id: 'screaming_antelope-3',
        name: '3',
        huntboard: 'MBMBBOMBMXBS',
        movement: 8,
        toughness: 12,
        speed: 2,
        damage: 2,
        evasion: 1,
        deck: {
          B: 12,
          A: 8,
          L: 2,
          S: ['Trample', 'Diabolical', 'Hypermetabolism'],
        },
      },
    },
  },
  phoenix: {
    id: 'phoenix',
    name: 'Phoenix',
    expansion: 'core',
    resources: [
      'bird beak',
      'black skull',
      'hollow wing bone',
      'muculent droppings',
      'phoenix eye',
      'phoenix finger',
      'phoenix whisker',
      'pustules',
      'rainbow droppings',
      'shimmering halo',
      'small feathers',
      'small hand parasites',
      'tail feather',
      'whishbone',
    ],
    type: 'quarry',
    instinct: {
      name: 'Disdain',
      description:
        'Place the Phoenix at the center of the Nightmare Tree. It emits a hissing moan. All non-deaf survivors suffer brain damage equal to monster level. Perform Spiral Age.',
    },
    levels: {
      'phoenix-1': {
        id: 'phoenix-1',
        name: '1',
        huntboard: 'BMBMXOMBMBBS',
        movement: 8,
        toughness: 10,
        speed: 0,
        damage: 0,
        deck: {
          B: 8,
          A: 3,
          L: 1,
          S: ['Materialize', 'Spiral Age', 'Zeal', 'Dreaded Decade'],
        },
      },
      'phoenix-2': {
        id: 'phoenix-2',
        name: '2',
        huntboard: 'BMBMBOMXMBBS',
        movement: 8,
        toughness: 12,
        speed: 1,
        damage: 1,
        deck: {
          B: 10,
          A: 6,
          L: 1,
          S: [
            'Materialize',
            'Spiral Age',
            'Zeal',
            'Dreaded Decade',
            'Top of the Food Chain',
          ],
        },
      },
      'phoenix-3': {
        id: 'phoenix-3',
        name: '3',
        huntboard: 'BMBMBOMBMBXS',
        movement: 8,
        toughness: 16,
        speed: 2,
        damage: 3,
        evasion: 1,
        luck: 1,
        deck: {
          B: 13,
          A: 7,
          L: 2,
          S: [
            'Materialize',
            'Spiral Age',
            'Zeal',
            'Dreaded Decade',
            'Top of the Food Chain',
          ],
        },
      },
    },
  },
  gorm: {
    id: 'gorm',
    name: 'Gorm',
    expansion: 'gorm',
    resources: [
      'mammoth hand',
      'jiggling lard',
      'stout kidney',
      'stout heart',
      'milky eye',
      'acid gland',
      'gorm brain',
      'stout hide',
      'meaty rib',
      'stout vertebrae',
      'handed skull',
      'dense bone',
    ],
    type: 'quarry',
    instinct: {
      name: 'Illuminate',
      description:
        'Until the end of the next round all survivors are now threats, even if they are knocked down or used an effect that says otherwise. Insane survivors are knocked down.',
    },
    levels: {
      '1': {
        id: '1',
        name: '1',
        huntboard: 'MMBXMOBBMMBS',
        movement: 6,
        toughness: 8,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 8,
          A: 2,
          L: 0,
          S: [],
        },
      },
      '2': {
        id: '2',
        name: '2',
        huntboard: 'MMBBMOXBMMBS',
        huntExtra: 'If you depart to hunt the level 2 Gorm, "Fetid Grotto"',
        movement: 9,
        toughness: 11,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 9,
          A: 5,
          L: 0,
          S: ["Gorm's Den", 'Musth'],
        },
      },
      '3': {
        id: '3',
        name: '3',
        huntboard: 'MMBBMOBBMMXS',
        huntExtra: 'If you depart to hunt the level 3 Gorm, "Final March"',
        movement: 8,
        toughness: 15,
        speed: 2,
        damage: 2,
        evasion: 0,
        luck: 1,
        deck: {
          B: 10,
          A: 8,
          L: 2,
          S: ['Ancient Tusks', 'Gormyard'],
        },
      },
    },
  },
  butcher: {
    id: 'butcher',
    name: 'Butcher',
    expansion: 'core',
    instinct: {
      name: 'Menace',
      description:
        'Turn the Butcher to face the closes survivor. This survivor suffers 1 brain damage per monster level.',
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 5,
        toughness: 9,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 7,
          A: 5,
          L: 0,
          S: [
            'Berserker',
            'Fast Target',
            'Infectious Lunacy',
            'Dreaded Trophies',
          ],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 5,
        toughness: 12,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 10,
          A: 5,
          L: 0,
          S: [
            'Frenzied Berserker',
            'Fast Target',
            'Infectious Lunacy',
            'Dreaded Trophies',
          ],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 8,
        toughness: 15,
        speed: 2,
        damage: 2,
        evasion: 0,
        luck: 0,
        accuracy: 2,
        deck: {
          B: 11,
          A: 10,
          L: 0,
          S: [
            'Frenzied Berserker',
            'Fast Target',
            'Infectious Lunacy',
            'Invincible',
            'Dreaded Trophies',
          ],
        },
      },
    },
  },
  thehand: {
    id: 'thehand',
    name: 'The Hand',
    expansion: 'core',
    instinct: {
      name: 'The Penalty',
      description:
        'The Hand points at a random survivor. Roll d10: 1 You die; 2+ no survival: die, loose all survival + "Broken Rips"',
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 5,
        toughness: 14,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 10,
          A: 0,
          L: 0,
          S: [
            'Red Lens - Closed',
            'Blue Lens - Closed',
            'Green Lens - Closed',
            'Ghost Step',
            'Applause',
            'Impossible Eyes',
            'Polarized Aura',
          ],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 6,
        toughness: 15,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 10,
          A: 1,
          L: 0,
          S: [
            'Red Lens - Closed',
            'Blue Lens - Closed',
            'Green Lens - Closed',
            'Ghost Step',
            'Applause',
            'Impossible Eyes',
            'Polarized Aura',
          ],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 6,
        toughness: 30,
        speed: 3,
        damage: 6,
        evasion: 0,
        luck: 0,
        deck: {
          B: 10,
          A: 2,
          L: 0,
          S: [
            'Red Lens - Closed',
            'Blue Lens - Closed',
            'Green Lens - Closed',
            'Ghost Step',
            'Applause',
            'Impossible Eyes',
            'Polarized Aura',
          ],
        },
      },
    },
  },
  kingsman: {
    id: 'kingsman',
    name: "King's Man",
    expansion: 'core',
    instinct: {
      name: 'Guard',
      description:
        "The King's Man ends its turn and gains +5 toughness until the start of the next monster turn.",
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 5,
        toughness: 12,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 10,
          A: 2,
          L: 0,
          S: [
            'Weak Spot',
            "King's Aura",
            "King's Combat",
            'Out-Fighting',
            'Battle Tempo',
          ],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 6,
        toughness: 15,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 11,
          A: 4,
          L: 1,
          S: [
            'Weak Spot',
            "King's Aura",
            "King's Combat",
            'Out-Fighting',
            'Battle Tempo',
            'Silent Hymn',
          ],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 6,
        toughness: 18,
        speed: 2,
        damage: 2,
        evasion: 0,
        luck: 0,
        accuracy: 2,
        deck: {
          B: 12,
          A: 6,
          L: 1,
          S: [
            'Weak Spot',
            "King's Aura",
            "King's Combat",
            'Out-Fighting',
            'Battle Tempo',
            'Silent Hymn',
          ],
        },
      },
    },
  },
  dbk: {
    id: 'dbk',
    name: 'Dung Beetle Kinght',
    expansion: 'dbk',
    instinct: {
      name: 'Defensive Spit Salve',
      description:
        'If there are any, put an archived Century Carapace hit locatio card back on the top of the hit location deck. Put the monster next to the Resin Dung Ball, with the ball in its blind spot',
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 7,
        toughness: 12,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 7,
          A: 3,
          L: 0,
          S: [
            'Baller',
            'Power Forward',
            'Separation Anxiety',
            'Prepared Tunnels',
          ],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 7,
        toughness: 14,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 7,
          A: 6,
          L: 1,
          S: [
            'Baller',
            'Power Forward',
            'Separation Anxiety',
            'Prepared Tunnels',
            'Heavy Load',
          ],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 8,
        toughness: 18,
        speed: 2,
        damage: 2,
        evasion: 1,
        accuracy: 1,
        luck: 0,
        deck: {
          B: 8,
          A: 9,
          L: 2,
          S: [
            'Baller',
            'Power Forward',
            'Separation Anxiety',
            'Prepared Tunnels',
            'Heavy Load',
            'Burrow',
          ],
        },
      },
    },
  },
  fk: {
    id: 'fk',
    name: 'Flower Knight',
    expansion: 'fk',
    instinct: {
      name: 'Germinate',
      description:
        'Place the Flower Knight in the center of the Showdown board. Remove a +1 luck token from all survivors.',
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 7,
        toughness: 6,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 7,
          A: 4,
          L: 0,
          S: ['Bloom', 'Set Roots'],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 8,
        toughness: 8,
        speed: 0,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 8,
          A: 4,
          L: 1,
          S: ['Bloom', 'Set Roots', 'Razor Bulbs'],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 9,
        toughness: 11,
        speed: 1,
        damage: 2,
        evasion: 0,
        accuracy: 0,
        luck: 0,
        deck: {
          B: 9,
          A: 5,
          L: 2,
          S: [
            'Bloom',
            'Set Roots',
            'Razor Bulbs',
            'Perfect Aim',
            'Heart of the Woods',
          ],
        },
      },
    },
  },
  lk: {
    id: 'lk',
    name: 'Lion Knight',
    expansion: 'lk',
    instinct: {
      name: 'Catwalk',
      description:
        "The Lion Knight full moves towards the Villain. End the monster's turn",
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 7,
        toughness: 10,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 10,
          A: 2,
          L: 0,
          S: ['Zeal', 'Outburst', 'Roles: Ruler, Damsel, Villain, Fool'],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 8,
        toughness: 12,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 10,
          A: 5,
          L: 0,
          S: [
            'Zeal',
            'Outburst',
            'Drama Lessons',
            'Roles: Ruler, Damsel, Villain, Fool',
          ],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 9,
        toughness: 15,
        speed: 1,
        damage: 1,
        evasion: 0,
        accuracy: 0,
        luck: 0,
        deck: {
          B: 12,
          A: 9,
          L: 0,
          S: [
            'Zeal',
            'Outburst',
            'Drama Lessons',
            'Last Act',
            'Roles: Ruler, Damsel, Villain, Fool',
          ],
        },
      },
    },
  },
  spidicules: {
    id: 'spidicules',
    name: 'Spidicules',
    expansion: 'spidicules',
    instinct: {
      name: 'Spin',
      description:
        'Place the Spidicules in the center of the Showdown board. The monster gains +2 evasion until its next turn. All survivors suffer * brain damage.',
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 11,
        toughness: 8,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 5,
          A: 4,
          L: 0,
          S: [
            'Twitching Leg Pile',
            'Spawn',
            'Spiderling Action',
            'Frantic Spinning',
          ],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 14,
        toughness: 10,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 8,
          A: 5,
          L: 0,
          S: [
            'Twitching Leg Pile',
            'Spawn',
            'Spiderling Action',
            'Hivemind',
            'Feeding Time',
          ],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 16,
        toughness: 12,
        speed: 2,
        damage: 2,
        evasion: 0,
        accuracy: 0,
        luck: 0,
        deck: {
          B: 10,
          A: 7,
          L: 2,
          S: [
            'Twitching Leg Pile',
            'Spawn',
            'Spiderling Action',
            'Hivemind',
            'Necrotoxins',
            '10,000 Teeth',
          ],
        },
      },
    },
  },
  lg: {
    id: 'lg',
    name: 'Lion God',
    expansion: 'lg',
    instinct: {
      name: 'Mourn',
      description:
        'If there are no impassable terrain cards, monster gain +1 damage token. Otherwise move the Lion God to the closest impassable terrain tile. If it ends its movement adjacent to the tile, archive it and all non-deaf survivors suffer * + 1 brain damage.',
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 8,
        toughness: 14,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 7,
          A: 7,
          L: 1,
          S: ['Whiplash', 'Hollow Earth', 'Heft'],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 9,
        toughness: 16,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 1,
        deck: {
          B: 11,
          A: 8,
          L: 1,
          S: ['Whiplash', 'Hollow Earth', 'Heft', 'Divine Prowess'],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 10,
        toughness: 21,
        speed: 2,
        damage: 3,
        evasion: 1,
        luck: 2,
        deck: {
          B: 14,
          A: 9,
          L: 2,
          S: [
            'Whiplash',
            'Hollow Earth',
            'Heft',
            'Divine Prowess',
            'Immaculate Intuition',
          ],
        },
      },
    },
  },
  manhunter: {
    id: 'manhunter',
    name: 'Manhunter',
    expansion: 'manhunter',
    instinct: {
      name: 'Impatience',
      description:
        "All non-deaf survivors suffer * brain damage. End the monster's turn.",
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 6,
        toughness: 8,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 7,
          A: 3,
          L: 0,
          S: ['Gun Action', 'Tombstone', 'Gritty Armament', 'Short Stride'],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 7,
        toughness: 11,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 7,
          A: 6,
          L: 0,
          S: ['Gun Action', 'Tombstone', 'Gritty Armament', 'Full Stride'],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 8,
        toughness: 11,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 8,
          A: 7,
          L: 1,
          S: ['Gun Action', 'Tombstone', 'Gritty Armament', 'Full Stride'],
        },
      },
      4: {
        id: '4',
        name: '4',
        movement: 9,
        toughness: 13,
        speed: 2,
        damage: 2,
        accuracy: 2,
        deck: {
          B: 8,
          A: 8,
          L: 2,
          S: ['Gun Action', 'Tombstone', 'Gritty Armament', 'Full Stride'],
        },
      },
    },
  },
  lt: {
    id: 'lt',
    name: 'Lonely Tree',
    expansion: 'lt',
    instinct: {
      name: 'Growth',
      description:
        'All survivors not adjacent to another survivor gain 1 bleeding token and are knocked down. Shuffle hit location deck and put trap on top.',
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 0,
        toughness: 11,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 6,
          A: 3,
          L: 1,
          S: ['Bear Fruit', 'Impenetrable Trunk'],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 0,
        toughness: 13,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 8,
          A: 5,
          L: 1,
          S: ['Bear Fruit', 'Impenetrable Trunk', 'Moving Ground'],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 0,
        toughness: 17,
        speed: 1,
        damage: 1,
        evasion: 0,
        luck: 0,
        deck: {
          B: 8,
          A: 5,
          L: 2,
          S: ['Bear Fruit', 'Impenetrable Trunk', 'Moving Ground', 'Life: 20'],
        },
      },
    },
  },
  slenderman: {
    id: 'slenderman',
    name: 'Slenderman',
    expansion: 'slenderman',
    instinct: {
      name: 'Amnesia',
      description:
        'Remove the Slenderman from the showdown board. All survivors gain +1 insanity. The Slenderman will remain removed from the showdown board until a card or effect returns it.',
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 6,
        toughness: 11,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 8,
          A: 4,
          L: 9,
          S: ['Ensnare', 'Gloom', 'Madness Inversion'],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 6,
        toughness: 13,
        speed: 1,
        damage: 1,
        accuracy: 1,
        deck: {
          B: 8,
          A: 6,
          L: 1,
          S: ['Ensnare', 'Gloom', 'Madness Inversion'],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 6,
        toughness: 17,
        speed: 2,
        damage: 2,
        accuracy: 2,
        luck: 1,
        deck: {
          B: 10,
          A: 8,
          L: 2,
          S: ['Ensnare', 'Gloom', 'Madness Inversion', 'Hounds'],
        },
      },
    },
  },
  sunstalker: {
    id: 'sunstalker',
    name: 'Sunstalker',
    expansion: 'sunstalker',
    instinct: {
      name: 'Shadow Vibrations',
      description:
        "Place a Shade in the shadow(s) of each Survivor. If the survivor's shadow is occupied don't place a Shade.",
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 16,
        toughness: 10,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 7,
          A: 2,
          L: 1,
          S: [
            'Solar Energy',
            'Sun Dial',
            'Shadows of Darkness',
            'Light & Shadow',
            'Shade',
          ],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 16,
        toughness: 12,
        speed: 1,
        damage: 1,
        deck: {
          B: 9,
          A: 5,
          L: 1,
          S: [
            'Solar Energy',
            'Sun Dial',
            'Shadows of Darkness',
            'Light & Shadow',
            'Shade',
            'Living Shadows',
          ],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 16,
        toughness: 16,
        speed: 2,
        damage: 2,
        accuracy: 1,
        luck: 1,
        deck: {
          B: 10,
          A: 8,
          L: 2,
          S: [
            'Solar Energy',
            'Sun Dial',
            'Shadows of Darkness',
            'Light & Shadow',
            'Shade',
            'Living Shadows',
            'Monochrome',
          ],
        },
      },
    },
  },
  dk: {
    id: 'dk',
    name: 'Dragon King',
    expansion: 'dk',
    instinct: {
      name: 'Core Countdown',
      description:
        "Full move towards the closest threat. Perform Irradiate. End the Dragon's King turn.",
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 10,
        toughness: 13,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 8,
          A: 4,
          L: 0,
          S: ['Irradiate', 'Unseen Agony'],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 10,
        toughness: 15,
        speed: 1,
        damage: 1,
        deck: {
          B: 8,
          A: 7,
          L: 1,
          S: ['Irradiate', 'Unseen Agony'],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 10,
        toughness: 17,
        speed: 2,
        damage: 2,
        luck: 1,
        deck: {
          B: 9,
          A: 8,
          L: 2,
          S: ['Irradiate', 'Unseen Agony', 'Smolder'],
        },
      },
    },
  },
  tyrant: {
    id: 'tyrant',
    name: 'The Tyrant',
    expansion: 'dk', //TODO handle campaigns
    instinct: {
      name: 'Advance',
      description:
        "Perform Crooked Step. Full move the monster towards the closest survivor. End the monster's turn.",
    },
    levels: {
      1: {
        id: '1',
        name: '1',
        movement: 6,
        toughness: 8,
        speed: 0,
        damage: 0,
        evasion: 0,
        luck: 0,
        deck: {
          B: 6,
          A: 5,
          L: 0,
          S: ['Crooked Step', 'Spectral Blast'],
        },
      },
      2: {
        id: '2',
        name: '2',
        movement: 7,
        toughness: 10,
        speed: 1,
        damage: 1,
        deck: {
          B: 8,
          A: 6,
          L: 0,
          S: ['Crooked Step', 'Spectral Blast', 'Quickened'],
        },
      },
      3: {
        id: '3',
        name: '3',
        movement: 7,
        toughness: 14,
        speed: 2,
        damage: 2,
        deck: {
          B: 12,
          A: 8,
          L: 2,
          S: ['Crooked Step', 'Spectral Blast', 'Quickened'],
        },
      },
    },
  },
}
//TODO: check which monsters are querries, add huntboard.
