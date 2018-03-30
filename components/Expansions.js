import React from 'react'
import { Screen, View, Text, Image, Row, Caption } from '@shoutem/ui'
import MultiSelectList from '../components/MultiSelectList'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react/native'
import { values } from 'mobx'

@inject(({ store }) => ({
  expansions: values(store.expansions),
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
