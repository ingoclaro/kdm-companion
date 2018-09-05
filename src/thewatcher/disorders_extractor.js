// imports data from the watcher for fighting arts

const fetch = require('node-fetch')
const R = require('ramda')

// structure:
// {
//   "absent_seizures": {
//     "survivor_effect": "The first time you would suffer a brain trauma each showdown, you are instead knocked down and forget a fighting art (erase it).",
//     "selector_text": "Absent Seizures (Gorm)",
//     "handle": "absent_seizures",
//     "name": "Absent Seizures",
//     "expansion": "gorm",
//     "flavor_text": "No one knows where your mind goes when you're gone, not even you.",
//     "type_pretty": "Disorders",
//     "type": "disorders",
//     "sub_type": "expansion_disorders",
//     "sub_type_pretty": "Expansion Disorders"
//   },
//   ...

const url = 'https://api.thewatcher.io/game_asset/disorder'

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
    .replace('<font class="kdm_font">c</font>', '{movement}')
    .replace('<font class="kdm_font">a</font>', '{action}')
    .replace('<font id="Dormenatus">&#x02588;</font>', '{green square}')
    .replace('<font id="Caratosis">&#x02588;</font>', '{red square}')
    .replace('<font class="inline_shield">1</font>', '{shield 1}')
    .replace('<font class="kdm_font">g</font>', '{book}')
}

function extract(data) {
  let disorders = {}

  R.forEachObjIndexed((value, key) => {
    let name = value.name

    let item = {
      id: name,
      name: name,
      expansion: map_expansion(value.expansion),
      description: map_description(value.survivor_effect),
    }
    if (item.expansion === undefined) {
      return
    }

    disorders[name] = item
  }, data)

  console.log(disorders)
}

fetch(url)
  .then(res => res.json())
  .then(json => extract(json))
