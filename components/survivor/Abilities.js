import React from 'react'
import { observer, inject } from 'mobx-react'
import AbilitySection from './AbilitySection'

@observer
class Abilities extends React.Component {
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
        disabled={this.props.disabled}
      />
    )
  }
}

export default inject(({ store }) => ({
  availableAbilities: store.availableAbilities,
}))(Abilities)
