import React from 'react'
import { View } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import { values } from 'mobx'
import CheckboxListItem from './common/CheckboxListItem'
import LockedCheckboxListItem from './common/LockedCheckboxListItem'

import colors from '../src/colors'

@inject(({ store }) => ({
  campaign: store.selectedCampaign,
  subscription: store.subscription,
}))
@observer
export default class Expansions extends React.Component {
  constructor(props) {
    super(props)
  }

  selectCampaign = id => {
    if (id === 'potl' || this.props.subscription.hasActiveSubscription()) {
      this.props.campaign.setCampaignType(id)
    } else {
      this.props.subscribe()
    }
  }

  render() {
    let Checkbox
    if (this.props.subscription.hasActiveSubscription()) {
      Checkbox = CheckboxListItem
    } else {
      Checkbox = LockedCheckboxListItem
    }
    return (
      <View>
        <CheckboxListItem
          styleName="title"
          onPressItem={() => this.selectCampaign('potl')}
          title="People of the Lantern (Core)"
          id="core"
          selected={this.props.campaign.type.id === 'potl'}
        />
        <Checkbox
          styleName="title"
          onPressItem={() => this.selectCampaign('pots')}
          title="People of the Stars (Dragon King)"
          id="pots"
          selected={this.props.campaign.type.id === 'pots'}
        />
        <Checkbox
          styleName="title"
          onPressItem={() => this.selectCampaign('potsun')}
          title="People of the Sun (Sunstalker)"
          id="potsun"
          selected={this.props.campaign.type.id === 'potsun'}
        />
      </View>
    )
  }
}

const styles = {}
