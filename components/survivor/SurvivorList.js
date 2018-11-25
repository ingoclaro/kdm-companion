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
import CheckboxListItem from '../common/CheckboxListItem'

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

const ico_skip_hunt = require('../../images/icon_skip_hunt.png')

@inject(({ store }) => ({
  // survivors: Array.from(store.selectedCampaign.settlement.survivors),
  filterSurvivors: store.selectedCampaign.settlement.filterSurvivors,
}))
@observer
export default class SurvivorList extends React.Component {
  state = {
    selected: 'alive',
  }

  render() {
    const survivors = this.props.filterSurvivors(this.state.selected)

    return (
      <View>
        <View styleName="horizontal space-between">
          <Title>Survivors</Title>
          <CheckboxListItem
            styleName="title"
            onPressItem={() => this.setState({ selected: 'alive' })}
            title="Alive"
            id="alive"
            selected={this.state.selected === 'alive'}
          />
          <CheckboxListItem
            styleName="title"
            onPressItem={() => this.setState({ selected: 'dead' })}
            title="Dead"
            id="dead"
            selected={this.state.selected === 'dead'}
          />
        </View>
        <View>
          {survivors.map((survivor, idx) => {
            let gender_icon = survivor.gender === 'male' ? ico_male : ico_female
            let rowStyle = idx % 2 === 0 ? styles.oddRow : styles.evenRow
            return (
              <View key={survivor.id} style={rowStyle}>
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
                  {survivor.skipNextHunt && (
                    <Image
                      source={ico_skip_hunt}
                      style={{ width: 20, height: 16, marginRight: -12 }}
                    />
                  )}
                  <AttributeSmall text="S" value={survivor.survival} />
                  <AttributeSmall
                    icon={ico_insanity}
                    value={survivor.insanity}
                  />
                  <AttributeSmall
                    icon={ico_movement}
                    label="Movement"
                    value={survivor.movement}
                    hideIfneutral={true}
                  />
                  <AttributeSmall
                    icon={ico_accuracy}
                    value={survivor.accuracy}
                    hideIfneutral={true}
                  />
                  <AttributeSmall
                    icon={ico_strength}
                    value={survivor.strength}
                    hideIfneutral={true}
                  />
                  <AttributeSmall
                    icon={ico_evasion}
                    value={survivor.evasion}
                    hideIfneutral={true}
                  />
                  <AttributeSmall
                    icon={ico_luck}
                    value={survivor.luck}
                    hideIfneutral={true}
                  />
                  <AttributeSmall
                    icon={ico_d10}
                    value={survivor.speed}
                    hideIfneutral={true}
                  />
                </View>
                <Text>
                  {survivor.fightingArts.map(item => item.name).join(', ')}
                </Text>
                <Text>
                  {survivor.disorders.map(item => item.name).join(', ')}
                </Text>
                <Text>
                  {survivor.abilities.map(item => item.name).join(', ')}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = {
  evenRow: {
    backgroundColor: colors.grey900,
  },
  oddRow: {},
}
