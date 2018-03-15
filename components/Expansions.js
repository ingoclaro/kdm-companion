import React from 'react'
import { Screen, View, Text, Image, Row, Caption } from '@shoutem/ui'
import MultiSelectList from '../components/MultiSelectList'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react/native'

@inject(({ store }) => ({
  //TODO: could this sort be moved to insertion time? probably needs to be moved to the store anyways because needs to be filtered by expansion.
  expansions: store.expansions.values(),
  selectedItems: store.selectedCampaign.expansions.toJS(),
  toggle: store.selectedCampaign.selectExpansion,
}))
@observer
export default class Expansions extends React.Component {
  render() {
    return (
      <MultiSelectList
        name="expansions"
        data={this.props.expansions}
        toggle={this.props.toggle}
        selected={this.props.selectedItems}
      />
    )
  }
}
