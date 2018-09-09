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
  availableAbilities: store.availableAbilities,
}))
@observer
export default class Abilities extends React.Component {
  render() {
    return (
      <AbilitySection
        title="Abilities & Impairments"
        dropdownTitle="Select Ability/Impairment"
        items={this.props.abilities}
        availableItems={this.props.availableAbilities}
        addItem={this.props.addAbility}
        removeItem={this.props.removeAbility}
        limit={99}
      />
    )
  }
}
