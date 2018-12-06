import React from 'react'
import { Image } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'

@inject(({ store }, props) => ({
  survivor:
    store.selectedCampaign.settlement.activeSurvivorsList[props.position],
}))
@observer
export default class SurvivorMenuIcon extends React.Component {
  render() {
    let image =
      this.props.survivor.gender === 'male'
        ? require('../images/default_avatar_male.png')
        : require('../images/default_avatar_female.png')
    let opacity = this.props.focused ? 0.7 : 0.4
    return (
      <Image
        source={image}
        style={{
          width: 28,
          height: 28,
        }}
        resizeMode="contain"
        tintColor={this.props.color}
        opacity={opacity}
      />
    )
  }
}
