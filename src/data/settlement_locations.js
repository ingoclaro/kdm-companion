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
          location: 'stone_circle',
          innovation: 'forbidden_dance',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
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
          location: 'weapon_crafter',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'innovate_scrap_smelting',
        name: 'Innovate Scrap Smelting',
        expansion: 'core',
        recipe: {
          location: 'weapon_crafter',
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
          location: 'leather_worker',
          innovation: 'ammonia',
          items: [
            { resource: 'endeavor', quantity: 1 },
            { keyword: 'hide', quantity: 1 },
          ],
        },
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
          location: 'bone_smith',
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
          location: 'barber_surgeon',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
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
          location: 'skinnery',
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
          location: 'organ_grinder',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'stone_noses',
        name: 'Stone Noses',
        expansion: 'core',
        recipe: {
          location: 'organ_grinder',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_stone_circle',
        name: 'Build - Stone Circle',
        expansion: 'core',
        recipe: {
          location: 'organ_grinder',
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
          location: 'mask_maker',
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
          location: 'mask_maker',
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
          location: 'mask_maker',
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
          location: 'exhausted_lantern_hoard',
          items: [
            { resource: 'endeavor', quantity: 2 },
            { gear: 'final_lantern', quantity: 1 },
          ],
        },
      },
      {
        id: 'oxidation',
        name: 'Oxidation',
        expansion: 'core',
        recipe: {
          location: 'exhausted_lantern_hoard',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'survivors_lantern',
        name: "Survivor's Lantern",
        expansion: 'core',
        recipe: {
          location: 'exhausted_lantern_hoard',
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
          location: 'exhausted_lantern_hoard',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
  lantern_hoard: {
    id: 'lantern_hoard',
    name: 'Lantern Hoard',
    expansion: 'core',
    endeavors: [
      {
        id: 'innovate',
        name: 'Innovate',
        expansion: 'core',
        recipe: {
          location: 'lantern_hoard',
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
          location: 'lantern_hoard',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_bone_smith',
        name: 'Build - Bone Smith',
        expansion: 'core',
        recipe: {
          location: 'lantern_hoard',
          not_location: 'bone_smith',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_skinnery',
        name: 'Build - Skinnery',
        expansion: 'core',
        recipe: {
          location: 'lantern_hoard',
          not_location: 'skinnery',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
      {
        id: 'build_organ_grinder',
        name: 'Build - Organ Grinder',
        expansion: 'core',
        recipe: {
          location: 'lantern_hoard',
          not_location: 'organ_grinder',
          items: [{ resource: 'endeavor', quantity: 1 }],
        },
      },
    ],
  },
}
