import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'
import MultiSelectList, {
  MultiSelectItems,
} from '../components/MultiSelectList'
import { kea } from 'kea'
import PropTypes from 'prop-types'

class Locations extends React.PureComponent {
  render() {
    console.log('props', this.props)
    const locationList = Object.keys(this.props.locations || {})
      .sort()
      .map(key => {
        return { id: key, title: this.props.locations[key].name }
      })

    return <MultiSelectList name="locations" data={locationList} />
  }
}
Locations.propTypes = {
  locations: PropTypes.object.isRequired,
}

// get props from the store
const connectedLocations = kea({
  connect: {
    props: [state => state, ['settlement_locations as locations']],
  },
})(Locations)

class LocationItems extends React.Component {
  render() {
    return (
      <MultiSelectItems
        name="locations"
        emptyText="Tap title to add Locations..."
      />
    )
  }
}

export default connectedLocations
export { LocationItems }
