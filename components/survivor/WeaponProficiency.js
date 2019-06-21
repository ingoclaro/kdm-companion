import React from 'react'
import { View } from '@shoutem/ui'
import { observer, inject } from 'mobx-react'
import { values } from 'mobx'
import RichText from '../common/RichText'
import PropTypes from 'prop-types'
import R from 'ramda'

@observer
class WeaponProficiency extends React.Component {
  constructor(props) {
    super(props)
    this.weaponProficienciesInnovations = this.weaponProficienciesInnovations.bind(
      this
    )
  }
  static propTypes = {
    survivor: PropTypes.any.isRequired, // survivor object from store.
  }

  weaponProficienciesInnovations() {
    let wpInno = R.filter(
      item => item.id.startsWith('mastery_'),
      this.props.innovations
    )
    let specializations = wpInno.map(inno => {
      let wp = this.props.weaponProficiencies.get(inno.keywords[0]) //TODO: hardcoded to first keyword.
      if (
        this.props.survivor.weaponProficiency &&
        this.props.survivor.weaponProficiency.id === wp.id
      ) {
        return null
      }
      return (
        <RichText key={inno.id}>
          **
          {wp.name} Specialist**: {wp.specialistBonus}
        </RichText>
      )
    })
    return specializations
  }

  render() {
    return (
      <View>
        {this.props.survivor.weaponProficiencyMastery && (
          <RichText>
            **
            {this.props.survivor.weaponProficiency.name} Master**:{' '}
            {this.props.survivor.weaponProficiencyMastery}
          </RichText>
        )}
        {this.props.survivor.weaponProficiencySpecialization && (
          <RichText>
            **
            {this.props.survivor.weaponProficiency.name} Specialist**:{' '}
            {this.props.survivor.weaponProficiencySpecialization}
          </RichText>
        )}
        {this.weaponProficienciesInnovations()}
      </View>
    )
  }
}

export default inject(({ store }) => ({
  innovations: values(store.selectedCampaign.innovations), // to check for wp mastery innovations
  weaponProficiencies: store.weaponProficiencies,
}))(WeaponProficiency)
