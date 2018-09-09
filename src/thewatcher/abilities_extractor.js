// imports data from the watcher for fighting arts

const fetch = require('node-fetch')
const R = require('ramda')

// structure:
// {
//   "acid_palms_dk": {
//     "selector_text": "Acid Palms (Dragon King)",
//     "handle": "acid_palms_dk",
//     "name": "Acid Palms",
//     "max": 1,
//     "expansion": "dragon_king",
//     "type_pretty": "Abilities And Impairments",
//     "sub_type_pretty": "Ability",
//     "type": "abilities_and_impairments",
//     "sub_type": "ability",
//     "desc": "Add 1d10 strength to your wound attempts when attacking with Fist & Tooth."
//   },
//   ...

const url = 'https://api.thewatcher.io/game_asset/abilities_and_impairments'

function map_expansion(thewatcher_expansion) {
  const map = {
    dragon_king: 'dk',
    dung_beetle_knight: 'dbk',
    // echoes_of_death: 'eod',
    flower_knight: 'fk',
    gorm: 'gorm',
    lion_god: 'lg',
    lion_knight: 'lk',
    manhunter: 'manhunter',
    // percival: 'percival',
    slenderman: 'slenderman',
    spidicules: 'spidicules',
    sunstalker: 'sunstalker',
  }

  if (!thewatcher_expansion) {
    return 'core'
  } else {
    return map[thewatcher_expansion]
  }
}

function map_description(desc) {
  return desc
    .replace(/<br\/>/gi, ' ')
    .replace(/<b>([^<]+)<[\/]?b>/gi, (match, bold) => {
      return `**${bold}**`
    })
    .replace(/<i>([^<]+)<[\/]?i>/gi, (match, italic) => {
      return `*${italic}*`
    })
    .replace(/<font class="kd_pink_font">([^<]+)<\/font>/gi, (match, text) => {
      return `**${text}**`
    })
    .replace('<font class="kdm_font">c</font>', '![movement](movement)')
    .replace('<font class="kdm_font">a</font>', '![action](action)')
    .replace('<font id="Dormenatus">&#x02588;</font>', '{green square}')
    .replace('<font id="Caratosis">&#x02588;</font>', '{red square}')
    .replace('<font class="inline_shield">1</font>', '![1](shield)')
    .replace('<font class="kdm_font">g</font>', '![book](book)')
}

function extract(data) {
  let abilities = {}

  R.forEachObjIndexed((value, key) => {
    if (
      value.sub_type !== 'ability' &&
      value.sub_type !== 'impairment' &&
      value.sub_type !== 'curse'
    ) {
      return
    }

    let name = value.name

    let item = {
      id: name,
      name: name,
      expansion: map_expansion(value.expansion),
      description: map_description(value.desc),
    }
    if (item.expansion === undefined) {
      return
    }

    abilities[name] = item
  }, data)

  console.log(abilities)
}

fetch(url)
  .then(res => res.json())
  .then(json => extract(json))
