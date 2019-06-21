import React from 'react'
import { observer, inject } from 'mobx-react'
import AbilitySection from './AbilitySection'

@observer
class FightingArts extends React.Component {
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
        disabled={this.props.disabled}
      />
    )
  }
}

export default inject(({ store }) => ({
  availableFightingArts: store.availableFightingArts,
  availableSecretFightingArts: store.availableSecretFightingArts,
}))(FightingArts)
