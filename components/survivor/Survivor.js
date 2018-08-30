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

import GenderButton from './GenderButton'
import EditableProperty from './EditableProperty'
import FightingArts from './FightingArts'
import Disorders from './Disorders'
import EditableTextProperty from './EditableTextProperty'
import AbilityList from './AbilityList'
import Note from '../Note'
import AgeMilestone from './AgeMilestone'

import colors from '../../src/colors'
const ico_movement = require('../../images/icon_movement-24.png')
const ico_accuracy = require('../../images/icon_accuracy-24.png')
const ico_strength = require('../../images/icon_strength-24.png')
const ico_evasion = require('../../images/icon_evasion-32.png')
const ico_luck = require('../../images/icon_luck-24.png')
const ico_d10 = require('../../images/icon_d10-32.png')
const ico_insanity = require('../../images/ico_insanity-32.png')

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

    let survivalHint = `(Limit: ${this.props.survivalLimit})`

    return (
      <View>
        <View styleName="horizontal">
          <EditableTextProperty
            label="Name"
            showLabel={true}
            text={survivor.name}
            setText={name => survivor.setAttribute('name', name)}
          />
          <GenderButton
            gender={survivor.gender}
            changeGender={survivor.changeGender}
          />
        </View>
        <View styleName="horizontal">
          <EditableProperty
            label="Movement"
            icon={ico_movement}
            quantity={survivor.movement}
            minimumValue={1}
            setQuantity={qty => survivor.setAttribute('movement', qty)}
          />
          <EditableProperty
            label="Accuracy"
            icon={ico_accuracy}
            quantity={survivor.accuracy}
            setQuantity={qty => survivor.setAttribute('accuracy', qty)}
          />
          <EditableProperty
            label="Strength"
            icon={ico_strength}
            quantity={survivor.strength}
            setQuantity={qty => survivor.setAttribute('strength', qty)}
          />

          <EditableProperty
            label="Evasion"
            icon={ico_evasion}
            quantity={survivor.evasion}
            setQuantity={qty => survivor.setAttribute('evasion', qty)}
          />
          <EditableProperty
            label="Luck"
            icon={ico_luck}
            quantity={survivor.luck}
            setQuantity={qty => survivor.setAttribute('luck', qty)}
          />
          <EditableProperty
            label="Speed"
            icon={ico_d10}
            quantity={survivor.speed}
            setQuantity={qty => survivor.setAttribute('speed', qty)}
          />
          <EditableProperty
            label="Insanity"
            icon={ico_insanity}
            quantity={survivor.insanity}
            maximumValue={50}
            minimumValue={0}
            setQuantity={qty => survivor.setAttribute('insanity', qty)}
          />
        </View>

        <Divider />

        <View style={{ alignItems: 'flex-start' }}>
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
