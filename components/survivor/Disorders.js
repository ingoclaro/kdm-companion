import React from 'react'
import { observer, inject } from 'mobx-react'
import AbilitySection from './AbilitySection'

@observer
class Disorders extends React.Component {
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

export default inject(({ store }) => ({
  availableDisorders: store.availableDisorders,
}))(Disorders)
