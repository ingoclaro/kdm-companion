import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'
import MultiSelectList, {
  MultiSelectItems,
} from '../components/MultiSelectList'
import { kea } from 'kea'
import PropTypes from 'prop-types'
import { constants } from '../src/reducers'

class Locations extends React.PureComponent {
  render() {
    const { toggle } = this.actions
    const locationList = Object.keys(this.props.locations || {})
      .sort()
      .map(key => {
        return { id: key, title: this.props.locations[key].name }
      })

    return (
      <MultiSelectList
        name="locations"
        data={locationList}
        toggle={toggle}
        selected={this.props.selectedItems}
      />
    )
  }
}
Locations.propTypes = {
  locations: PropTypes.object.isRequired,
}

const locationLogic = kea({
  connect: {
    props: [state => state, ['settlement_locations as locations']],
  },
  actions: () => ({
    toggleItem: id => ({ id }),
  }),
  reducers: ({ actions }) => ({
    selectedItems: [
      {},
      PropTypes.object,
      {
        [actions.toggleItem]: (state, payload) => {
          return { ...state, [payload.id]: !state[payload.id] }
        },
      },
    ],
  }),
  thunks: ({ actions, get, fetch, dispatch, getState }) => ({
    toggle: location => {
      let selectedItems = get('selectedItems')
      let isSelected = selectedItems[location.id]
      let action = isSelected ? constants.REMOVE_DATA : constants.ADD_DATA
      let state = getState()
      let hasExpand =
        state.settlement_locations[location.id] &&
        state.settlement_locations[location.id]['expand']

      if (hasExpand) {
        dispatch({
          type: action,
          payload: state.settlement_locations[location.id]['expand'],
        })
      }

      actions.toggleItem(location.id)
    },
  }),
})

const connectedLocations = locationLogic(Locations)

class LocationItems extends React.Component {
  render() {
    return (
      <MultiSelectItems
        name="locations"
        emptyText="Tap title to add Locations..."
        items={this.props.selectedItems}
      />
    )
  }
}

const itemsLogic = kea({
  connect: {
    props: [locationLogic, ['selectedItems']],
  },
})
const connectedLocationItems = itemsLogic(LocationItems)

export default connectedLocations
export { connectedLocationItems as LocationItems, locationLogic }
