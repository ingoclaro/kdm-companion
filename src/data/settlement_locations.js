export default {
  catarium: {
    id: 'catarium',
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
    id: 'stone_circle',
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
    endeavors: [
      {
        id: 'harvest_ritual',
        name: 'Harvest Ritual',
        expansion: 'core',
        recipe: {
          innovation: 'forbidden dance',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Spend any number of monster resources to draw an equal number of basic resources.',
      },
    ],
  },
  weapon_crafter: {
    id: 'weapon_crafter',
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
    endeavors: [
      {
        id: 'scrap_scavenge',
        name: 'Scrap Scavenge',
        expansion: 'core',
        recipe: {
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Roll 1d10: 1-5: Spend 1 survival or die; 6-9: Gain 1 broken lantern resource; 10+: Gain 1 courage.',
      },
      {
        id: 'innovate_scrap_smelting',
        name: 'Innovate Scrap Smelting',
        expansion: 'core',
        recipe: {
          not_innovation: 'scrap_smelting',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'scrap', quantity: 2 },
            { keyword: 'bone', quantity: 5 },
            { keyword: 'organ', quantity: 5 },
          ],
        },
      },
    ],
  },
  leather_worker: {
    id: 'leather_worker',
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

    endeavors: [
      {
        id: 'leather_making',
        name: 'Leather Making',
        expansion: 'core',
        recipe: {
          innovation: 'ammonia',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'hide', quantity: 1 },
          ],
        },
        description:
          'Spend any number of hide to gain equal number of leather strange resources.',
      },
    ],
  },
  plumery: {
    id: 'plumery',
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
    id: 'blacksmith',
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
    id: 'bone_smith',
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
    endeavors: [
      {
        id: 'build_weapon_crafter',
        name: 'Build - Weapon Crafter',
        expansion: 'core',
        recipe: {
          not_location: 'weapon_crafter',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'bone', quantity: 3 },
            { keyword: 'hide', quantity: 1 },
          ],
        },
      },
    ],
  },
  barber_surgeon: {
    id: 'barber_surgeon',
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
    endeavors: [
      {
        id: 'trepanning',
        name: 'Trepanning',
        expansion: 'core',
        recipe: {
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Roll 1d10: 1-2: Suffer **intracranial hemorrhage** severe head injury; 3-6: Cure 1 disorder; 7-9: Cure **intracranial hemorrhage**; 10+: Gain 1 random disorder and 1 random fighting art.',
      },
    ],
  },
  skinnery: {
    id: 'skinnery',
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
    endeavors: [
      {
        id: 'build_leather_worker',
        name: 'Build - Leather Worker',
        expansion: 'core',
        recipe: {
          not_location: 'leather_worker',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'organ', quantity: 1 },
            { keyword: 'hide', quantity: 3 },
          ],
        },
      },
    ],
  },
  organ_grinder: {
    id: 'organ_grinder',
    name: 'Organ Grinder',
    expansion: 'core',
    gear: [
      'fecal_salve',
      'monster_grease',
      'dried_acanthus',
      'lucky_charm',
      'monster_tooth_necklace',
    ],
    endeavors: [
      {
        id: 'augury',
        name: 'Augury',
        expansion: 'core',
        recipe: {
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Roll 1d10, +1 if 3+Und: 1-3: Lose 1 resource, +1 Und; 4-7: +1 Surv.; 8+ ![book](book) Intimacy.',
      },
      {
        id: 'stone_noses',
        name: 'Stone Noses',
        expansion: 'core',
        recipe: {
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_stone_circle',
        name: 'Build - Stone Circle',
        expansion: 'core',
        recipe: {
          not_location: 'stone_circle',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'organ', quantity: 3 },
            { keyword: 'hide', quantity: 1 },
          ],
        },
      },
    ],
  },
  mask_maker: {
    id: 'mask_maker',
    name: 'Mask Maker',
    expansion: 'core',
    gear: [
      'white lion mask',
      'antelope mask',
      'phoenix mask',
      'death mask',
      'man mask',
      'god mask',
    ],
    endeavors: [
      {
        id: 'great_golden_cat',
        name: 'Hunt the Great Golden Cat',
        expansion: 'core',
        recipe: {
          items: [
            { resource: 'endeavor', quantity: 1 },
            { gear: 'white_lion_mask', quantity: 1 },
          ],
        },
      },
      {
        id: 'mad_steed',
        name: 'Hunt the Mad Streed',
        expansion: 'core',
        recipe: {
          items: [
            { resource: 'endeavor', quantity: 1 },
            { gear: 'antelope_mask', quantity: 1 },
          ],
        },
      },
      {
        id: 'golden_eyed_king',
        name: 'Hunt the Golden Eyed King',
        expansion: 'core',
        recipe: {
          items: [
            { resource: 'endeavor', quantity: 1 },
            { gear: 'phoenix_mask', quantity: 1 },
          ],
        },
      },
    ],
  },
  exhausted_lantern_hoard: {
    id: 'exhausted_lantern_hoard',
    name: 'Exhausted Lantern Hoard',
    expansion: 'core',
    endeavors: [
      {
        id: 'lantern_research',
        name: 'Lantern Research - Pulse Discoveries',
        expansion: 'core',
        recipe: {
          items: [
            { resource: 'endeavor', quantity: 2 },
            { gear: 'final_lantern', quantity: 1 },
          ],
        },
        description:
          '![book](book)(p. 139) Lantern Research - Pulse Discoveries.',
      },
      {
        id: 'oxidation',
        name: 'Oxidation',
        expansion: 'core',
        recipe: {
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description: '![book](book)(p. 149) Oxidation.',
      },
      {
        id: 'survivors_lantern',
        name: "Survivor's Lantern",
        expansion: 'core',
        recipe: {
          items: [
            { resource: 'endeavor', quantity: 1 },
            { gear: 'final_lantern', quantity: 1 },
          ],
        },
      },
      {
        id: 'investigate',
        name: 'Investigate',
        expansion: 'core',
        recipe: {
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Roll 1d10: 1-2: Unless you have **Legendary Lungs**, you die; 3: Gain 1 random disorder; 4-6: Gain your roll result **Broken Lantern** basic resources; 7-8: Gain 2 **Cocoon Membrane** strange resources; 9+: Gain 1 **Lantern Tube** strange resource.',
      },
    ],
  },
  lantern_hoard: {
    id: 'lantern_hoard',
    name: 'Lantern Hoard',
    expansion: 'core',
    campaigns: { potl: 'potl' },
    endeavors: [
      {
        id: 'innovate',
        name: 'Innovate',
        expansion: 'core',
        recipe: {
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'bone', quantity: 1 },
            { keyword: 'organ', quantity: 1 },
            { keyword: 'hide', quantity: 1 },
          ],
        },
      },
      {
        id: 'shared_experience',
        name: 'Shared Experience',
        expansion: 'core',
        recipe: {
          innovation: 'language',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Nominate a survivor with +2 Hunt XP than yourself. If you are not deaf, gain +1 Hunt XP. If nominated survivor has **shattered jaw**, instead gain +1 insanity.',
      },
      {
        id: 'build_bone_smith',
        name: 'Build - Bone Smith',
        expansion: 'core',
        recipe: {
          not_location: 'bone_smith',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_skinnery',
        name: 'Build - Skinnery',
        expansion: 'core',
        recipe: {
          not_location: 'skinnery',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_organ_grinder',
        name: 'Build - Organ Grinder',
        expansion: 'core',
        recipe: {
          not_location: 'organ_grinder',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  gormchymist: {
    id: 'gormchymist',
    name: 'Gormchymist',
    expansion: 'gorm',
    endeavors: [
      {
        id: 'gormchymist',
        name: 'Get Gormchymy innovation',
        expansion: 'gorm',
        recipe: {
          items: [
            { resource: 'endeavor', quantity: 1 },
            { resource: 'gorm brain', quantity: 1 },
            { keyword: 'strange', quantity: 1 },
          ],
        },
      },
    ],
  },
  gormery: {
    id: 'gormery',
    name: 'Gormery',
    expansion: 'gorm',
    gear: [
      'gorment mask',
      'gorment sleeves',
      'gorment suit',
      'gorment boots',
      'regeneration suit',
      'rib blade',
      'knuckle shield',
      'gaxe',
      'greater gaxe',
      'riot mace',
      'pulse lantern',
      'gorn',
      'armor spikes',
      'acid tooth dagger',
      'black sword',
    ],
  },
  wet_resin_crafter: {
    id: 'wet_resin_crafter',
    name: 'Wet Resin Crafter',
    expansion: 'dbk',
    gear: [
      'dbk errant badge',
      'rainbow wing belt',
      'digging claws',
      'seasoned monster meat',
      'century shoulder pads',
      'scarab circlet',
      'century greaves',
      'elastic harness',
      'the beatle bomb',
    ],
  },
  'silk mill': {
    id: 'silk mill',
    name: 'Silk Mill',
    expansion: 'spidicules',
    gear: [
      'silk turban',
      'silk wraps',
      'silk robes',
      'silk sash',
      'silk boots',
      'amber poleaxe',
      'throwing knife',
      'silk whip',
      'hooded scrap katar',
      'amber edge',
      'body suit',
      'silk bomb',
      'red ring',
      'blue ring',
      'green ring',
    ],
  },
  'the sun': {
    id: 'the sun',
    name: 'The Sun',
    expansion: 'sunstalker',
    campaigns: {
      potsun: 'potsun',
    },
    endeavors: [
      {
        id: 'innovate',
        name: 'Innovate',
        expansion: 'sunstalker',
        recipe: {
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'organ', quantity: 1 },
            { keyword: 'bone', quantity: 1 },
            { keyword: 'hide', quantity: 1 },
          ],
        },
      },
      {
        id: 'build_bone_smith',
        name: 'Build - Bone Smith',
        expansion: 'sunstalker',
        recipe: {
          not_location: 'bone_smith',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_skinnery',
        name: 'Build - Skinnery',
        expansion: 'sunstalker',
        recipe: {
          not_location: 'skinnery',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_organ_grinder',
        name: 'Build - Organ Grinder',
        expansion: 'sunstalker',
        recipe: {
          not_location: 'organ_grinder',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'skyreef sanctuary': {
    id: 'skyreef sanctuary',
    name: 'Skyreef Sanctuary',
    expansion: 'sunstalker',
    gear: [
      'sycloid scale hood',
      'sycloid scale sleeves',
      'sycloid scale jacket',
      'sycloid scale skirt',
      'sycloid scale shoes',
      'sunspot dart',
      'sunshark bow',
      'shanshark arrows',
      'denticle axe',
      'skleaver',
      'ink sword',
      'sunspot lantern',
      'quiver and sunstring',
      'shadow saliva shawl',
      'sun lure and hook',
      'sky harpoon',
      'ink blood bow',
    ],
  },
  'sacred pool': {
    id: 'sacred pool',
    name: 'Sacred Pool',
    expansion: 'sunstalker',
    campaigns: {
      potsun: 'potsun',
    },
    gear: ['sun vestments', 'sunring bow', 'apostle crown', 'prism mace'],
    endeavors: [
      {
        id: 'sacred water',
        name: 'Sacred Water',
        expansion: 'sunstalker',
        recipe: {
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Once per settlement phase: ![book](book)(SUN p.17) **Intimacy**.',
      },
      {
        id: 'purification ceremony',
        name: 'Purification Ceremony',
        expansion: 'sunstalker',
        recipe: {
          items: [{ resource: 'endeavor', quantity: 2 }],
        },
        description:
          'You may endeavor here once per lifetime. Gain **Purified** and **Protective** disorder. Roll 1d10: 1-7: +1 Str or Accu, 8+: +1 any attr. Cannot **depart** this year.',
      },
      {
        id: 'sun sealing',
        name: 'Sun Sealing',
        expansion: 'sunstalker',
        recipe: {
          innovation: 'sauna shrine',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Gain **Hellfire** secret fighting art. Cannot **depart** this year.',
      },
    ],
  },
  throne: {
    id: 'throne',
    name: 'Throne',
    expansion: 'dk',
    campaigns: {
      pots: 'pots',
    },
    endeavors: [
      {
        id: 'innovate',
        name: 'Innovate',
        expansion: 'dk',
        recipe: {
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'bone', quantity: 1 },
            { keyword: 'organ', quantity: 1 },
            { keyword: 'hide', quantity: 1 },
          ],
        },
      },
      {
        id: 'fear and trembling',
        name: 'Fear and Trembling',
        expansion: 'dk',
        recipe: {
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
        description:
          'Once per settlement phase a survivor rolls 1d10: 1-2: Dead; 3-6: Suffer **blind** severe head injury and gain **Scar**; 7-9: Remove all permanent waist injuries; 10+: Dead, gain top card of innovation deck.',
      },
      {
        id: 'build_bone_smith',
        name: 'Build - Bone Smith',
        expansion: 'dk',
        recipe: {
          not_location: 'bone_smith',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_skinnery',
        name: 'Build - Skinnery',
        expansion: 'dk',
        recipe: {
          not_location: 'skinnery',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_organ_grinder',
        name: 'Build - Organ Grinder',
        expansion: 'dk',
        recipe: {
          not_location: 'organ_grinder',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  'dragon armory': {
    id: 'dragon armory',
    name: 'Dragon Armory',
    expansion: 'dk',
    gear: [
      'dragonskull helm',
      'dragon gloves',
      'dragon mantle',
      'dragon belt',
      'dragon boots',
      'dragon chakram',
      'dragon bite bolt',
      'talon knife',
      'nuclear knife',
      'red core',
      'blast shield',
      'shielded quiver',
      'blast sword',
      'nuclear scythe',
      'blue core',
    ],
  },
}
