import React from 'react'
import {
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Caption,
  DropDownMenu,
} from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import AbilitySection from './AbilitySection'

@inject(({ store }) => ({
  availableFightingArts: store.availableFightingArts,
  availableSecretFightingArts: store.availableSecretFightingArts,
}))
@observer
export default class FightingArts extends React.Component {
  render() {
    return (
      <AbilitySection
        title="Fighting Arts"
        dropdownTitle="Select Fighting Art"
        availableItems={this.props.availableFightingArts}
        additionalDropdownTitle="Select Secret Fighting Art"
        additionalAvailableItems={this.props.availableSecretFightingArts}
        items={this.props.fightingArts}
        addItem={this.props.addFA}
        removeItem={this.props.removeFA}
      />
    )
  }
}
