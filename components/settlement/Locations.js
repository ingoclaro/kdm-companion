import React from 'react'
import { Screen, View, Text, Image, Row, Caption } from '@shoutem/ui'
import MultiSelectList from '../common/MultiSelectList'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

export default inject(({ store }) => ({
  locations: store.availableLocations,
  selectedItems: store.selectedCampaign.locations.toJS(),
  toggle: store.selectedCampaign.selectLocation,
}))(
  observer(
    class Locations extends React.Component {
      static propTypes = {
        locations: PropTypes.array.isRequired,
        selectedItems: PropTypes.object.isRequired,
        toggle: PropTypes.func.isRequired,
      }

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
  )
)

export const LocationItems = inject(({ store }) => ({
  selectedItems: store.selectedCampaign.locationsList,
}))(
  observer(
    class LocationItems extends React.Component {
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
  )
)
