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

import { observer, inject } from 'mobx-react/native'
import colors from '../../src/colors'

const ico_movement = require('../../images/icon_movement-24.png')
const ico_accuracy = require('../../images/icon_accuracy-24.png')
const ico_strength = require('../../images/icon_strength-24.png')
const ico_evasion = require('../../images/icon_evasion-32.png')
const ico_luck = require('../../images/icon_luck-24.png')
const ico_d10 = require('../../images/icon_d10-32.png')
const ico_insanity = require('../../images/ico_insanity-32.png')
const ico_male = require('../../images/male-32.png')
const ico_female = require('../../images/female-32.png')

class Attribute extends React.Component {
  render() {
    let styleName =
      this.props.value < 0 ? 'attributeTextNegative' : 'attributeText'
    return (
      <View styleName="horizontal" style={styles.attributeContainer}>
        <Text style={styles[styleName]}>{this.props.value}</Text>
        <Image source={this.props.icon} style={{ width: 16, height: 16 }} />
      </View>
    )
  }
}

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
                <View
                  styleName="horizontal"
                  style={
                    {
                      // justifyContent: 'space-between',
                    }
                  }
                >
                  <View
                    styleName="horizontal"
                    style={styles.attributeContainer}
                  >
                    <Text style={styles.attributeText}>
                      {survivor.survival}
                    </Text>
                    <Text>S</Text>
                  </View>

                  <Attribute icon={ico_insanity} value={survivor.insanity} />
                  <Attribute icon={ico_movement} value={survivor.movement} />
                  <Attribute icon={ico_accuracy} value={survivor.accuracy} />
                  <Attribute icon={ico_strength} value={survivor.strength} />
                  <Attribute icon={ico_evasion} value={survivor.evasion} />
                  <Attribute icon={ico_luck} value={survivor.luck} />
                  <Attribute icon={ico_d10} value={survivor.speed} />
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

const styles = {
  attributeText: {
    paddingRight: 2,
  },
  attributeTextNegative: {
    paddingRight: 2,
    color: colors.red800,
  },
  attributeContainer: {
    justifyContent: 'flex-end',
    marginHorizontal: 3,
    width: 34,
  },
}
