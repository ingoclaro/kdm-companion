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
  availableDisorders: store.availableDisorders,
}))
@observer
export default class Disorders extends React.Component {
  render() {
    return (
      <AbilitySection
        title="Disorders"
        dropdownTitle="Select Disorder"
        items={this.props.disorders}
        availableItems={this.props.availableDisorders}
        addItem={this.props.addDisorder}
        removeItem={this.props.removeDisorder}
      />
    )
  }
}
