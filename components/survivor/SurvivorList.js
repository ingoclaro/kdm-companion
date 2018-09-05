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
import AttributeSmall from './AttributeSmall'

import { observer, inject } from 'mobx-react/native'
import colors from '../../src/colors'

const ico_accuracy = require('../../images/icon_accuracy-24.png')
const ico_d10 = require('../../images/icon_d10-32.png')
const ico_evasion = require('../../images/icon_evasion-32.png')
const ico_female = require('../../images/female-32.png')
const ico_insanity = require('../../images/ico_insanity-32.png')
const ico_luck = require('../../images/icon_luck-24.png')
const ico_male = require('../../images/male-32.png')
const ico_movement = require('../../images/icon_movement-24.png')
const ico_strength = require('../../images/icon_strength-24.png')

@inject(({ store }) => ({
  survivors: Array.from(store.selectedCampaign.settlement.survivors),
}))
@observer
export default class SurvivorList extends React.Component {
  render() {
    if (this.props.survivors.length === 0) {
      return <Text>No survivors</Text>
    }

    return (
      <View>
        <Title>Survivors</Title>
        <View>
          {this.props.survivors.map(item => {
            let survivor = item[1]
            let gender_icon = survivor.gender === 'male' ? ico_male : ico_female

            return (
              <View key={survivor.id}>
                <Button
                  styleName="textual"
                  style={{ alignSelf: 'flex-start' }}
                  onPress={() => this.props.navigate(survivor.id)}
                >
                  <Image
                    source={gender_icon}
                    style={{ width: 14, height: 14, marginRight: 5 }}
                  />
                  <Subtitle>{survivor.name}</Subtitle>
                  <Icon name="right-arrow" />
                </Button>
                <View styleName="horizontal">
                  <AttributeSmall text="S" value={survivor.survival} />
                  <AttributeSmall
                    icon={ico_insanity}
                    value={survivor.insanity}
                  />
                  <AttributeSmall
                    icon={ico_movement}
                    value={survivor.movement}
                  />
                  <AttributeSmall
                    icon={ico_accuracy}
                    value={survivor.accuracy}
                  />
                  <AttributeSmall
                    icon={ico_strength}
                    value={survivor.strength}
                  />
                  <AttributeSmall icon={ico_evasion} value={survivor.evasion} />
                  <AttributeSmall icon={ico_luck} value={survivor.luck} />
                  <AttributeSmall icon={ico_d10} value={survivor.speed} />
                </View>
                <Text>
                  {survivor.fightingArts.map(fa => fa.name).join(', ')}
                </Text>
                <Text>{survivor.disorders.map(fa => fa.name).join(', ')}</Text>
                <Divider styleName="line" />
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
