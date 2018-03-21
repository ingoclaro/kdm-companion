import React from 'react'
import { View, Text, Row, Title, Subtitle, ListView } from '@shoutem/ui'
import { values } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import PropTypes from 'prop-types'
import colors from '../src/colors'
import R from 'ramda'

const filter_locations = locations => {
  return R.filter(el => {
    let loc = R.path(['recipe', 'not_location'], el)
    return !locations[loc]
  })
}

@inject(({ store }) => ({
  data: R.filter(endeavor => {
    if (endeavor.recipe.not_location) {
      return !store.selectedCampaign.locations.has(endeavor.recipe.not_location)
    }
    if (endeavor.recipe.not_innovation) {
      return !store.selectedCampaign.innovations.has(
        endeavor.recipe.not_innovation.id
      )
    }
    return true
  }, values(store.selectedCampaign.endeavors)),
  locations: store.locations,
}))
@observer
export default class Endeavors extends React.Component {
  constructor(props) {
    super(props)
    this._row = this._row.bind(this)
  }

  _header() {
    return <Title>Endeavors</Title>
  }

  _row(item) {
    let source
    if (item.recipe.location) {
      source = `(${this.props.locations.get(item.recipe.location).name})`
    } else if (item.recipe.innovation) {
      source = `(${item.recipe.innovation.name})`
    }
    return (
      <View style={styles.endeavor}>
        <Subtitle>
          {item.name} {source}
        </Subtitle>
        <Text style={styles.recipe}>
          {item.recipe.items
            .map(item => {
              return `${item.quantity} x ${item.name}`
            })
            .join(', ')}
        </Text>
      </View>
    )
  }

  empty() {
    return (
      <View>
        <Title>Endeavors</Title>
        <Text>Add some Locations or Innovations to see Endeavors.</Text>
      </View>
    )
  }

  render() {
    if (this.props.data.length === 0) {
      return this.empty()
    }

    return (
      <ListView
        data={this.props.data}
        renderRow={this._row}
        renderHeader={this._header}
        autoHideHeader={false}
      />
    )
  }
}

const styles = {
  recipe: {
    color: colors.grey500,
  },
  endeavor: {
    paddingVertical: 3,
  },
}
