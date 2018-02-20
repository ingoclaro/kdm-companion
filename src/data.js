export default {
  settlement_locations: {
    catarium: {
      name: 'Catarium',
      expansion: 'core',
      gear: [
        'white_lion_helm',
        'white_lion_gauntlets',
        'white_lion_coat',
        'white_lion_skirt',
        'white_lion_boots',
        'lion_beast_katar',
        'claw_head_arrow',
        'king_spear',
        'cat_gut_bow',
        'cat_fang_knife',
        'cat_eye_circlet',
        'whisker_harp',
        'lion_headdress',
        'lion_skin_cloak',
        'frenzy_drink',
      ],
    },
    stone_circle: {
      name: 'Stone Circle',
      expansion: 'core',
      gear: [
        'screaming_horns',
        'screaming_bracers',
        'screaming_coat',
        'screaming_skirt',
        'screaming_leg_warmers',
        'boss_mehndi',
        'beast_knuckle',
        'red_charm',
        'blood_paint',
        'bone_earrings',
        'green_charm',
        'blue_charm',
        'lance_of_longinus',
      ],
    },
    weapon_crafter: {
      name: 'Weapon Crafter',
      expansion: 'core',
      gear: [
        'counterweighted_axe',
        'whistling_mace',
        'zanbato',
        'blood_sheath',
        'rainbow_katana',
        'skullcap_hammer',
        'scrap_sword',
        'scrap_dagger',
        'finger_of_god',
      ],
    },
    leather_worker: {
      name: 'Leather Worker',
      expansion: 'core',
      gear: [
        'leather_mask',
        'leather_bracers',
        'leather_curiass',
        'leather_skirt',
        'leather_boots',
        'round_leather_shield',
        'hunter_whip',
      ],
    },
    plumery: {
      name: 'Plumery',
      expansion: 'core',
      gear: [
        'phoenix_helm',
        'phoenix_gauntlets',
        'phoenix_plackart',
        'phoenix_faulds',
        'phoenix_greaves',
        'feather_shield',
        'bloom_sphere',
        'sonic_tomahawk',
        'hollow_sword',
        'arc_bow',
        'feather_mantle',
        'bird_bread',
        'hours_ring',
        'crest_crown',
        'hollowpoint_arrow',
      ],
    },
    blacksmith: {
      name: 'Blacksmith',
      expansion: 'core',
      gear: [
        'lantern_helm',
        'lantern_gauntlets',
        'lantern_curiass',
        'lantern_mail',
        'lantern_greaves',
        'lantern_sword',
        'lantern_dagger',
        'lantern_glaive',
        'dragon_slayer',
        'perfect_slayer',
        'scrap_shield',
        'beacon_shield',
        'ring_whip',
      ],
    },
    bone_smith: {
      name: 'Bone Smith',
      expansion: 'core',
      gear: [
        'bone_dagger',
        'bone_blade',
        'bone_axe',
        'bone_darts',
        'skull_helm',
        'bone_pickaxe',
        'bone_sickle',
      ],
      expand: {
        endeavors: {
          build_weapon_crafter: {
            name: 'Build - Weapon Crafter',
            expansion: 'core',
            recipe: {
              location: 'bone_smith',
              not_location: 'weapon_crafter',
              resources: { endeavor: 1, bone: 3, hide: 1 },
            },
          },
        },
      },
    },
    barber_surgeon: {
      name: 'Barber Surgeon',
      expansion: 'core',
      gear: [
        'first_aid_kit',
        'brain_mint',
        'elder_earrings',
        'musk_bomb',
        'scavenger_kit',
        'bug_trap',
        'speed_powder',
        'almanac',
      ],
    },
    skinnery: {
      name: 'Skinnery',
      expansion: 'core',
      gear: [
        'rawhide_headband',
        'rawhide_gloves',
        'rawhide_vest',
        'rawhide_pants',
        'rawhide_boots',
        'bandages',
        'rawhide_drum',
        'rawhide_whip',
      ],
      expand: {
        endeavors: {
          build_leather_worker: {
            name: 'Build - Leather Worker',
            expansion: 'core',
            recipe: {
              location: 'skinnery',
              not_location: 'leather_worker',
              resources: { endeavor: 1, organ: 1, hide: 3 },
            },
          },
        },
      },
    },
    organ_grinder: {
      name: 'Organ Grinder',
      expansion: 'core',
      gear: [
        'fecal_salve',
        'monster_grease',
        'dried_acanthus',
        'lucky_charm',
        'monster_tooth_necklace',
      ],
      expand: {
        endeavors: {
          augury: {
            name: 'Augury',
            expansion: 'core',
            recipe: {
              location: 'organ_grinder',
              resources: { endeavor: 1 },
            },
          },
          stone_noses: {
            name: 'Stone Noses',
            expansion: 'core',
            recipe: {
              location: 'organ_grinder',
              resources: { endeavor: 1 },
            },
          },
          build_stone_circle: {
            name: 'Build - Stone Circle',
            expansion: 'core',
            recipe: {
              location: 'organ_grinder',
              not_location: 'stone_circle',
              resources: { endeavor: 1, organ: 3, hide: 3 },
            },
          },
        },
      },
    },
    mask_maker: {
      name: 'Mask Maker',
      expansion: 'core',
      gear: [
        'white_lion_mask',
        'antelope_mask',
        'phoenix_mask',
        'death_mask',
        'man_mask',
        'god_mask',
      ],
    },
    lantern_hoard: {
      name: 'Lantern Hoard',
      expansion: 'core',
      expand: {
        endeavors: {
          innovate: {
            name: 'Innovate',
            expansion: 'core',
            recipe: {
              location: 'lantern_hoard',
              resources: { endeavor: 1, bone: 1, organ: 1, hide: 1 },
            },
          },
          shared_experience: {
            name: 'Shared Experience',
            expansion: 'core',
            recipe: {
              location: 'lantern_hoard',
              resources: { endeavor: 1 },
            },
          },
        },
      },
    },
  },
  gear: {
    white_lion_helm: {
      name: 'White Lion Helm',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'white fur': 1, 'great cat bone': 1 },
        },
      ],
    },
    white_lion_gauntlets: {
      name: 'White Lion Gauntlets',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'white fur': 1, bone: 1 },
        },
      ],
    },
    white_lion_coat: {
      name: 'White Lion Coat',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'white fur': 1, hide: 1 },
        },
      ],
    },
    white_lion_skirt: {
      name: 'White Lion Coat',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'white fur': 1, hide: 1 },
        },
      ],
    },
    white_lion_boots: {
      name: 'White Lion Boots',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'white fur': 1, hide: 1 },
        },
      ],
    },
    lion_beast_katar: {
      name: 'Lion Beast Katar',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'lion claw': 1, hide: 1 },
        },
      ],
    },
    claw_head_arrow: {
      name: 'Claw Head Arrow',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'lion claw': 1 },
        },
      ],
    },
    king_spear: {
      name: 'King Spear',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'lion claw': 1, 'great cat bone': 1 },
        },
      ],
    },
    cat_gut_bow: {
      name: 'Cat Gut Bow',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { sinew: 1, bone: 1 },
        },
      ],
    },
    cat_fang_knife: {
      name: 'Cat Fang Knife',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'elder cat teeth': 1, organ: 4 },
        },
      ],
    },
    cat_eye_circlet: {
      name: 'Cat Eye Circlet',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'eye of cat': 1 },
        },
      ],
    },
    whisker_harp: {
      name: 'Whisker Harp',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'golden whiskers': 1, bone: 1 },
        },
      ],
    },
    lion_headdress: {
      name: 'Lion Headdress',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'shimmering mane': 1 },
        },
      ],
    },
    lion_skin_cloak: {
      name: 'Lion Skin Cloak',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'white fur': 2 },
        },
      ],
    },
    frenzy_drink: {
      name: 'Frenzy Drink',
      expansion: 'core',
      recipes: [
        {
          location: 'catarium',
          innovations: [],
          resources: { 'lion testes': 1 },
        },
      ],
    },
    screaming_horns: {
      name: 'Screaming Horns',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { 'spiral horn': 1, scrap: 1 },
        },
      ],
    },
    screaming_bracers: {
      name: 'Screaming Bracers',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { pelt: 1, hide: 1 },
        },
      ],
    },
    screaming_coat: {
      name: 'Screaming Coat',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { pelt: 1, bone: 1 },
        },
      ],
    },
    screaming_skirt: {
      name: 'Screaming Skirt',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { pelt: 1 },
        },
      ],
    },
    screaming_leg_warmers: {
      name: 'Screaming Leg Warmers',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { pelt: 1, hide: 1 },
        },
      ],
    },
    boss_mehndi: {
      name: 'Boss Mehndi',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { 'golden whiskers': 1, bone: 1 },
        },
      ],
    },
    beast_knuckle: {
      name: 'Beast Knuckle',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { 'large flat tooth': 1, pelt: 1 },
        },
      ],
    },
    red_charm: {
      name: 'Red Charm',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { organ: 3 },
        },
      ],
    },
    blood_paint: {
      name: 'Blood Paint',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: ['paint'],
          resources: { bladder: 1, organ: 1 },
        },
      ],
    },
    bone_earrings: {
      name: 'Bone Earrings',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { 'shank bone': 1, bone: 1 },
        },
      ],
    },
    green_charm: {
      name: 'Green Charm',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { organ: 3 },
        },
      ],
    },
    blue_charm: {
      name: 'Blue Charm',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { organ: 3 },
        },
      ],
    },
    lance_of_longinus: {
      name: 'Lance of Longinus',
      expansion: 'core',
      recipes: [
        {
          location: 'stone_circle',
          innovations: [],
          resources: { 'legendary horns': 1, organ: 6 },
        },
      ],
    },
    counterweighted_axe: {
      name: 'Counterweighted Axe',
      expansion: 'core',
      recipes: [
        {
          location: 'weapon_crafter',
          innovations: [],
          resources: { bone: 2, hide: 1, organ: 1 },
        },
      ],
    },
    whistling_mace: {
      name: 'Whistling Mace',
      expansion: 'core',
      recipes: [
        {
          location: 'weapon_crafter',
          innovations: [],
          resources: { bone: 2, organ: 1 },
        },
      ],
    },
    zanbato: {
      name: 'Zanbato',
      expansion: 'core',
      recipes: [
        {
          location: 'weapon_crafter',
          innovations: [],
          resources: { 'great cat bone': 1, hide: 2 },
        },
      ],
    },
    blood_sheath: {
      name: 'Blood Sheath',
      expansion: 'core',
      recipes: [
        {
          location: 'weapon_crafter',
          innovations: [],
          resources: {
            organ: 5,
            'hollow wing bone': 1,
            'muculent droppings': 1,
          },
        },
      ],
    },
    rainbow_katana: {
      name: 'Rainbow Katana',
      expansion: 'core',
      recipes: [
        {
          location: 'weapon_crafter',
          innovations: ['heat'],
          resources: {
            'phoenix beak': 1,
            'rainbow droppings': 1,
            iron: 1,
            bone: 6,
          },
        },
      ],
    },
    skullcap_hammer: {
      name: 'Skullcap Hammer',
      expansion: 'core',
      recipes: [
        {
          location: 'weapon_crafter',
          innovations: [],
          resources: { bone: 2, scrap: 1 },
        },
      ],
    },
    scrap_sword: {
      name: 'Scrap Sword',
      expansion: 'core',
      recipes: [
        {
          location: 'weapon_crafter',
          innovations: ['heat'],
          resources: { bone: 2, scrap: 1 },
        },
      ],
    },
    scrap_dagger: {
      name: 'Scrap Dagger',
      expansion: 'core',
      recipes: [
        {
          location: 'weapon_crafter',
          innovations: ['heat'],
          resources: { bone: 1, scrap: 1 },
        },
      ],
    },
    finger_of_god: {
      name: 'Finger Of God',
      expansion: 'core',
      recipes: [
        {
          location: 'weapon_crafter',
          innovations: [],
          resources: { 'phoenix finger': 1, bone: 4 },
        },
      ],
    },
    leather_mask: {
      name: 'Leather Mask',
      expansion: 'core',
      recipes: [
        {
          location: 'leather_worker',
          innovations: [],
          resources: { leather: 1, scrap: 1 },
        },
      ],
    },
    leather_bracers: {
      name: 'Leather Bracers',
      expansion: 'core',
      recipes: [
        {
          location: 'leather_worker',
          innovations: [],
          resources: { leather: 1, hide: 1 },
        },
      ],
    },
    leather_curiass: {
      name: 'Leather Curiass',
      expansion: 'core',
      recipes: [
        {
          location: 'leather_worker',
          innovations: [],
          resources: { leather: 1, bone: 1 },
        },
      ],
    },
    leather_skirt: {
      name: 'Leather Skirt',
      expansion: 'core',
      recipes: [
        {
          location: 'leather_worker',
          innovations: [],
          resources: { leather: 1 },
        },
      ],
    },
    leather_boots: {
      name: 'Leather Boots',
      expansion: 'core',
      recipes: [
        {
          location: 'leather_worker',
          innovations: [],
          resources: { leather: 1, hide: 1 },
        },
      ],
    },
    round_leather_shield: {
      name: 'Round Leather Shield',
      expansion: 'core',
      recipes: [
        {
          location: 'leather_worker',
          innovations: [],
          resources: { leather: 1, bone: 1, hide: 1 },
        },
      ],
    },
    hunter_whip: {
      name: 'Hunter Whip',
      expansion: 'core',
      recipes: [
        {
          location: 'leather_worker',
          innovations: [],
          resources: { leather: 2, bone: 1 },
        },
      ],
    },
  },
  resources: {
    sinew: {
      keywords: ['organ'],
      monster: 'white_lion',
    },
    'white fur': {
      keywords: ['hide'],
      monster: 'white_lion',
    },
    'great cat bone': {
      keywords: ['bone'],
      monster: 'white_lion',
    },
    'lion claw': {
      keywords: ['bone'],
      monster: 'white_lion',
    },
    'elder cat teeth': {
      keywords: ['bone'],
      type: 'strange',
    },
    'eye of cat': {
      keywords: ['organ', 'consumable'],
      monster: 'white_lion',
    },
    'golden whiskers': {
      keywords: ['organ'],
      monster: 'white_lion',
    },
    'shimmering mane': {
      keywords: ['hide'],
      monster: 'white_lion',
    },
    'lion testes': {
      keywords: ['organ', 'consumable'],
      monster: 'white_lion',
    },
    'lion tail': {
      keywords: ['hide'],
      monster: 'white_lion',
    },
    'curious hand': {
      keywords: ['hide'],
      monster: 'white_lion',
    },
    whishbone: {
      keywords: ['bone'],
      monster: 'phoenix',
    },
    'tail feathers': {
      keywords: ['hide'],
      monster: 'phoenix',
    },
    'shimmering halo': {
      keywords: ['organ'],
      monster: 'phoenix',
    },
    'small hand parasites': {
      keywords: ['organ'],
      monster: 'phoenix',
    },
    'small feathers': {
      keywords: ['hide'],
      monster: 'phoenix',
    },
    'rainbow droppings': {
      keywords: ['organ', 'consumable'],
      monster: 'phoenix',
    },
    bladder: {
      keywords: ['organ', 'consumable'],
      monster: 'screaming_antelope',
    },
    'bird beak': {
      keywords: ['bone'],
      monster: 'phoenix',
    },
    'black skull': {
      keywords: ['iron', 'skull', 'bone'],
      monster: 'phoenix',
    },
    skull: {
      keywords: ['bone'],
      type: 'basic',
    },
    'monster bone': {
      keywords: ['bone'],
      type: 'basic',
    },
    '???': {
      keywords: ['organ', 'hide', 'bone', 'consumable'],
      type: 'basic',
    },
    'love juice': {
      keywords: ['organ', 'consumable'],
      type: 'basic',
    },
    'monster hide': {
      keywords: ['hide'],
      type: 'basic',
    },
    'monster organ': {
      keywords: ['organ', 'consumable'],
      type: 'basic',
    },
    'hollow wing bone': {
      keywords: ['bone'],
      monster: 'phoenix',
    },
    'muculent droppings': {
      keywords: ['organ'],
      monster: 'phoenix',
    },
    'phoenix eye': {
      keywords: ['organ', 'scrap'],
      monster: 'phoenix',
    },
    'phoenix finger': {
      keywords: ['bone'],
      monster: 'phoenix',
    },
    'phoenix whisker': {
      keywords: ['hide'],
      monster: 'phoenix',
    },
    pustules: {
      keywords: ['organ', 'consumable'],
      monster: 'phoenix',
    },
    'large flat tooth': {
      keywords: ['bone'],
      monster: 'screaming_antelope',
    },
    'muscly gums': {
      keywords: ['organ', 'consumable'],
      monster: 'screaming_antelope',
    },
    'spiral horn': {
      keywords: ['bone'],
      monster: 'screaming_antelope',
    },
    'shank bone': {
      keywords: ['bone'],
      monster: 'screaming_antelope',
    },
    'screaming brain': {
      keywords: ['organ', 'consumable'],
      monster: 'screaming_antelope',
    },
    pelt: {
      keywords: ['hide'],
      monster: 'screaming_antelope',
    },
    'second heart': {
      keywords: ['organ', 'bone'],
      type: 'strange',
    },
    'phoenix crest': {
      keywords: ['organ'],
      type: 'strange',
    },
    'perfect crucible': {
      keywords: ['iron'],
      type: 'strange',
    },
    'legendary horns': {
      keywords: ['bone', 'scrap'],
      type: 'strange',
    },
    leather: {
      keywords: ['hide'],
      type: 'strange',
    },
    iron: {
      keywords: ['scrap'],
      type: 'strange',
    },
    'fresh acanthus': {
      keywords: ['herb'],
      type: 'strange',
    },
    'broken lantern': {
      keywords: ['scrap'],
      type: 'basic',
    },
  },
  innovations: {
    ammonia: {
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
      name: 'Clan of Death',
      expansion: 'core',
      keywords: ['home', 'family consequence'],
      expand: {
        bonuses: {
          clan_of_death: {
            name: 'Clan of Death',
            description: [
              'All newborn survivors gain +1 accurancy, strength and evasion',
            ],
          },
        },
      },
    },
    cooking: {
      name: 'Cooking',
      expansion: 'core',
      keywords: ['science', 'lantern oven consequence'],
      expand: {
        bonuses: {
          cooking: {
            name: 'Cooking',
            description: [
              'At the start of the Settlement phase gain +1 endeavor',
            ],
          },
        },
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
      name: 'Family',
      expansion: 'core',
      keywords: ['home', 'hovel consequence'],
      expand: {
        settlement: {
          departing: {
            survival: 1,
          },
        },
        bonuses: {
          family: {
            name: 'Family',
            description: [
              'A newborn survivor inherits the surname of one of the parents, their weapon type and 1/2 their weapon proficiency',
            ],
          },
        },
      },
    },
    final_fighting_art: {
      name: 'Final Fighting Art',
      expansion: 'core',
      keywords: ['education'],
      expand: {
        settlement: {
          survival_limit: 1,
        },
        bonuses: {
          final_fighting_art: {
            name: 'Final Fighting Art',
            description: [
              'Once per showdown you may select an AI card from the discard or wound pile and put it on top of AI deck',
            ],
          },
        },
      },
    },
    forbidden_dance: {
      name: 'Forbidden Dance',
      expansion: 'core',
      keywords: ['music', 'drums consequence'],
      expand: {
        bonuses: {
          forbidden_dance: {
            name: 'Forbidden Dance',
            description: [
              'When a survivor uses the Synchronized Strike SFA, reroll missed attack rolls once',
            ],
          },
        },
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
      name: 'Heart Flute',
      expansion: 'core',
      keywords: ['music', 'forbidden dance consequence'],
      expand: {
        bonuses: {
          heart_flute: {
            name: 'Heart Flute',
            description: [
              "When using Synchronized Strike FA, the attack assist may spend 1 survival to change a monster's R to R Failure before any wound attempts",
            ],
          },
        },
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
      name: 'Inner Lantern',
      expansion: 'core',
      keywords: ['faith', 'language consequence'],
    },
    language: {
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
      name: 'Mastery - Axe',
      expansion: 'core',
    },
    mastery_bow: {
      name: 'Mastery - Bow',
      expansion: 'core',
    },
    mastery_club: {
      name: 'Mastery - Club',
      expansion: 'core',
    },
    mastery_dagger: {
      name: 'Mastery - Dagger',
      expansion: 'core',
    },
    mastery_fist_and_tooth: {
      name: 'Mastery - Fist & Tooth',
      expansion: 'core',
    },
    mastery_grand_weapon: {
      name: 'Mastery - Grand Weapon',
      expansion: 'core',
    },
    mastery_katar: {
      name: 'Mastery - Katar',
      expansion: 'core',
    },
    mastery_shield: {
      name: 'Mastery - Shield',
      expansion: 'core',
    },
    mastery_spear: {
      name: 'Mastery - Spear',
      expansion: 'core',
    },
    mastery_sword: {
      name: 'Mastery - Sword',
      expansion: 'core',
    },
    mastery_twilight_sword: {
      name: 'Mastery - Twilight Sword',
      expansion: 'core',
    },
    mastery_whip: {
      name: 'Mastery - Whip',
      expansion: 'core',
    },
    momento_mori: {
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
      name: 'Paint',
      expansion: 'core',
      keywords: ['art', 'language consequence'],
    },
    partnership: {
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
      name: 'Pictograph',
      expansion: 'core',
      keywords: ['art', 'paint consequence'],
      expand: {
        bonuses: {
          pictograph: {
            name: 'Pictograph',
            description: [
              "At the start of a survivor's act, they may decide to skip their act and Run Away",
              'After a hunt event is resolved, a survivor may Run Away',
            ],
          },
        },
      },
    },
    pottery: {
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
      name: 'Saga',
      expansion: 'core',
      keywords: ['music', 'song of the brave consequence'],
      expand: {
        bonuses: {
          saga: {
            name: 'Saga',
            description: [
              'All newborn survivors gain +2 Courage, Understanding and Hunt XP',
            ],
          },
        },
      },
    },
    scrap_smelting: {
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
      name: 'Song of the Brave',
      expansion: 'core',
      keywords: ['music', 'drums consequence'],
      expand: {
        bonuses: {
          song_of_the_brave: {
            name: 'Song of the Brave',
            description: [
              'On arrival each non-deaf survivor may remove 1 negative attribute token',
              'During Overwhelming Darkness story event each non-deaf survivor may select the Path of the Brave',
            ],
          },
        },
      },
    },
    storytelling: {
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
      name: 'Symposium',
      expansion: 'core',
      keywords: ['education', 'language consequence'],
      expand: {
        settlement: {
          survival: 1,
        },
        bonuses: {
          symposium: {
            name: 'Symposium',
            description: [
              'When a survivor innovates, draw an additional 2 innovation cards to choose from',
            ],
          },
        },
      },
    },
    ultimate_weapon: {
      name: 'Ultimate Weapon',
      expansion: 'core',
      keywords: ['science'],
      expand: {
        settlement: {
          survival_limit: 1,
        },
        bonuses: {
          ultimate_weapon: {
            name: 'Ultimate Weapon',
            description: [
              'When you defeat a monster, gain 1 monster resource of your choice',
            ],
          },
        },
      },
    },
  },
  monsters: {
    white_lion: {
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
    },
    screaming_antelope: {
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
    },
    phoenix: {
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
    },
  },
  principles: {
    survival_of_the_fittest: {
      name: 'Survival of the Fittests',
      expand: {
        bonuses: {
          survival_of_the_fittest: {
            name: 'Survival of the Fittests',
            description: [
              'When rolling on intimacy table, roll twice and keep lowest result',
              'All current and newborn survivors gain +1 strength and evasion',
              'Once per lifetime, a survivor may reroll a single roll result',
            ],
          },
        },
      },
    },
    protect_the_young: {
      name: 'Protect the Young',
      expand: {
        bonuses: {
          protect_the_young: {
            name: 'Protect the Young',
            description: [
              'When rolling on intimacy table, roll twice and pick 1 result',
            ],
          },
        },
      },
    },
    graves: {
      name: 'Graves',
      expand: {
        bonuses: {
          graves: {
            name: 'Graves',
            description: [
              'All new survivors gain +1 understanding',
              'When a survivor dies during hunt or showdown phase, gain +2 endeavors',
              'When a survivor dies during settlement phase, gain +1 endeavors',
            ],
          },
        },
      },
    },
    cannibalize: {
      name: 'Cannibalize',
      expand: {
        settlement: {
          survival_limit: 1,
        },
        bonuses: {
          cannibalize: {
            name: 'Cannibalize',
            description: [
              'Whenever a survivor dies, gain 1 random basic resource',
            ],
          },
        },
      },
    },
    accept_darkness: {
      name: 'Accept Darkness',
      expand: {
        bonuses: {
          accept_darkness: {
            name: 'Accept Darkness',
            description: ['Add +2 to all Brain Trauma Rolls.'],
          },
        },
      },
    },
    collective_toil: {
      name: 'Collective Toil',
      expand: {
        bonuses: {
          collective_toil: {
            name: 'Collective Toil',
            description: [
              'At the start of the settlement phase gain +1 endeavor for every 10 population',
            ],
          },
        },
      },
    },
    barbaric: {
      name: 'Barbaric',
      expand: {
        settlement: {
          survival_limit: 1,
        },
        bonuses: {
          barbaric: {
            name: 'Barbaric',
            description: [
              'All current and newborn survivors gain +1 permanent strength',
            ],
          },
        },
      },
    },
    romantic: {
      name: 'Romantic',
      expand: {
        settlement: {
          survival_limit: 1,
        },
        bonuses: {
          romantic: {
            name: 'Romantic',
            description: [
              'When you gain a random FA, draw 3 cards and select one',
            ],
          },
        },
      },
    },
  },
  // endeavors: {
  //   // This will be filled with data when selecting locations or innovations, structure:
  //   endeavors: {
  //     build_weapon_crafter: {
  //       // id
  //       name: 'Build - Weapon Crafter', // name to show in the UI
  //       expansion: 'core', // which expansion it belongs to
  //       recipe:
  //         // what is needed to build this
  //         {
  //           location: 'bone_smith', // which location it needs
  //           not_location: 'weapon_crafter', // which location it doesn't need (eg: if it's already built, don't show this)
  //           resources: { endeavor: 1, bone: 3, hide: 1 }, // what resources are needed
  //         },
  //     },
  //   },
  // },
  // bonuses: {
  //   // This will be filled with data when selecting principles or others, see graves for example.
  //   graves: { // id
  //     name: 'Graves', // name to display
  //     description: [ // list of free form text with rules
  //       'All new survivors gain +1 understanding',
  //       'When a survivor dies during hunt or showdown phase, gain +2 endeavors',
  //       'When a survivor dies during settlement phase, gain +1 endeavors',
  //     ],
  //   },
  // },
}
