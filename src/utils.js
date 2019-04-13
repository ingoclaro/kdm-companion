import R from 'ramda'
import { values } from 'mobx'

export const capitalize = str => str[0].toUpperCase() + str.slice(1)

export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    a => (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)[0]
  )
}

export function expansionFilter(map, expansion) {
  return R.filter(item => item.expansion.id === expansion.id, values(map))
}

/**
 *
 * @param {object} base object to merge data into (eg: getSnapshot(SettlementStat.create()))
 * @param {array} values array of objects with base attributes to merge (eg: values(self.innovations))
 * @param {array} attribute attribute from each values item to pick to merge into the base (eg: ['settlement', 'newborn'] )
 */
export function objectMerge(base, values, attribute) {
  let keys = Object.keys(base)
  let result = values.reduce((merged, item) => {
    if (R.path(attribute, item)) {
      // combine the 2 objects: current accumulated base and the one from the values item.
      return keys.reduce((keysAcc, key) => {
        return {
          ...keysAcc,
          [key]:
            typeof merged[key] === 'string'
              ? R.path(attribute, item)[key].length > 0
                ? merged[key] + R.path(attribute, item)[key] + '\n'
                : merged[key]
              : merged[key] + R.path(attribute, item)[key],
        }
      }, {})
    } else {
      return merged
    }
  }, base)

  return result
}
