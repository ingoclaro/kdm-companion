import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'
import MultiSelectList from '../components/MultiSelectList'

import innovationImage from '../images/innovations.jpg'

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
    let innovations = []
    R.forEachObjIndexed(gear => {
      gear.recipes.forEach(recipe => {
        innovations = innovations.concat(recipe.innovations)
      })
    }, gameData.gear)

    const innovationList = Array.from(new Set(innovations)).map(key => {
      return { id: key, title: key }
    })

    return (
      <View>
        <Image style={styles.image} source={innovationImage} />
        <Text>Innovations</Text>
        <MultiSelectList
          data={innovationList}
          onSelectedItemsChange={this.onSelectedItemsChange}
        />
      </View>
    )
  }
}

const styles = {
  image: {
    width: 100,
    height: 40,
  },
}

export default Innovations
