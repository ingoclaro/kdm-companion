import React from 'react'
import { View, Text, Row, Title, Subtitle } from '@shoutem/ui'
import { kea } from 'kea'
import PropTypes from 'prop-types'
import { constants } from '../src/reducers'
import colors from '../src/colors'
import { locationLogic } from './Locations'
import R from 'ramda'

class Endeavors extends React.Component {
  render() {
    const endeavorsList = Array.from(
      Object.entries(this.props.validEndeavors),
      v => ({ id: v[0], name: v[1].name, recipe: v[1].recipe })
    )

    const elements = endeavorsList.map(endeavor => {
      let recipeText = Object.entries(endeavor.recipe.resources)
        .map(item => `${item[1]} x ${item[0]}`)
        .join(', ')

      let source = 'custom'
      if (endeavor.recipe.innovation) {
        source = this.props.innovations[endeavor.recipe.innovation].name
      }
      if (endeavor.recipe.location) {
        source = this.props.settlement_locations[endeavor.recipe.location].name
      }

      return (
        <View key={endeavor.id} style={styles.endeavor}>
          <Subtitle>
            {endeavor.name} ({source})
          </Subtitle>
          <Text style={styles.recipe}>{recipeText}</Text>
        </View>
      )
    })

    return (
      <View>
        <Title>Endeavors</Title>
        {elements}
      </View>
    )
  }
}
Endeavors.propTypes = {
  validEndeavors: PropTypes.object.isRequired,
  settlement_locations: PropTypes.object.isRequired,
}

// get props from the store
const connectedEndeavors = kea({
  connect: {
    props: [
      state => state,
      ['settlement_locations', 'innovations'],
      locationLogic,
      ['selectedItems as selectedLocations'],
    ],
  },
  reducers: ({ actions }) => ({
    endeavors: [
      {},
      PropTypes.object,
      {
        [constants.ADD_DATA]: (state, payload) => {
          return Object.assign({}, state, payload.endeavors)
        },
        [constants.REMOVE_DATA]: (state, payload) => {
          let next = Object.assign({}, state)
          Object.keys(payload.endeavors).forEach(key => delete next[key])
          return next
        },
      },
    ],
  }),
  selectors: ({ selectors }) => ({
    validEndeavors: [
      () => [selectors.endeavors, selectors.selectedLocations],
      (endeavors, selectedLocations) => {
        return R.filter(endeavor => {
          if (
            // filter out build endeavors when the building alredy exists
            endeavor.recipe.not_location &&
            selectedLocations[endeavor.recipe.not_location]
          ) {
            return false
          }
          return true
        })(endeavors)
      },
      PropTypes.object,
    ],
  }),
})(Endeavors)

const styles = {
  recipe: {
    color: colors.grey500,
  },
  endeavor: {
    paddingVertical: 3,
  },
}

export default connectedEndeavors
