// imports data from the watcher for fighting arts

const fetch = require('node-fetch')
const R = require('ramda')

// structure:
// {
//   "abyssal_sadist": {
//     "selector_text": "Abyssal Sadist (Manhunter)",
//     "handle": "abyssal_sadist",
//     "name": "Abyssal Sadist",
//     "epithet": "sadist",
//     "expansion": "manhunter",
//     "type_pretty": "Fighting Arts",
//     "sub_type_pretty": "Fighting Art",
//     "type": "fighting_arts",
//     "sub_type": "fighting_art",
//     "desc": "The first time you wound the monster each attack, gain +1 survival and +1 insanity.<br/>Ignore the effects of the <b>Fear of the Dark</b> and <b>Prey</b> disorders."
//   },
//   ...
//

const url = 'https://api.thewatcher.io/game_asset/fighting_art'

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
    .replace('<font class="inline_shield">1</font>', '{shield 1}')
    .replace('<font class="kdm_font">g</font>', '![book](book)')
}

function extract(data) {
  let fa = {}
  let sfa = {}

  R.forEachObjIndexed((value, key) => {
    let name = value.name.replace('Ambidexterous', 'Ambidextrous')

    let item = {
      id: name,
      name: name,
      expansion: map_expansion(value.expansion),
      description: map_description(value.desc),
    }
    if (item.expansion === undefined) {
      return
    }

    if (value.sub_type === 'fighting_art') {
      fa[name] = item
    } else if (value.sub_type === 'secret_fighting_art') {
      sfa[name] = item
    }
  }, data)

  console.log(sfa)
}

fetch(url)
  .then(res => res.json())
  .then(json => extract(json))
