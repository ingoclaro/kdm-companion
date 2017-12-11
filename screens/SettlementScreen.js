import React from 'react'
import { Screen, View, Text } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'
import MultiSelectList from '../components/MultiSelectList'

import R from 'ramda'
import gameData from '../src/data'

class SettlementScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settlement',
  }

  state = {
    selectedLocationItems: [],
    selectedInnovationItems: [],
  }

  styles = this.props.style

  onSelectedItemsChange = key => selectedItems => {
    this.setState({ key: selectedItems })
  }

  render() {
    const locations = gameData.settlement_locations
    const locationList = Object.keys(locations)
      .sort()
      .map(key => {
        return { id: key, title: locations[key].name }
      })

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
      <Screen style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.locations}>
            <View>
              <Text>Locations:</Text>
              <MultiSelectList
                data={locationList}
                onSelectedItemsChange={this.onSelectedItemsChange('selectedLocationItems')}
              />
            </View>
          </View>
          <View style={styles.innovations}>
            <View>
              <Text>Innovations:</Text>
              <MultiSelectList
                data={innovationList}
                onSelectedItemsChange={this.onSelectedItemsChange('selectedInnovationItems')}
              />
            </View>
          </View>
        </View>
      </Screen>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    left: 10,
  },
  locations: {
    flex: 3,
    justifyContent: 'center',
  },
  innovations: {
    flex: 1,
    justifyContent: 'center',
  },
}

export default connectStyle('kdm-companion.SettlementScreen', styles)(SettlementScreen)
