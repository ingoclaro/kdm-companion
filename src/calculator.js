import R from 'ramda'

export function get_buildable_gear(owned_resources, locations, innovations, data) {
  let buildable = []
  R.forEachObjIndexed( (gear, gear_key) => {
    gear.recipes.forEach(recipe => {
      if(!locations.includes(recipe.location)) {
        return;
      }
      if(!R.equals(recipe.innovations, R.intersection(recipe.innovations, innovations))) {
        return;
      }

      let build_left = substract(recipe.resources, owned_resources)
      if(total_count(build_left) === 0) {
        buildable.push(gear_key)
      } else {
        // this needs some generic resources
        let resources_left = substract(owned_resources, recipe.resources)

        let keywords_list = get_keywords_count(resources_left, data)
        build_left = substract(build_left, keywords_list)
        if(total_count(build_left) === 0) {
          buildable.push(gear_key)
        }
      }
    })
  },
  data.gear)

  return buildable
}

function total_count(items){
  let total = 0
  Object.keys(items).forEach( key => total += items[key])
  return total
}

//TODO: handle resources with multiple keywords. are those counted twice or just once, which implies an array or counts as a result?
export function get_keywords_count(resources, data) {
  let keywords_count = {}

  R.forEachObjIndexed( (count, resource) => {
    if(!data.resources[resource]) {
      // console.log('not found: ', resource)
      keywords_count[resource] = keywords_count[resource] ? keywords_count[resource] + count : count
    } else {
      keywords_count[data.resources[resource].keywords[0]] = count //TODO: fix this to handle multiple keywords
    }
  })(resources)

  return keywords_count
}

// substract object counts like {a:2, b:1} - {a:1} = {a:1, b:1}
export function substract(a, b) {
  return R.mapObjIndexed( (value, key) => {
    if(b[key]) {
      return Math.max(value - b[key], 0)
    } else {
      return value
    }
  }, a)
}
