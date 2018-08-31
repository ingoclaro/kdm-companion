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

import { MarkdownView } from 'react-native-markdown-view'

import { observer, inject } from 'mobx-react/native'
import PropTypes from 'prop-types'

import AbilityList from './AbilityList'
import AgeMilestone from './AgeMilestone'
import AttributeLarge from './AttributeLarge'
import Disorders from './Disorders'
import EditableProperty from './EditableProperty'
import EditableTextProperty from './EditableTextProperty'
import FightingArts from './FightingArts'
import GenderButton from './GenderButton'

import Note from '../Note'
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

// This is the individual survivor screen
@inject(({ store }, props) => ({
  survivor: store.selectedCampaign.settlement.survivors.get(props.survivorId),
  survivalLimit: store.selectedCampaign.settlement.survivalLimit,
}))
@observer
export default class Survivor extends React.Component {
  static propTypes = {
    survivorId: PropTypes.string.isRequired, // ID of the survivor to show
  }

  ageMilestones = {
    2: { description: '{book} Age', details: <AgeMilestone age={2} /> },
    6: { description: '{book} Age', details: <AgeMilestone age={6} /> },
    10: { description: '{book} Age', details: <AgeMilestone age={10} /> },
    15: { description: '{book} Age', details: <AgeMilestone age={15} /> },
    16: { description: 'Retired' },
  }

  courageMilestones = {
    3: { description: '{book} Bold' },
    9: { description: '{book} See the Truth' },
  }

  understandingMilestones = {
    3: { description: '{book} Insight' },
    9: { description: '{book} White Secret' },
  }

  render() {
    let survivor = this.props.survivor

    if (!survivor) {
      return null
    }

    let survivalHint = `(Survival Limit: ${this.props.survivalLimit})`

    return (
      <View>
        <View styleName="horizontal">
          <Subtitle>Gender:</Subtitle>
          <GenderButton
            gender={survivor.gender}
            changeGender={survivor.changeGender}
          />
        </View>

        <View styleName="horizontal">
          <View styleName="vertical" style={{ flex: 1 }}>
            <AttributeLarge
              label="Movement"
              icon={ico_movement}
              value={survivor.movement}
            />
            <AttributeLarge
              label="Accuracy"
              icon={ico_accuracy}
              value={survivor.accuracy}
            />
            <AttributeLarge
              label="Strength"
              icon={ico_strength}
              value={survivor.strength}
            />
          </View>
          <View styleName="vertical" style={{ flex: 1 }}>
            <AttributeLarge
              label="Evasion"
              icon={ico_evasion}
              value={survivor.evasion}
            />
            <AttributeLarge
              label="Luck"
              icon={ico_luck}
              value={survivor.luck}
            />
            <AttributeLarge
              label="Speed"
              icon={ico_d10}
              value={survivor.speed}
            />
          </View>
        </View>

        <Divider />

        <View style={{ alignItems: 'flex-start' }}>
          <EditableProperty
            label="Insanity"
            minimumValue={0}
            maximumValue={30}
            showLabel={true}
            quantity={survivor.insanity}
            setQuantity={qty => survivor.setAttribute('insanity', qty)}
          />
          <EditableProperty
            label="Survival"
            help={survivalHint}
            minimumValue={0}
            maximumValue={this.props.survivalLimit}
            showLabel={true}
            quantity={survivor.survival}
            setQuantity={qty => survivor.setAttribute('survival', qty)}
          />
          <EditableProperty
            label="Age"
            minimumValue={0}
            maximumValue={16}
            showLabel={true}
            quantity={survivor.age}
            setQuantity={qty => survivor.setAttribute('age', qty)}
            milestones={this.ageMilestones}
          />
          <EditableProperty
            label="Courage"
            minimumValue={0}
            maximumValue={9}
            showLabel={true}
            quantity={survivor.courage}
            setQuantity={qty => survivor.setAttribute('courage', qty)}
            milestones={this.courageMilestones}
          />
          <EditableProperty
            label="Understanding"
            minimumValue={0}
            maximumValue={9}
            showLabel={true}
            quantity={survivor.understanding}
            setQuantity={qty => survivor.setAttribute('understanding', qty)}
            milestones={this.understandingMilestones}
          />
        </View>

        <Divider />

        <FightingArts
          fightingArts={survivor.fightingArts}
          addFA={survivor.addFA}
          removeFA={survivor.removeFA}
        />

        <Divider />

        <Disorders
          disorders={survivor.disorders}
          addDisorder={survivor.addDisorder}
          removeDisorder={survivor.removeDisorder}
        />

        <Divider />

        <View>
          <Title>Abilities</Title>
          <AbilityList
            items={survivor.abilities}
            editable={false}
            showDescription={true}
          />
        </View>
        <Divider />

        <Note
          title="Notes"
          notes={survivor.notes}
          saveNote={survivor.saveNotes}
        />
      </View>
    )
  }
}

const styles = {
  markdown: {
    paragraph: {
      color: colors.grey500,
      marginTop: 0,
      marginBottom: 0,
    },
    listItemBullet: {
      color: colors.grey500,
      minWidth: 0,
      paddingRight: 8,
    },
    listItemUnorderedContent: {
      color: colors.grey500,
    },
    listItemUnorderedContent: {
      flex: -1,
      color: colors.grey500,
    },
    // list: {
    //   margin: 0,
    //   marginLeft: 8,
    // },
  },
}
