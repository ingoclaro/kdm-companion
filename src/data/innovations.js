export default {
  ammonia: {
    id: 'ammonia',
    name: 'Ammonia',
    expansion: 'core',
    keywords: ['science', 'language consequence'],
    providesSurvival: { departing: 1 },
  },
  bed: {
    id: 'bed',
    name: 'Bed',
    expansion: 'core',
    keywords: ['home', 'hovel consequence'],
    providesSurvival: {
      limit: 1,
    },
    endeavors: [
      {
        id: 'bed',
        name: 'Rest',
        expansion: 'core',
        recipe: {
          innovation: 'bed',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  bloodletting: {
    id: 'bloodletting',
    name: 'Blooletting',
    expansion: 'core',
    keywords: ['science', 'ammonia consequence'],
    endeavors: [
      {
        id: 'bloodletting',
        name: 'Braething a Vein',
        expansion: 'core',
        recipe: {
          innovation: 'bloodletting',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'resource', quantity: 1 },
          ],
        },
      },
    ],
  },
  clan_of_death: {
    id: 'clan_of_death',
    name: 'Clan of Death',
    expansion: 'core',
    keywords: ['home', 'family consequence'],
    providesBonuses: [
      {
        id: 'clan_of_death',
        name: 'Clan of Death',
        description: [
          'All newborn survivors gain +1 accuracy, strength and evasion',
        ],
      },
    ],
  },
  cooking: {
    id: 'cooking',
    name: 'Cooking',
    expansion: 'core',
    keywords: ['science', 'lantern oven consequence'],
    providesBonuses: [
      {
        id: 'cooking',
        name: 'Cooking',
        description: ['At the start of the Settlement phase gain +1 endeavor'],
      },
    ],
    providesSurvival: {
      limit: 1,
    },
    endeavors: [
      {
        id: 'cooking',
        name: 'Cooking',
        expansion: 'core',
        recipe: {
          innovation: 'cooking',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'cooking_meal',
        name: 'Cook stone nose gruel',
        expansion: 'core',
        recipe: {
          innovation: 'cooking',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'organ', quantity: 1 },
            { keyword: 'bone', quantity: 1 },
          ],
        },
      },
    ],
  },
  drums: {
    id: 'drums',
    name: 'Drums',
    expansion: 'core',
    keywords: ['music', 'language consequence'],
    endeavors: [
      {
        id: 'bone_beats',
        name: 'Bone Beats',
        expansion: 'core',
        recipe: {
          innovation: 'drums',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  destiny: {
    id: 'destiny',
    name: 'Destiny',
    expansion: 'core',
    keywords: ['faith'],
    providesSurvival: { limit: 1 },
  },
  face_painting: {
    id: 'face_painting',
    name: 'Face Painting',
    expansion: 'core',
    keywords: ['art', 'paint consequence'],
    endeavors: [
      {
        id: 'battle_paint',
        name: 'Battle Paint',
        expansion: 'core',
        recipe: {
          innovation: 'face_painting',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'founders_eye',
        name: "Founder's Eye",
        expansion: 'core',
        recipe: {
          innovation: 'face_painting',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  family: {
    id: 'family',
    name: 'Family',
    expansion: 'core',
    keywords: ['home', 'hovel consequence'],
    providesBonuses: [
      {
        id: 'family',
        name: 'Family',
        description: [
          'A newborn survivor inherits the surname of one of the parents, their weapon type and 1/2 their weapon proficiency',
        ],
      },
    ],
    providesSurvival: { departing: 1 },
  },
  final_fighting_art: {
    id: 'final_fighting_art',
    name: 'Final Fighting Art',
    expansion: 'core',
    keywords: ['education'],
    providesBonuses: [
      {
        id: 'final_fighting_art',
        name: 'Final Fighting Art',
        description: [
          'Once per showdown you may select an AI card from the discard or wound pile and put it on top of AI deck',
        ],
      },
    ],
    providesSurvival: { limit: 1 },
  },
  'forbidden dance': {
    id: 'forbidden dance',
    name: 'Forbidden Dance',
    expansion: 'core',
    keywords: ['music', 'drums consequence'],
    providesBonuses: [
      {
        id: 'forbidden dance',
        name: 'Forbidden Dance',
        description: [
          'When a survivor uses the Synchronized Strike SFA, reroll missed attack rolls once',
        ],
      },
    ],
    endeavors: [
      {
        id: 'forbidden dance',
        name: 'Forbidden Dance',
        expansion: 'core',
        recipe: {
          innovation: 'forbidden dance',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  guidepost: {
    id: 'guidepost',
    name: 'Guidepost',
    expansion: 'core',
    keywords: ['other'],
    providesSurvival: { departing: 1 },
    endeavors: [
      {
        id: 'guidepost',
        name: 'Guidepost',
        expansion: 'core',
        recipe: {
          innovation: 'guidepost',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  heart_flute: {
    id: 'heart_flute',
    name: 'Heart Flute',
    expansion: 'core',
    keywords: ['music', 'forbidden dance consequence'],
    providesBonuses: [
      {
        id: 'heart_flute',
        name: 'Heart Flute',
        description: [
          "When using Synchronized Strike FA, the attack assist may spend 1 survival to change a monster's R to R Failure before any wound attempts",
        ],
      },
    ],
    endeavors: [
      {
        id: 'heart_flute',
        name: "Devil's Melody",
        expansion: 'core',
        recipe: {
          innovation: 'heart_flute',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  hovel: {
    id: 'hovel',
    name: 'Hovel',
    expansion: 'core',
    keywords: ['home', 'language consequence'],
    providesSurvival: { limit: 1, departing: 1 },
  },
  inner_lantern: {
    id: 'inner_lantern',
    name: 'Inner Lantern',
    expansion: 'core',
    keywords: ['faith', 'language consequence'],
  },
  language: {
    id: 'language',
    name: 'Language',
    expansion: 'core',
    keywords: ['starting innovation'],
    providesSurvival: { limit: 1 },
    providesBonuses: [
      {
        id: 'encourage',
        name: 'Encourage',
        description: [
          'All  survivors gain encourage survival action.',
          'Encourage: Once per round, if standing spend 1 survival to call out a non-deaf survivor. They stand if knocked down.',
        ],
      },
    ],
  },
  lantern_oven: {
    id: 'lantern_oven',
    name: 'Lantern Oven',
    expansion: 'core',
    keywords: ['science', 'heat', 'ammonia consequence'],
    providesSurvival: { departing: 1 },
  },
  mastery_axe: {
    id: 'mastery_axe',
    name: 'Mastery - Axe',
    expansion: 'core',
  },
  mastery_bow: {
    id: 'mastery_bow',
    name: 'Mastery - Bow',
    expansion: 'core',
  },
  mastery_club: {
    id: 'mastery_club',
    name: 'Mastery - Club',
    expansion: 'core',
  },
  mastery_dagger: {
    id: 'mastery_dagger',
    name: 'Mastery - Dagger',
    expansion: 'core',
  },
  mastery_fist_and_tooth: {
    id: 'mastery_fist_and_tooth',
    name: 'Mastery - Fist & Tooth',
    expansion: 'core',
  },
  mastery_grand_weapon: {
    id: 'mastery_grand_weapon',
    name: 'Mastery - Grand Weapon',
    expansion: 'core',
  },
  mastery_katar: {
    id: 'mastery_katar',
    name: 'Mastery - Katar',
    expansion: 'core',
  },
  mastery_shield: {
    id: 'mastery_shield',
    name: 'Mastery - Shield',
    expansion: 'core',
  },
  mastery_spear: {
    id: 'mastery_spear',
    name: 'Mastery - Spear',
    expansion: 'core',
  },
  mastery_sword: {
    id: 'mastery_sword',
    name: 'Mastery - Sword',
    expansion: 'core',
  },
  mastery_twilight_sword: {
    id: 'mastery_twilight_sword',
    name: 'Mastery - Twilight Sword',
    expansion: 'core',
  },
  mastery_whip: {
    id: 'mastery_whip',
    name: 'Mastery - Whip',
    expansion: 'core',
  },
  momento_mori: {
    id: 'momento_mori',
    name: 'Momento Mori',
    expansion: 'core',
    keywords: ['art', 'pictograph consequence'],
    endeavors: [
      {
        id: 'momento_mori',
        name: 'Momento Mori',
        expansion: 'core',
        recipe: {
          innovation: 'momento_mori',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'nightmare training': {
    id: 'nightmare training',
    name: 'Nightmare Training',
    expansion: 'core',
    keywords: ['education', 'symposium consequence'],
    endeavors: [
      {
        id: 'nightmare training',
        name: 'Train',
        expansion: 'core',
        recipe: {
          innovation: 'nightmare training',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  paint: {
    id: 'paint',
    name: 'Paint',
    expansion: 'core',
    keywords: ['art', 'language consequence'],
  },
  partnership: {
    id: 'partnership',
    name: 'Partnership',
    expansion: 'core',
    keywords: ['home', 'hovel consequence'],
    endeavors: [
      {
        id: 'partnership',
        name: 'Partnership',
        expansion: 'core',
        recipe: {
          innovation: 'partnership',
          items: [{ resource: 'endeavor', quantity: 2 }],
        },
      },
    ],
  },
  pictograph: {
    id: 'pictograph',
    name: 'Pictograph',
    expansion: 'core',
    keywords: ['art', 'paint consequence'],
    providesBonuses: [
      {
        id: 'pictograph',
        name: 'Pictograph',
        description: [
          "At the start of a survivor's act, they may decide to skip their act and Run Away",
          'After a hunt event is resolved, a survivor may Run Away',
        ],
      },
    ],
  },
  pottery: {
    id: 'pottery',
    name: 'Pottery',
    expansion: 'core',
    keywords: ['art', 'sculpture consequence'],
    providesSurvival: {
      limit: 1,
    },
    endeavors: [
      {
        id: 'fermentation',
        name: 'Fermentation',
        expansion: 'core',
        recipe: {
          innovation: 'pottery',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'organ', quantity: 1 },
          ],
        },
      },
      {
        id: 'ret',
        name: 'Ret',
        expansion: 'core',
        recipe: {
          innovation: 'pottery',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'herb', quantity: 1 },
          ],
        },
      },
    ],
  },
  records: {
    id: 'records',
    name: 'Records',
    expansion: 'core',
    keywords: ['education', 'storytelling consequence'],
    endeavors: [
      {
        id: 'records_fa',
        name: 'Gain Scholar of Death SFA',
        expansion: 'core',
        recipe: {
          innovation: 'records',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'records',
        name: 'Create monster Volume',
        expansion: 'core',
        recipe: {
          innovation: 'records',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  sacrifice: {
    id: 'sacrifice',
    name: 'Sacrifice',
    expansion: 'core',
    keywords: ['faith', 'shrine consequence'],
    endeavors: [
      {
        id: 'sacrifice',
        name: 'Death Ritual',
        expansion: 'core',
        recipe: {
          innovation: 'sacrifice',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  sacrification: {
    id: 'sacrification',
    name: 'Sacrification',
    expansion: 'core',
    keywords: ['faith', 'inner lantern consequence'],
    endeavors: [
      {
        id: 'sacrification',
        name: 'Initiation',
        expansion: 'core',
        recipe: {
          innovation: 'sacrification',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  saga: {
    id: 'saga',
    name: 'Saga',
    expansion: 'core',
    keywords: ['music', 'song of the brave consequence'],
    providesBonuses: [
      {
        id: 'saga',
        name: 'Saga',
        description: [
          'All newborn survivors gain +2 Courage, Understanding and Hunt XP',
        ],
      },
    ],
  },
  scrap_smelting: {
    id: 'scrap_smelting',
    name: 'Scrap Smelting',
    expansion: 'core',
    keywords: ['science', 'lantern oven consequence'],
    endeavors: [
      {
        id: 'purification',
        name: 'Purification',
        expansion: 'core',
        recipe: {
          innovation: 'scrap_smelting',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_blacksmith',
        name: 'Build - Blacksmith',
        expansion: 'core',
        recipe: {
          innovation: 'scrap_smelting',
          not_location: 'blacksmith',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'bone', quantity: 6 },
            { keyword: 'scrap', quantity: 3 },
          ],
        },
      },
    ],
  },
  sculpture: {
    id: 'sculpture',
    name: 'Sculpture',
    expansion: 'core',
    keywords: ['art', 'paint consequence'],
    endeavors: [
      {
        id: 'sculpture_statue',
        name: 'Sculpt Statue',
        expansion: 'core',
        recipe: {
          innovation: 'sculpture',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'sculpture_study_statue',
        name: 'Study Statue',
        expansion: 'core',
        recipe: {
          innovation: 'sculpture',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  shrine: {
    id: 'shrine',
    name: 'Shrine',
    expansion: 'core',
    keywords: ['faith', 'inner lantern consequence'],
    endeavors: [
      {
        id: 'shrine',
        name: 'Armor Ritual',
        expansion: 'core',
        recipe: {
          innovation: 'shrine',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  song_of_the_brave: {
    id: 'song_of_the_brave',
    name: 'Song of the Brave',
    expansion: 'core',
    keywords: ['music', 'drums consequence'],
    providesBonuses: [
      {
        id: 'song_of_the_brave',
        name: 'Song of the Brave',
        description: [
          'On arrival each non-deaf survivor may remove 1 negative attribute token',
          'During Overwhelming Darkness story event each non-deaf survivor may select the Path of the Brave',
        ],
      },
    ],
  },
  storytelling: {
    id: 'storytelling',
    name: 'Storytelling',
    expansion: 'core',
    keywords: ['education', 'symposium consequence'],
    providesSurvival: { limit: 1 },
    endeavors: [
      {
        id: 'storytelling',
        name: 'Story Time',
        expansion: 'core',
        recipe: {
          innovation: 'storytelling',
          items: [{ resource: 'endeavor', quantity: 2 }],
        },
      },
    ],
  },
  symposium: {
    id: 'symposium',
    name: 'Symposium',
    expansion: 'core',
    keywords: ['education', 'language consequence'],
    providesBonuses: [
      {
        id: 'symposium',
        name: 'Symposium',
        description: [
          'When a survivor innovates, draw an additional 2 innovation cards to choose from',
        ],
      },
    ],
    providesSurvival: { limit: 1 },
  },
  ultimate_weapon: {
    id: 'ultimate_weapon',
    name: 'Ultimate Weapon',
    expansion: 'core',
    keywords: ['science'],
    providesBonuses: [
      {
        id: 'ultimate_weapon',
        name: 'Ultimate Weapon',
        description: [
          'When you defeat a monster, gain 1 monster resource of your choice',
        ],
      },
    ],
    providesSurvival: { limit: 1 },
  },
  rubedo: {
    id: 'rubedo',
    name: 'Rubedo',
    expansion: 'gorm',
    keywords: ['science', 'gormchymy', 'citrinitas consequence'],
    endeavors: [
      {
        id: 'rubedo',
        name: 'Rubedo',
        expansion: 'gorm',
        recipe: {
          innovation: 'rubedo',
          items: [{ resource: 'endeavor', quantity: 4 }],
        },
      },
    ],
  },
  nigredo: {
    id: 'nigredo',
    name: 'Nigredo',
    expansion: 'gorm',
    keywords: ['science', 'gormchymy'],
    endeavors: [
      {
        id: 'nigredo',
        name: 'Nigredo',
        expansion: 'gorm',
        recipe: {
          innovation: 'nigredo',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
    providesSurvival: {
      limit: 1,
    },
  },
  citrinitas: {
    id: 'citrinitas',
    name: 'Citrinitas',
    expansion: 'gorm',
    keywords: ['science', 'gormchymy', 'albedo consequence'],
    endeavors: [
      {
        id: 'citrinitas',
        name: 'Citrinitas',
        expansion: 'gorm',
        recipe: {
          innovation: 'citrinitas',
          items: [{ resource: 'endeavor', quantity: 3 }],
        },
      },
    ],
    providesSurvival: {
      limit: 1,
    },
  },
  albedo: {
    id: 'albedo',
    name: 'Albedo',
    expansion: 'gorm',
    keywords: ['science', 'gormchymy', 'nigredo consequence'],
    endeavors: [
      {
        id: 'albedo',
        name: 'Albedo',
        expansion: 'gorm',
        recipe: {
          innovation: 'albedo',
          items: [{ resource: 'endeavor', quantity: 2 }],
        },
      },
    ],
  },
  'subterranean agriculture': {
    id: 'subterranean agriculture',
    name: 'Subterranean Agriculture',
    expansion: 'dbk',
    keywords: ['science'],
    endeavors: [
      {
        id: 'underground_sow',
        name: 'Underground Sow',
        expansion: 'dbk',
        recipe: {
          innovation: 'subterranean agriculture',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'black_harvest',
        name: 'Black Harvest',
        expansion: 'dbk',
        recipe: {
          innovation: 'subterranean agriculture',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { resource: 'preserved caustic dung', quantity: 1 },
          ],
        },
      },
      {
        id: 'build_wet_resin_crafter',
        name: 'Build - Wet Resin Crafter',
        expansion: 'dbk',
        recipe: {
          innovation: 'subterranean agriculture',
          not_location: 'wet_resin_crafter',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'organ', quantity: 2 },
            { keyword: 'bone', quantity: 2 },
          ],
        },
      },
    ],
  },
  'round stone training': {
    id: 'round stone training',
    name: 'Round Stone Training',
    expansion: 'dbk',
    keywords: ['education', 'nightmare training consequence'],
    endeavors: [
      {
        id: 'round stone training',
        name: 'Train',
        expansion: 'dbk',
        recipe: {
          innovation: 'round stone training',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'resource', quantity: 1 },
          ],
        },
      },
    ],
  },
  'petal spiral': {
    id: 'petal spiral',
    name: 'Petal Spiral',
    expansion: 'fk',
    keywords: ['music', 'forbidden dance consequence'],
    endeavors: [
      {
        id: 'trace petals',
        name: 'Trace Petals',
        expansion: 'fk',
        recipe: {
          innovation: 'petal spiral',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'black mask': {
    id: 'black mask',
    name: 'Black Mask',
    expansion: 'lk',
    keywords: ['other'],
    endeavors: [
      {
        id: 'visit retinue',
        name: 'Visit the retinue',
        expansion: 'lk',
        recipe: {
          innovation: 'black mask',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'face the monster',
        name: 'Face the monster',
        expansion: 'lk',
        recipe: {
          innovation: 'black mask',
          items: [{ resource: 'endeavor', quantity: 2 }],
        },
      },
    ],
  },
  'white mask': {
    id: 'white mask',
    name: 'White Mask',
    expansion: 'lk',
    keywords: ['other'],
    endeavors: [
      {
        id: 'visit retinue',
        name: 'Visit the retinue',
        expansion: 'lk',
        recipe: {
          innovation: 'white mask',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'leave offering',
        name: 'Leave the monster an offering',
        expansion: 'lk',
        recipe: {
          innovation: 'white mask',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'stoic statue': {
    id: 'stoic statue',
    name: 'Stoic Statue',
    expansion: 'lk',
    keywords: ['other'],
    endeavors: [
      {
        id: 'worship monster',
        name: 'Worship the monster',
        expansion: 'lk',
        recipe: {
          innovation: 'stoic statue',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'legless ball': {
    id: 'legless ball',
    name: 'Legless Ball',
    expansion: 'spidicules',
    keywords: ['other'],
    endeavors: [
      {
        id: 'get web silk',
        name: 'Get Web Silk',
        expansion: 'spidicules',
        recipe: {
          innovation: 'legless ball',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'kill spidicules',
        name: 'Kill Spidicules',
        expansion: 'spidicules',
        recipe: {
          innovation: 'legless ball',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'silk refining': {
    id: 'silk refining',
    name: 'Silk Refining',
    expansion: 'spidicules',
    keywords: ['other'],
    endeavors: [
      {
        id: 'silk surgery',
        name: 'Silk Surgery',
        expansion: 'spidicules',
        recipe: {
          innovation: 'silk refining',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'create hide',
        name: 'Create Hide',
        expansion: 'spidicules',
        recipe: {
          innovation: 'silk refining',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build silk mill',
        name: 'Build - Silk Mill',
        expansion: 'spidicules',
        recipe: {
          innovation: 'silk refining',
          not_location: 'silk mill',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'silk', quantity: 2 },
            { keyword: 'bone', quantity: 1 },
            { keyword: 'organ', quantity: 1 },
          ],
        },
      },
    ],
  },
  choreia: {
    id: 'choreia',
    name: 'Choreia',
    expansion: 'spidicules',
    keywords: ['music', 'forbidden dance consequence'],
    endeavors: [
      {
        id: 'spider dance',
        name: 'Spider Dance',
        expansion: 'spidicules',
        recipe: {
          innovation: 'choreia',
          items: [{ resource: 'endeavor', quantity: 2 }],
        },
      },
    ],
  },
  'the knowledge worm': {
    id: 'the knowledge worm',
    name: 'The Knowledge Worm',
    expansion: 'lg',
    keywords: ['other'],
    providesBonuses: [
      {
        id: 'the knowledge worm',
        name: 'The Knowledge Worm',
        description: [
          'At the start of each settlement phase add 1 scrap resource to storage',
        ],
      },
    ],
    providesSurvival: { departing: 3 },
    //TODO: departing survivors gain 3 insanity. If any has 10+, "A Gracious Host"
  },
  'crimson candy': {
    id: 'crimson candy',
    name: 'Crimson Candy',
    expansion: 'manhunter',
    keywords: ['science'],
    //TODO: at the start of the showdown each survivor gains * survival
    endeavors: [
      {
        id: 'crimson cannibalism',
        name: 'Crimson Cannibalism',
        expansion: 'manhunter',
        recipe: {
          innovation: 'crimson candy',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'war room': {
    id: 'war room',
    name: 'War room',
    expansion: 'manhunter',
    keywords: ['education', 'storytelling consequence'],
    providesSurvival: {
      limit: 1,
    },
    providesBonuses: [
      {
        id: 'war room',
        name: 'War Room',
        description: [
          "Quarries can't move off the hunt board. If survivors would need to move backwards roll 1d10, on 4+ they don't.",
        ],
      },
    ],
    endeavors: [
      {
        id: 'war room',
        name: 'Reroll 1 Hunt Event',
        expansion: 'manhunter',
        recipe: {
          innovation: 'war room',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'settlement watch': {
    id: 'settlement watch',
    name: 'Settlement Watch',
    expansion: 'manhunter',
    keywords: ['home', 'hovel consequence'],
    providesSurvival: {
      limit: 1,
    },
    providesBonuses: [
      {
        id: 'settlement watch',
        name: 'Settlement Watch',
        description: [
          'Departing survivors gain +2 survival when they depart for a Nemesis encounter or Special Showdown',
        ], //TODO could this modeled into the provides survival somehow? maybe just have a list of text so is more freeform?
      },
    ],
    endeavors: [
      {
        id: 'new recruits',
        name: 'New Recruits',
        expansion: 'manhunter',
        recipe: {
          innovation: 'settlement watch',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'darkwater research': {
    id: 'darkwater research',
    name: 'Darkwater Research',
    expansion: 'slenderman',
    keywords: ['science'],
    providesBonuses: [
      {
        id: 'darkwater research',
        name: 'Darkwater Research',
        description: ['Departing survivors gain +2 insanity.'], //TODO could this modeled into the provides survival somehow? maybe just have a list of text so is more freeform?
      },
    ],
    endeavors: [
      {
        id: 'light-forging',
        name: 'Light-Forging',
        expansion: 'slenderman',
        recipe: {
          innovation: 'darkwater research',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'dark water research',
        name: 'Dark Water Research',
        expansion: 'slenderman',
        recipe: {
          innovation: 'darkwater research',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'resource', quantity: 2 },
            { resource: 'dark water', quantity: 2 },
          ],
        },
      },
    ],
  },
  'sun language': {
    id: 'sun language',
    name: 'Sun Language',
    expansion: 'sunstalker',
    keywords: ['starting innovation'],
    providesSurvival: {
      limit: 1,
    },
    providesBonuses: [
      {
        id: 'embolden',
        name: 'Embolden',
        description: [
          'All Surivors gain the Embolden survival action.',
          "Embolden: Once per round, if you haven't any +1 Str tokens, spend 1 survival to gain +1 Str token. When you are knocked down loose all Str tokens.",
        ],
      },
    ],
  },
  'umbilical bank': {
    id: 'umbilical bank',
    name: 'Umbilical Bank',
    expansion: 'sunstalker',
    keywords: ['science'],
    providesBonuses: [
      {
        id: 'umbilical bank',
        name: 'Umbilical Bank',
        description: [
          'When a new survivor is born you may add 1 Life String strange resource to the storage.',
        ],
      },
    ],
    endeavors: [
      {
        id: 'umbilical symbiosis',
        name: 'Umbilical Symbiosis',
        expansion: 'sunstalker',
        recipe: {
          innovation: 'umbilical bank',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'innovate pottery',
        name: 'Innovate Pottery',
        expansion: 'sunstalker',
        recipe: {
          innovation: 'umbilical bank',
          not_innovation: 'pottery',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'organ', quantity: 3 },
          ],
        },
      },
    ],
  },
  'sauna shrine': {
    id: 'sauna shrine',
    name: 'Sauna Shrine',
    expansion: 'sunstalker',
    keywords: ['faith', 'hands of the sun consequence'],
    providesBonuses: [
      {
        id: 'sauna shrine',
        name: 'Sauna Shrine',
        description: [
          'When survivors depart for a nemesis encounter or special showdown, they gain +10 survival.',
        ],
      },
    ],
    endeavors: [
      {
        id: 'tribute',
        name: 'Tribute',
        expansion: 'sunstalker',
        recipe: {
          innovation: 'sauna shrine',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'organ', quantity: 1 },
          ],
        },
      },
    ],
  },
  'shadow dancing': {
    id: 'shadow dancing',
    name: 'Shadow Dancing',
    expansion: 'sunstalker',
    keywords: ['home', 'hovel consequence'],
    endeavors: [
      {
        id: 'final dance',
        name: 'Final Dance',
        expansion: 'sunstalker',
        recipe: {
          innovation: 'shadow dancing',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'filleting table': {
    id: 'filleting table',
    name: 'Filleting Table',
    expansion: 'sunstalker',
    keywords: ['science'],
    providesBonuses: [
      {
        id: 'filleting table',
        name: 'Filleting Table',
        description: [
          'Once per settlement phase, if the survivors return victorious, gain 1 random basic resource.',
        ],
      },
    ],
    endeavors: [
      {
        id: 'advance cutting',
        name: 'Advance Cutting',
        expansion: 'sunstalker',
        recipe: {
          innovation: 'filleting table',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'hands of the sun': {
    id: 'hands of the sun',
    name: 'Hands of the Sun',
    expansion: 'sunstalker',
    keywords: ['faith'],
    providesBonuses: [
      {
        id: 'overcharge',
        name: 'Overcharge',
        description: [
          'All Surivors gain the Overcharge survival action.',
          'Overcharge: If you have any +1 Str token, you may spend 1 survival to remove of them and gain devastating 1 to your next attack this round.',
        ],
      },
    ],
  },
  aquarobics: {
    id: 'aquarobics',
    name: 'Aquarobics',
    expansion: 'sunstalker',
    keywords: ['faith', 'hands of the sun consequence'],
    providesSurvival: {
      limit: 1,
    },
    endeavors: [
      {
        id: 'underwater train',
        name: 'Underwater Train',
        expansion: 'sunstalker',
        recipe: {
          innovation: 'filleting table',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'dragon speech': {
    id: 'dragon speech',
    name: 'Dragon Speech',
    expansion: 'dk', // TODO: this should be people of the stars, do the same for expansions that provide campaigns so that their cards don't get mixed into the core campaign.
    keywords: ['starting innovation', 'language'], // TODO: should we do this, or add dragon speech consecuence to all language innovations? Or have a new field with 'add xxx consecuense (like the text at the bottom of the card)'
    providesSurvival: {
      limit: 1,
    },
    providesBonuses: [
      {
        id: 'encourage',
        name: 'Encourage',
        description: [
          'All  survivors gain encourage survival action.',
          'Encourage: Once per round, if standing spend 1 survival to call out a non-deaf survivor. They stand if knocked down.',
        ],
      },
    ],
  },
  'radiating orb': {
    id: 'radiating orb', // TODO: handle consecuence (this card has add lantern oven consecuence :S)
    name: 'Radiating Orb',
    expansion: 'dk', // TODO: handle campaigns
    keywords: ['science'],
    providesSurvival: {
      departing: 1,
      newborn: 1,
    },
    providesBonuses: [
      {
        id: 'radiating orb',
        name: 'Radiating Orb',
        description: [
          'Departing survivors with a constellation gain +1 survival.',
        ],
      },
    ],
  },
  arena: {
    id: 'arena',
    name: 'Arena',
    expansion: 'dk', // TODO: handle campaigns
    keywords: ['education', 'nightmare training consequence'],
    endeavors: [
      {
        id: 'spar',
        name: 'Spar',
        expansion: 'dk',
        recipe: {
          innovation: 'arena',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'iron', quantity: 1 },
          ],
        },
      },
    ],
  },
  bloodline: {
    id: 'bloodline',
    name: 'Bloodline',
    expansion: 'dk', // TODO: handle campaigns
    keywords: ['home', 'hovel consecuence'],
    providesBonuses: [
      {
        id: 'bloodline',
        name: 'Bloodline',
        description: [
          'Newborn survivors inherit the following from their parents:',
          "The Oracle's Eye, Iridescent Hide or Pristine ability.",
          '1 Surname.',
          "Half of the parent's weapon proficiency levels, rounded up.",
        ],
      },
    ],
  },
  empire: {
    id: 'empire',
    name: 'Empire',
    expansion: 'dk', // TODO: handle campaigns
    keywords: ['home', 'bloodline consecuence'],
    providesBonuses: [
      {
        id: 'empire',
        name: 'Empire',
        description: [
          'Newborn survivors have +1 permanent Str and Pristine ability',
          'Pristine: when you suffer a dismembered severe injury, ignore it and gain 1 bleeding token instead.',
        ],
      },
    ],
  },
}
