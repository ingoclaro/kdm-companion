import React from 'react'
import { Screen, View, Text, Image, Row, Caption } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'
import MultiSelectList from './MultiSelectList'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react/native'
import { getKeys } from '../src/utils'

@inject(({ store }) => ({
  locations: store.availableLocations,
  selectedItems: getKeys(store.selectedCampaign.locations),
  toggle: store.selectedCampaign.selectLocation,
}))
@observer
export default class Locations extends React.Component {
  render() {
    return (
      <MultiSelectList
        name="locations"
        data={this.props.locations}
        toggle={this.props.toggle}
        selected={this.props.selectedItems}
      />
    )
  }
}
Locations.wrappedComponent.propTypes = {
  locations: PropTypes.array.isRequired,
  selectedItems: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
}

@inject(({ store }) => ({
  selectedItems: store.selectedCampaign.locationsList,
}))
@observer
export class LocationItems extends React.Component {
  render() {
    return (
      <View>
        <Row>
          {this.props.selectedItems.length > 0 ? (
            <Caption>
              {this.props.selectedItems.map(item => item.name).join(', ')}
            </Caption>
          ) : (
            <Caption>Tap title to add Locations...</Caption>
          )}
        </Row>
      </View>
    )
  }
}
