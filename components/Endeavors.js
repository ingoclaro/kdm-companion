import React from 'react'
import { View, Text, Row, Title, Subtitle } from '@shoutem/ui'
import { kea } from 'kea'
import PropTypes from 'prop-types'

class Endeavors extends React.Component {
  render() {
    const endeavorsList = Array.from(
      Object.entries(this.props.endeavors),
      v => ({ id: v[0], name: v[1].name, recipe: v[1].recipe })
    )

    const elements = endeavorsList.map(endeavor => {
      let recipeText = Object.entries(endeavor.recipe.resources)
        .map(item => `${item[1]} x ${item[0]}`)
        .join(', ')

      return (
        <View key={endeavor.id}>
          <Subtitle>{endeavor.name}</Subtitle>
          <Text>{recipeText}</Text>
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
  endeavors: PropTypes.object.isRequired,
  settlement_locations: PropTypes.object.isRequired,
}

// get props from the store
const connectedEndeavors = kea({
  path: () => ['endeavors'],
  connect: {
    props: [state => state, ['settlement_locations']],
  },
  reducers: ({ actions }) => ({
    endeavors: [
      {},
      PropTypes.object,
      {
        // [constants.ADD_DATA]: (state, payload) => {
        //   return state
        // }
      },
    ],
  }),
})(Endeavors)

export default connectedEndeavors
