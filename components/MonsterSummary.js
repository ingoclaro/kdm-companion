import React from 'react'
import {
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Row,
  Caption,
  Divider,
} from '@shoutem/ui'
import AttributeSmall from './survivor/AttributeSmall'

import { observer, inject } from 'mobx-react/native'
import colors from '../src/colors'

const ico_movement = require('../images/icon_movement-24.png')
const ico_toughness = require('../images/icon_shield-reflect-24.png')
const ico_d10 = require('../images/icon_d10-32.png')
const ico_damage = require('../images/icon_wound-24.png')
const ico_accuracy = require('../images/icon_accuracy-24.png')
const ico_luck = require('../images/icon_luck-24.png')
const ico_evasion = require('../images/icon_evasion-32.png')
const ico_heart = require('../images/icon_heart-24.png')

// TODO: need to store temp stats and show those instead, when selecting new monster temp stats should be reset. Although all that could be a later phase and use this just as starting stats (manage actual changing stats with tokens in game)
@inject(({ store }) => ({
  monsterLevel: store.selectedCampaign.showdownMonsterLevel,
}))
@observer
export default class MonsterSummary extends React.Component {
  render() {
    if (!this.props.monsterLevel) {
      return null
    }
    return (
      <View>
        <View styleName="horizontal">
          <AttributeSmall
            icon={ico_movement}
            label="Movement"
            value={this.props.monsterLevel.movement}
          />
          <AttributeSmall
            icon={ico_toughness}
            value={this.props.monsterLevel.toughness}
          />
          <AttributeSmall
            icon={ico_d10}
            value={this.props.monsterLevel.speed}
            hideIfneutral={true}
          />
          <AttributeSmall
            icon={ico_damage}
            value={this.props.monsterLevel.damage}
            hideIfneutral={true}
          />
          <AttributeSmall
            icon={ico_accuracy}
            value={this.props.monsterLevel.accuracy}
            hideIfneutral={true}
          />
          <AttributeSmall
            icon={ico_evasion}
            value={this.props.monsterLevel.evasion}
            hideIfneutral={true}
          />
          <AttributeSmall
            icon={ico_luck}
            value={this.props.monsterLevel.luck}
            hideIfneutral={true}
          />
          <AttributeSmall
            icon={ico_heart}
            value={this.props.monsterLevel.life}
            hideIfneutral={true}
          />
        </View>
      </View>
    )
  }
}
