import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'
import MultiSelectList from '../components/MultiSelectList'

import gameData from '../src/data'

class Locations extends React.Component {
  state = {
    selectedItems: [],
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems })
  }

  render() {
    const locations = gameData.settlement_locations
    const locationList = Object.keys(locations)
      .sort()
      .map(key => {
        return { id: key, title: locations[key].name }
      })

    return (
      <MultiSelectList
        data={locationList}
        onSelectedItemsChange={this.onSelectedItemsChange}
      />
    )
  }
}

export default Locations
