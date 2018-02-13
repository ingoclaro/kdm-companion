import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'
import MultiSelectList, {
  MultiSelectItems,
} from '../components/MultiSelectList'
import { kea } from 'kea'
import PropTypes from 'prop-types'

import R from 'ramda'

class Innovations extends React.Component {
  render() {
    let innovations = new Set()
    R.forEachObjIndexed(gear => {
      gear.recipes.forEach(recipe => {
        recipe.innovations.forEach(innovation => {
          innovations.add(innovation)
        })
      })
    }, this.props.gear)

    const innovationList = Array.from(innovations).map(key => {
      return { id: key, title: key }
    })

    return <MultiSelectList name="innovations" data={innovationList} />
  }
}
Innovations.propTypes = {
  gear: PropTypes.object.isRequired,
}

// get props from the store
const connectedInnovations = kea({
  connect: {
    props: [state => state, ['gear']],
  },
})(Innovations)

class InnovationsItems extends React.Component {
  render() {
    return (
      <MultiSelectItems
        name="innovations"
        emptyText="Tap title to add Innovations..."
      />
    )
  }
}

export default connectedInnovations
export { InnovationsItems }
