export default {
  ammonia: {
    id: 'ammonia',
    name: 'Ammonia',
    expansion: 'core',
    keywords: ['science', 'language consequence'],
    settlement: {
      departing: {
        survival: 1,
      },
    },
  },
  bed: {
    id: 'bed',
    name: 'Bed',
    expansion: 'core',
    keywords: ['home', 'hovel consequence'],
    settlement: {
      survival: 1,
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
        description:
          'Roll 1d10: 1-3: Gain +3 Ins; 4+: You cannot endeavor again this phase, skip next hunt, may remove one of: all **Broken Arm**, all **Broken Hip**, all **Broken Rib** or **Ruptured Muscle**.',
      },
    ],
  },
  bloodletting: {
    id: 'bloodletting',
    name: 'Bloodletting',
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
        description:
          'Roll 1d10: 1-3: Gain +1 Und, loose all survival and cannot gain survival this settlement phase; 4-7: Gain +3 Ins; 8+: Gain +6 Ins, you may remove one of: Disorder, **Warped Pelvis** or **Intestinal Prolapse**.',
      },
    ],
  },
  clan_of_death: {
    id: 'clan_of_death',
    name: 'Clan of Death',
    expansion: 'core',
    campaigns: { potl: 'potl', potsun: 'potsun' },
    keywords: ['home', 'family consequence'],
    settlement: {
      newborn: {
        accuracy: 1,
        strength: 1,
        evasion: 1,
      },
    },
  },
  cooking: {
    id: 'cooking',
    name: 'Cooking',
    expansion: 'core',
    keywords: ['science', 'lantern oven consequence'],
    bonus: 'At the start of the Settlement phase gain +1 endeavor',
    settlement: {
      survival: 1,
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
        description: 'During next hunt, ignore **Starvation**.',
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
        description:
          'Select one: Gain +2 Ins, gain +2 survival, gain **Rythm Chaser** FA or gain **Synchronized Strike** SFA.',
      },
    ],
  },
  destiny: {
    id: 'destiny',
    name: 'Destiny',
    expansion: 'core',
    keywords: ['faith'],
    settlement: {
      survival: 1,
      showdown: {
        description:
          '**Destiny**: Gain **Endure** survival action.\n  **Endure**: You may spend 7 survival - Luck to ignore a severe injury (before rolling result).',
      },
    },
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
        description:
          'Roll 1d10: 4+: Departing survivors gain +2 survival and +1 Ins.',
      },
      {
        id: 'founders_eye',
        name: "Founder's Eye",
        expansion: 'core',
        recipe: {
          innovation: 'face_painting',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description: 'Roll 1d10: 4+: Gain +1 to all rolls on **Intimacy**.',
      },
    ],
  },
  family: {
    id: 'family',
    name: 'Family',
    expansion: 'core',
    campaigns: { potl: 'potl', potsun: 'potsun' },
    keywords: ['home', 'hovel consequence'],
    settlement: {
      departing: {
        survival: 1,
      },
      newborn: {
        description:
          '**Family**: a newborn survivor inherits the surname of one of the parents, their weapon type and 1/2 their weapon proficiency.',
      },
    },
  },
  final_fighting_art: {
    id: 'final_fighting_art',
    name: 'Final Fighting Art',
    expansion: 'core',
    keywords: ['education'],
    settlement: {
      survival: 1,
      showdown: {
        description:
          '**Final Fighting Art**: Once per showdown you may select an AI card from the discard or wound pile and put it on top of AI deck',
      },
    },
  },
  'forbidden dance': {
    id: 'forbidden dance',
    name: 'Forbidden Dance',
    expansion: 'core',
    keywords: ['music', 'drums consequence'],
    settlement: {
      showdown: {
        description:
          '**Forbidden Dance**: When a survivor uses the Synchronized Strike SFA, reroll missed attack rolls once',
      },
    },
    endeavors: [
      {
        id: 'forbidden dance',
        name: 'Forbidden Dance',
        expansion: 'core',
        recipe: {
          innovation: 'forbidden dance',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          "Once per lifetime. Roll 1d10: 1-5: -1 Mov; 6-9: +1 Eva; 10+: Gain **King's Step** SFA.",
      },
    ],
  },
  guidepost: {
    id: 'guidepost',
    name: 'Guidepost',
    expansion: 'core',
    keywords: ['other'],
    settlement: {
      departing: {
        survival: 1,
      },
    },
    endeavors: [
      {
        id: 'guidepost',
        name: 'Guidepost',
        expansion: 'core',
        recipe: {
          innovation: 'guidepost',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Roll 1d10 +Str: 12+: Gain **Lantern Halberd** rare gear, loose this innovation.',
      },
    ],
  },
  heart_flute: {
    id: 'heart_flute',
    name: 'Heart Flute',
    expansion: 'core',
    keywords: ['music', 'forbidden dance consequence'],
    settlement: {
      showdown: {
        description:
          "**Heart Flute**: When using Synchronized Strike FA, the attack assist may spend 1 survival to change a monster's R to R Failure before any wound attempts",
      },
    },
    endeavors: [
      {
        id: 'heart_flute',
        name: "Devil's Melody",
        expansion: 'core',
        recipe: {
          innovation: 'heart_flute',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Roll 1d10: 1-5: Die; 6+: Select any Nemesis monster, add a Special Showdown with them at the highest level you have not yet faced.',
      },
    ],
  },
  hovel: {
    id: 'hovel',
    name: 'Hovel',
    expansion: 'core',
    keywords: ['home', 'language consequence'],
    settlement: {
      survival: 1,
      departing: {
        survival: 1,
      },
    },
  },
  inner_lantern: {
    id: 'inner_lantern',
    name: 'Inner Lantern',
    expansion: 'core',
    keywords: ['faith', 'language consequence'],
    settlement: {
      showdown: {
        description:
          '**Inner Lantern**: Gain **Surge** survival action.\n  **Surge**: Spend 1 survival to gain +1![action](action) and use it immediatly.',
      },
    },
  },
  language: {
    id: 'language',
    name: 'Language',
    expansion: 'core',
    campaigns: { potl: 'potl' },
    keywords: ['starting innovation'],
    settlement: {
      survival: 1,
      showdown: {
        description:
          '**Language**: Gain **Encourage** survival action.\n  **Encourage**: Once per round, if standing spend 1 survival to call out a non-deaf survivor. They stand if knocked down.',
      },
    },
  },
  lantern_oven: {
    id: 'lantern_oven',
    name: 'Lantern Oven',
    expansion: 'core',
    campaigns: { potl: 'potl', potsun: 'potsun' },
    keywords: ['science', 'heat', 'ammonia consequence'],
    settlement: {
      departing: {
        survival: 1,
      },
    },
  },
  mastery_axe: {
    id: 'mastery_axe',
    name: 'Mastery - Axe',
    keywords: ['axe'], // use to map to weapon proficiency id.
    expansion: 'core',
  },
  mastery_bow: {
    id: 'mastery_bow',
    name: 'Mastery - Bow',
    keywords: ['bow'],
    expansion: 'core',
  },
  mastery_club: {
    id: 'mastery_club',
    name: 'Mastery - Club',
    keywords: ['club'],
    expansion: 'core',
  },
  mastery_dagger: {
    id: 'mastery_dagger',
    name: 'Mastery - Dagger',
    keywords: ['dagger'],
    expansion: 'core',
  },
  mastery_fist_and_tooth: {
    id: 'mastery_fist_and_tooth',
    name: 'Mastery - Fist & Tooth',
    keywords: ['fist & tooth'],
    expansion: 'core',
  },
  mastery_grand_weapon: {
    id: 'mastery_grand_weapon',
    name: 'Mastery - Grand Weapon',
    keywords: ['grand weapon'],
    expansion: 'core',
  },
  mastery_katar: {
    id: 'mastery_katar',
    name: 'Mastery - Katar',
    keywords: ['katar'],
    expansion: 'core',
  },
  mastery_scythe: {
    id: 'mastery_scythe',
    name: 'Mastery - Scythe',
    keywords: ['scythe'],
    expansion: 'dk',
  },
  mastery_shield: {
    id: 'mastery_shield',
    name: 'Mastery - Shield',
    keywords: ['shield'],
    expansion: 'core',
  },
  mastery_spear: {
    id: 'mastery_spear',
    name: 'Mastery - Spear',
    keywords: ['spear'],
    expansion: 'core',
  },
  mastery_sword: {
    id: 'mastery_sword',
    name: 'Mastery - Sword',
    keywords: ['sword'],
    expansion: 'core',
  },
  mastery_twilight_sword: {
    id: 'mastery_twilight_sword',
    name: 'Mastery - Twilight Sword',
    keywords: ['twilight sword'],
    expansion: 'core',
  },
  mastery_whip: {
    id: 'mastery_whip',
    name: 'Mastery - Whip',
    keywords: ['whip'],
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
        description:
          'Once per year. Nominate a survivor that died last showdown, roll 1d10: 2-3: Gain Ins of dead survivor; 4-8: Gain Cou and Und of dead survivor; 9-10: Gain Hunt XP of dead survivor.',
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
        description:
          'Lose 3 survival, roll 1d10: 1: Spend 1 survival or die; 2-7: You may spend 1 survival to roll again; 8-9: Gain +1 weapon proficiency level; 10+: Gain +1 Accu or +1 Str.',
      },
    ],
  },
  paint: {
    id: 'paint',
    name: 'Paint',
    expansion: 'core',
    keywords: ['art', 'language consequence'],
    settlement: {
      showdown: {
        description:
          '**Paint**: Gain **Dash** survival action.\n  **Dash**: Spend 1 survival to gain +1![movement](movement) and use it immediatly.',
      },
    },
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
        description:
          'Once per lifetime. 2 survivors gain **Partner** ability.\nPartner: When you both **Arrive**, gain survival up to survival limit. Can Intimacy only with each other.',
      },
    ],
  },
  pictograph: {
    id: 'pictograph',
    name: 'Pictograph',
    expansion: 'core',
    keywords: ['art', 'paint consequence'],
    settlement: {
      showdown: {
        description:
          "**Pictograph**: At the start of a survivor's act, they may decide to skip their act and **Run Away**.",
      },
      departing: {
        description:
          '**Pictograph**: After a hunt event is resolved, a survivor may **Run Away**.',
      },
    },
  },
  pottery: {
    id: 'pottery',
    name: 'Pottery',
    expansion: 'core',
    keywords: ['art', 'sculpture consequence'],
    settlement: {
      survival: 1,
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
        description:
          'Spend 1 organ resource and gain 1 love juice resource. Once per year.',
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
        description:
          'Spend 1 herb resource and gain 1 hide resource. Once per year.',
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
        description:
          'Create a volume about a monster you have defeated. Add "{Monster name} Vol. {level}" to Settlement sheet. You retire.',
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
        description:
          'Roll 1d10: 1: -2 population; 2-3: -1 population, Departing survivors gain +1 Ins; 4-5: -1 population, Departing survivors gain +3 Ins; 6+: -1 population, loose all instanity and may remove 1 Disorder, you can depart this year.',
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
        description:
          'Once per lifetime. Gain +1 Courage, roll 1 hit location die: head: suffer **blinded** severe head injury; body: gain **Though** fighting art; waist: suffer **Destroyed Genitals** severe injury; hands: +1 luck; foot: roll 1d10, 6+: -1 movement.',
      },
    ],
  },
  saga: {
    id: 'saga',
    name: 'Saga',
    expansion: 'core',
    keywords: ['music', 'song of the brave consequence'],
    settlement: {
      newborn: {
        courage: 2,
        understanding: 2,
        'hunt xp': 2,
      },
    },
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
        description:
          'Roll 1d10: 3-9: Spend 3 scrap to gain 1 Iron; 10+: Spend 3 scrap to gain 1 Iron any number of times.',
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
        description:
          'Skip next hunt and lose a fighting art, record this in Settlement sheet.',
      },
      {
        id: 'sculpture_study_statue',
        name: 'Study Statue',
        expansion: 'core',
        recipe: {
          innovation: 'sculpture',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description: 'Roll 1d10: 6+: Gain recorded fighting art.',
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
        description:
          'Once per year. Roll 1d10: 1-3: Departing survivors gain +1 Ins; 4+: Departing survivors add +![1](shield) to all hit locations.',
      },
    ],
  },
  song_of_the_brave: {
    id: 'song_of_the_brave',
    name: 'Song of the Brave',
    expansion: 'core',
    keywords: ['music', 'drums consequence'],
    settlement: {
      departing: {
        description:
          '**Song of the Brave**: During Overwhelming Darkness story event each non-deaf survivor may select the **Path of the Brave**.',
      },
      showdown: {
        description:
          '**Song of the Brave**: On arrival each non-deaf survivor may remove 1 negative attribute token.',
      },
    },
  },
  storytelling: {
    id: 'storytelling',
    name: 'Storytelling',
    expansion: 'core',
    keywords: ['education', 'symposium consequence'],
    settlement: {
      survival: 1,
    },
    endeavors: [
      {
        id: 'storytelling',
        name: 'Story Time',
        expansion: 'core',
        recipe: {
          innovation: 'storytelling',
          items: [{ resource: 'endeavor', quantity: 2 }],
        },
        description:
          'Roll 1d10: 1-3: Gain +1 Und; 4-7: Departing survivor gain +3 Ins; 8+: ![book](book) White Speaker.',
      },
    ],
  },
  symposium: {
    id: 'symposium',
    name: 'Symposium',
    expansion: 'core',
    keywords: ['education', 'language consequence'],
    bonus:
      'When a survivor innovates, draw an additional 2 innovation cards to choose from.',
    settlement: {
      survival: 1,
    },
  },

  ultimate_weapon: {
    id: 'ultimate_weapon',
    name: 'Ultimate Weapon',
    expansion: 'core',
    keywords: ['science'],
    settlement: {
      survival: 1,
      showdown: {
        description:
          '**Ultimate Weapon**: When you defeat a monster, gain 1 monster resource of your choice.',
      },
    },
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
        description:
          'Once per year, roll 1d10: 1-2: Returning survivors gain **Hemophobia** disorder; 3-8: Returning survivors gain +1 Cou and skip next hunt; 9+: Returning survivors invert attribute modifiers.',
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
        description:
          'Once per year, roll 1d10: 1-2: Archive 1 bone resource; 3-10: Spend 3 bone to gain 1 Dense Bone Gorm resource.',
      },
    ],
    settlement: {
      survival: 1,
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
        description:
          'Once per year roll 1d10: 1-2: Returning survivors suffer -1 Eva; 3-10: Returning survivors may remove 1 broken severe injury.',
      },
    ],
    settlement: {
      survival: 1,
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
        description:
          'Once per year, roll 1d10: 1-2: Returning survivors lose 1 level of weapon proficiency; 3-9: Spend 4 organs to gain 1 Gorm Brain Gorm resource; 10+: Returning survivors change 1 negative attribute to 0.',
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
    bonus:
      'At the start of each settlement phase add 1 scrap resource to storage.',
    settlement: {
      departing: {
        survival: 3,
        insanity: 3,
        description:
          '**The Knowledge Worm**: survivors with 10+ insanity, ![book](book) "A Gracious Host".',
      },
    },
  },
  'crimson candy': {
    id: 'crimson candy',
    name: 'Crimson Candy',
    expansion: 'manhunter',
    keywords: ['science'],
    settlement: {
      showdown: {
        description:
          '**Crimson Candy**: At the start of the showdown each survivor gains * survival.',
      },
    },
    endeavors: [
      {
        id: 'crimson cannibalism',
        name: 'Crimson Cannibalism',
        expansion: 'manhunter',
        recipe: {
          innovation: 'crimson candy',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Roll 1d10: 1: -1 Accu; 2-6: Skip next hunt; 7+: Heal **Intracranial Hemorrhage** and **Gaping Chest Wound**.',
      },
    ],
  },
  'war room': {
    id: 'war room',
    name: 'War room',
    expansion: 'manhunter',
    keywords: ['education', 'storytelling consequence'],
    settlement: {
      survival: 1,
      departing: {
        description:
          "**War room**: Quarries can't move off the hunt board. If survivors would need to move backwards roll 1d10, on 4+ they don't.",
      },
    },
    endeavors: [
      {
        id: 'war room',
        name: 'Reroll 1 Hunt Event',
        expansion: 'manhunter',
        recipe: {
          innovation: 'war room',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Departing survivors may reroll 1 Hunt Event Table result (d100) before performing the event.',
      },
    ],
  },
  'settlement watch': {
    id: 'settlement watch',
    name: 'Settlement Watch',
    expansion: 'manhunter',
    keywords: ['home', 'hovel consequence'],
    settlement: {
      survival: 1,
      departing: {
        description:
          '**Settlement Watch**: Survivors gain +2 survival when they depart for a Nemesis encounter or Special Showdown.',
      },
    },
    endeavors: [
      {
        id: 'new recruits',
        name: 'New Recruits',
        expansion: 'manhunter',
        recipe: {
          innovation: 'settlement watch',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Roll 1d10: 1-7: If you have no FA, gain 1 random FA; 8+: If you have 0 or less Str, gain +1 Str, once per lifetime.',
      },
    ],
  },
  'darkwater research': {
    id: 'darkwater research',
    name: 'Darkwater Research',
    expansion: 'slenderman',
    keywords: ['science'],
    settlement: {
      departing: {
        insanity: 2,
      },
    },
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
    campaigns: { potsun: 'potsun' },
    keywords: ['starting innovation'],
    settlement: {
      survival: 1,
      showdown: {
        description:
          "**Sun Language**: All Surivors gain the **Embolden** survival action.\n  **Embolden**: Once per round, if you haven't any +1 Str tokens, spend 1 survival to gain +1 Str token. When you are knocked down loose all Str tokens.",
      },
    },
  },
  'umbilical bank': {
    id: 'umbilical bank',
    name: 'Umbilical Bank',
    expansion: 'sunstalker',
    keywords: ['science'],
    settlement: {
      newborn: {
        description:
          '**Umbilical Bank**: You may add 1 Life String strange resource to the storage.',
      },
    },
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
    settlement: {
      departing: {
        description:
          '**Sauna Shrine**: When departing for a nemesis encounter or special showdown, gain +10 survival.',
      },
    },
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
    bonus:
      'Once per settlement phase, if the survivors return victorious, gain 1 random basic resource.',
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
    settlement: {
      showdown: {
        description:
          '**Hands of the Sun**: All Surivors gain the **Overcharge** survival action.\n  **Overcharge**: If you have any +1 Str token, you may spend 1 survival to remove of them and gain devastating 1 to your next attack this round.',
      },
    },
  },
  aquarobics: {
    id: 'aquarobics',
    name: 'Aquarobics',
    expansion: 'sunstalker',
    keywords: ['faith', 'hands of the sun consequence'],
    settlement: {
      survival: 1,
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
    expansion: 'dk',
    campaigns: { pots: 'pots' },
    keywords: ['starting innovation', 'language'], // TODO: should we do this, or add dragon speech consecuence to all language innovations? Or have a new field with 'add xxx consecuense (like the text at the bottom of the card, but in a programatic way)'
    settlement: {
      survival: 1,
    },
    settlement: {
      showdown: {
        description:
          '**Dragon Speech**: All survivors gain **Encourage** survival action.\n  **Encourage**: Once per round, if standing spend 1 survival to call out a non-deaf survivor. They stand if knocked down.',
      },
    },
  },
  'radiating orb': {
    id: 'radiating orb', // TODO: handle consecuence (this card has add lantern oven consecuence :S)
    name: 'Radiating Orb',
    expansion: 'dk',
    campaigns: { pots: 'pots' },
    keywords: ['science'],
    settlement: {
      departing: {
        survival: 1,
        description:
          '**Radiating Orb**: Survivors with a constellation gain +1 survival.',
      },
      newborn: {
        survival: 1,
      },
    },
  },
  arena: {
    id: 'arena',
    name: 'Arena',
    expansion: 'dk',
    campaigns: { pots: 'pots' },
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
        description:
          'Roll 1d10: 1-2: You are dead; 3-4: Gain a **Scar**, +1 Str, skip next hunt, if you already have a **Scar** you die; 5-9: +1 Accu; 10+: Gain **Frozen Star** SFA.',
      },
    ],
  },
  bloodline: {
    id: 'bloodline',
    name: 'Bloodline',
    expansion: 'dk',
    campaigns: { pots: 'pots' },
    keywords: ['home', 'hovel consecuence'],
    settlement: {
      newborn: {
        description:
          '**Bloodline**: inherit the following from parents:\n\n' +
          "* The Oracle's Eye, Iridescent Hide or Pristine ability.\n" +
          '* 1 Surname.\n' +
          "* Half of the parent's weapon proficiency levels, rounded up.\n\n",
      },
    },
  },
  empire: {
    id: 'empire',
    name: 'Empire',
    expansion: 'dk',
    campaigns: { pots: 'pots' },
    keywords: ['home', 'bloodline consecuence'],
    settlement: {
      newborn: {
        strength: 1,
        description: '**Empire**: gain **Pristine** ability.',
      },
    },
  },
}
