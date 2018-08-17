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
}))
@observer
export default class FightingArts extends React.Component {
  render() {
    console.log('this.props.fightingArts', this.props.fightingArts)
    return (
      <AbilitySection
        title="Fighting Arts"
        dropdownTitle="Select Fighting Art"
        items={this.props.fightingArts}
        availableItems={this.props.availableFightingArts}
        addItem={this.props.addFA}
        removeItem={this.props.removeFA}
      />
    )
  }
}
