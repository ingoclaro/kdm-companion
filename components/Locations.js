import React from 'react'
import { Screen, View, Text, Image, Row, Caption } from '@shoutem/ui'
import { connectStyle } from '@shoutem/theme'
import MultiSelectList from './MultiSelectList'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react/native'

@inject(({ store }) => ({
  //TODO: could this sort be moved to insertion time? probably needs to be moved to the store anyways because needs to be filtered by expansion.
  locations: store.locations.values().sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else {
      return 1
    }
  }),
  selectedItems: store.selectedCampaign
    ? store.selectedCampaign.locations.toJS()
    : {},
  toggle: store.selectedCampaign
    ? store.selectedCampaign.selectLocation
    : () => null,
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
  selectedItems: store.selectedCampaign
    ? store.selectedCampaign.locations.values()
    : [],
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
