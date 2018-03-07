export default {
  ammonia: {
    id: 'ammonia',
    name: 'Ammonia',
    expansion: 'core',
    keywords: ['science', 'language consequence'],
    expand: {
      settlement: {
        departing: {
          survival: 1,
        },
      },
    },
  },
  bed: {
    id: 'bed',
    name: 'Bed',
    expansion: 'core',
    keywords: ['home', 'hovel consequence'],
    expand: {
      settlement: {
        survival_limit: 1,
      },
      endeavors: {
        bed: {
          name: 'Rest',
          recipe: {
            innovation: 'bed',
            resources: { endeavor: 1 },
          },
        },
      },
    },
  },
  bloodletting: {
    id: 'bloodletting',
    name: 'Blooletting',
    expansion: 'core',
    keywords: ['science', 'ammonia consequence'],
    expand: {
      endeavors: {
        bloodletting: {
          name: 'Braething a Vein',
          recipe: {
            innovation: 'bloodletting',
            resources: { endeavor: 1, resource: 1 },
          },
        },
      },
    },
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
    expand: {
      settlement: {
        survival_limit: 1,
      },
      endeavors: {
        cooking: {
          name: 'Cooking',
          recipe: {
            innovation: 'cooking',
            resources: { endeavor: 1 },
          },
        },
        cooking_meal: {
          name: 'Cook stone nose gruel',
          recipe: {
            innovation: 'cooking',
            resources: { endeavor: 1, organ: 1, bone: 1 },
          },
        },
      },
    },
  },
  drums: {
    id: 'drums',
    name: 'Drums',
    expansion: 'core',
    keywords: ['music', 'language consequence'],
    expand: {
      endeavors: {
        bone_beats: {
          name: 'Bone Beats',
          expansion: 'core',
          recipe: {
            innovation: 'drums',
            resources: { endeavor: 1 },
          },
        },
      },
    },
  },
  destiny: {
    id: 'destiny',
    name: 'Destiny',
    expansion: 'core',
    keywords: ['faith'],
    expand: {
      settlement: {
        survival_limit: 1,
      },
    },
  },
  face_painting: {
    id: 'face_painting',
    name: 'Face Painting',
    expansion: 'core',
    keywords: ['art', 'paint consequence'],
    expand: {
      endeavors: {
        battle_paint: {
          name: 'Battle Paint',
          expansion: 'core',
          recipe: {
            innovation: 'face_painting',
            resources: { endeavor: 1 },
          },
        },
        founders_eye: {
          name: "Founder's Eye",
          expansion: 'core',
          recipe: {
            innovation: 'face_painting',
            resources: { endeavor: 1 },
          },
        },
      },
    },
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
    expand: {
      settlement: {
        departing: {
          survival: 1,
        },
      },
    },
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
    expand: {
      settlement: {
        survival_limit: 1,
      },
    },
  },
  forbidden_dance: {
    id: 'forbidden_dance',
    name: 'Forbidden Dance',
    expansion: 'core',
    keywords: ['music', 'drums consequence'],
    providesBonuses: [
      {
        id: 'forbidden_dance',
        name: 'Forbidden Dance',
        description: [
          'When a survivor uses the Synchronized Strike SFA, reroll missed attack rolls once',
        ],
      },
    ],
    expand: {
      endeavors: {
        forbidden_dance: {
          name: 'Forbidden Dance',
          expansion: 'core',
          recipe: {
            innovation: 'forbidden_dance',
            resources: { endeavor: 1 },
          },
        },
      },
    },
  },
  guidepost: {
    id: 'guidepost',
    name: 'Guidepost',
    expansion: 'core',
    keywords: ['other'],
    expand: {
      settlement: {
        departing: {
          survival: 1,
        },
      },
      endeavors: {
        guidepost: {
          name: 'Guidepost',
          recipe: {
            innovation: 'guidepost',
            resources: { endeavor: 1 },
          },
        },
      },
    },
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
    expand: {
      endeavors: {
        heart_flute: {
          name: "Devil's Melody",
          recipe: {
            innovation: 'heart_flute',
            resources: { endeavor: 1 },
          },
        },
      },
    },
  },
  hovel: {
    id: 'hovel',
    name: 'Hovel',
    expansion: 'core',
    keywords: ['home', 'language consequence'],
    expand: {
      settlement: {
        survival: 1,
        departing: {
          survival: 1,
        },
      },
    },
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
    expand: {
      settlement: {
        survival_limit: 1,
      },
    },
  },
  lantern_oven: {
    id: 'lantern_oven',
    name: 'Lantern Oven',
    expansion: 'core',
    keywords: ['science', 'heat', 'ammonia consequence'],
    expand: {
      settlement: {
        departing: {
          survival: 1,
        },
      },
    },
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
    expand: {
      endeavors: {
        momento_mori: {
          name: 'Momento Mori',
          expansion: 'core',
          recipe: { innovation: 'momento_mori', resources: { endeavor: 1 } },
        },
      },
    },
  },
  nightmare_training: {
    id: 'nightmare_training',
    name: 'Nightmare Training',
    expansion: 'core',
    keywords: ['education', 'symposium consequence'],
    expand: {
      endeavors: {
        nightmare_training: {
          name: 'Train',
          recipe: {
            innovation: 'nightmare_training',
            resources: { endeavor: 1 },
          },
        },
      },
    },
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
    expand: {
      endeavors: {
        partnership: {
          name: 'Partnership',
          expansion: 'core',
          recipe: {
            innovation: 'partnership',
            resources: { endeavor: 2 },
          },
        },
      },
    },
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
    expand: {
      settlement: {
        survival_limit: 1,
      },
      endeavors: {
        fermentation: {
          name: 'Fermentation',
          recipe: {
            innovation: 'pottery',
            resources: { endeavor: 1, organ: 1 },
          },
        },
        ret: {
          name: 'Ret',
          recipe: {
            innovation: 'pottery',
            resources: { endeavor: 1, herb: 1 },
          },
        },
      },
    },
  },
  records: {
    id: 'records',
    name: 'Records',
    expansion: 'core',
    keywords: ['education', 'storytelling consequence'],
    expand: {
      endeavors: {
        records_fa: {
          name: 'Gain Scholar of Death SFA',
          recipe: {
            innovation: 'records',
            resources: { endeavor: 1 },
          },
        },
        records: {
          name: 'Create monster Volume',
          recipe: {
            innovation: 'records',
            resources: { endeavor: 1 },
          },
        },
      },
    },
  },
  sacrifice: {
    id: 'sacrifice',
    name: 'Sacrifice',
    expansion: 'core',
    keywords: ['faith', 'shrine consequence'],
    expand: {
      endeavors: {
        sacrifice: {
          name: 'Death Ritual',
          recipe: {
            innovation: 'sacrifice',
            resources: { endeavor: 1 },
          },
        },
      },
    },
  },
  sacrification: {
    id: 'sacrification',
    name: 'Sacrification',
    expansion: 'core',
    keywords: ['faith', 'inner lantern consequence'],
    expand: {
      endeavors: {
        sacrification: {
          name: 'Initiation',
          recipe: {
            innovation: 'sacrification',
            resources: { endeavor: 1 },
          },
        },
      },
    },
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
    expand: {
      endeavors: {
        purification: {
          name: 'Purification',
          recipe: {
            innovation: 'scrap_smelting',
            resources: { endeavor: 1 },
          },
        },
        build_blacksmith: {
          name: 'Build - Blacksmith',
          recipe: {
            innovation: 'scrap_smelting',
            not_location: 'blacksmith',
            resources: { endeavor: 1, bone: 6, scrap: 3 },
          },
        },
      },
    },
  },
  sculpture: {
    id: 'sculpture',
    name: 'Sculpture',
    expansion: 'core',
    keywords: ['art', 'paint consequence'],
    expand: {
      endeavors: {
        sculpture_statue: {
          name: 'Sculpt Statue',
          recipe: {
            innovation: 'sculpture',
            resources: { endeavor: 1 },
          },
        },
        sculpture_study_statue: {
          name: 'Study Statue',
          recipe: {
            innovation: 'sculpture',
            resources: { endeavor: 1 },
          },
        },
      },
    },
  },
  shrine: {
    id: 'shrine',
    name: 'Shrine',
    expansion: 'core',
    keywords: ['faith', 'inner lantern consequence'],
    expand: {
      endeavors: {
        shrine: {
          name: 'Armor Ritual',
          recipe: {
            innovation: 'shrine',
            resources: { endeavor: 1 },
          },
        },
      },
    },
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
    expand: {
      settlement: {
        survival_limit: 1,
      },
      endeavors: {
        storytelling: {
          name: 'Story Time',
          recipe: { innovation: 'storytelling', resources: { endeavor: 2 } },
        },
      },
    },
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
    expand: {
      settlement: {
        survival: 1,
      },
    },
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
    expand: {
      settlement: {
        survival_limit: 1,
      },
    },
  },
}
