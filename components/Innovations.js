import React from 'react'
import { Screen, View, Text, Image, Row, Caption } from '@shoutem/ui'
import MultiSelectList from '../components/MultiSelectList'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react/native'
import { getKeys } from '../src/utils'

@inject(({ store }) => ({
  innovations: store.availableInnovations,
  selectedItems: getKeys(store.selectedCampaign.innovations),
  toggle: store.selectedCampaign.selectInnovation,
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
  selectedItems: store.selectedCampaign.innovationsList,
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
