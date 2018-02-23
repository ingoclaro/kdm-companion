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

    return (
      <MultiSelectList
        name="locations"
        data={this.props.locationList}
        toggle={toggle}
        selected={this.props.selectedItems}
      />
    )
  }
}
Locations.propTypes = {
  locationList: PropTypes.array.isRequired,
}

const locationLogic = kea({
  path: () => ['scenes', 'locations'],
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
  selectors: ({ selectors }) => ({
    locationList: [
      () => [selectors.locations],
      locations => {
        return Object.keys(locations || {})
          .sort()
          .map(key => {
            return { id: key, title: locations[key].name }
          })
      },
      PropTypes.array,
    ],
  }),
})

const connectedLocations = locationLogic(Locations)

class LocationItems extends React.Component {
  render() {
    return (
      <MultiSelectItems
        name="locations"
        emptyText="Tap title to add Locations..."
        selectedItems={this.props.selectedItems}
        items={this.props.locations}
      />
    )
  }
}

const itemsLogic = kea({
  connect: {
    props: [
      state => state,
      ['settlement_locations as locations'],
      locationLogic,
      ['selectedItems'],
    ],
  },
})
const connectedLocationItems = itemsLogic(LocationItems)

export default connectedLocations
export { connectedLocationItems as LocationItems, locationLogic }
