import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'
import MultiSelectList from '../components/MultiSelectList'

import R from 'ramda'
import gameData from '../src/data'

class Innovations extends React.Component {
  state = {
    selectedItems: [],
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems })
  }

  render() {
    let innovations = new Set()
    R.forEachObjIndexed(gear => {
      gear.recipes.forEach(recipe => {
        recipe.innovations.forEach(innovation => {
          innovations.add(innovation)
        })
      })
    }, gameData.gear)

    const innovationList = Array.from(innovations).map(key => {
      return { id: key, title: key }
    })

    return (
      <MultiSelectList
        data={innovationList}
        onSelectedItemsChange={this.onSelectedItemsChange}
      />
    )
  }
}

export default Innovations
