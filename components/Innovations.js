import React from 'react'
import { Screen, View, Text, Image, Row, Caption } from '@shoutem/ui'
import MultiSelectList from '../components/MultiSelectList'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react/native'

@inject(({ store }) => ({
  //TODO: could this sort be moved to insertion time? probably needs to be moved to the store anyways because needs to be filtered by expansion.
  innovations: store.innovations.values().sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else {
      return 1
    }
  }),
  selectedItems: store.selectedCampaign
    ? store.selectedCampaign.innovations.toJS()
    : {},
  toggle: store.selectedCampaign
    ? store.selectedCampaign.selectInnovation
    : () => null,
}))
@observer
export default class Innovations extends React.Component {
  render() {
    return (
      <MultiSelectList
        name="innovations"
        data={this.props.innovations}
        toggle={this.props.toggle}
        selected={this.props.selectedItems}
      />
    )
  }
}

@inject(({ store }) => ({
  selectedItems: store.selectedCampaign
    ? store.selectedCampaign.innovations.values()
    : [],
}))
@observer
export class InnovationsItems extends React.Component {
  render() {
    return (
      <View>
        <Row>
          {this.props.selectedItems.length > 0 ? (
            <Caption>
              {this.props.selectedItems.map(item => item.name).join(', ')}
            </Caption>
          ) : (
            <Caption>Tap title to add Innovations...</Caption>
          )}
        </Row>
      </View>
    )
  }
}
