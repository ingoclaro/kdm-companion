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
import PropTypes from 'prop-types'

import { ageMilestones } from './AgeMilestone'
import { courageMilestones } from './CourageMilestone'
import Abilities from './Abilities'
import AbilityList from './AbilityList'
import AttributeLarge from './AttributeLarge'
import Disorders from './Disorders'
import EditableProperty from './EditableProperty'
import EditableTextProperty from './EditableTextProperty'
import FightingArts from './FightingArts'
import GenderButton from './GenderButton'
import Note from '../common/Note'
import WeaponProficiency from './WeaponProficiency'
import Tooltip from '../common/Tooltip'
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
const ico_death = require('../../images/icon_death.png')

// This is the individual survivor screen
@inject(({ store }, props) => ({
  survivor: store.selectedCampaign.settlement.survivors.get(props.survivorId),
  survivalLimit: store.selectedCampaign.settlement.survivalLimit,
  showTooltip: store.selectedCampaign.settlement.survivors.size === 1,
}))
@observer
export default class Survivor extends React.Component {
  static propTypes = {
    survivorId: PropTypes.string.isRequired, // ID of the survivor to show
  }

  //TODO: move this to it's own class after resolving for CourageMilestone
  understandingMilestones = {
    3: { description: '![book](book) Insight (p.131)' },
    9: { description: '![book](book) White Secret (p.181)' },
  }

  weaponProficiencyMilestones = {
    3: { description: 'Specialist' },
    8: { description: 'Master' },
  }

  state = {
    toolTipVisible: true,
  }

  render() {
    let survivor = this.props.survivor

    if (!survivor) {
      return null
    }

    let gender_icon = survivor.gender === 'male' ? ico_male : ico_female

    return (
      <View>
        <View styleName="horizontal v-center">
          <Subtitle>Gender:</Subtitle>
          <Image
            source={gender_icon}
            style={{ width: 14, height: 14, marginLeft: 5 }}
          />
          {survivor.status === 'dead' ? (
            <Image
              source={ico_death}
              style={{ width: 14, height: 16, marginLeft: 10 }}
            />
          ) : null}
        </View>

        <View styleName="horizontal">
          <View style={{ flex: 1 }}>
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
          <View style={{ flex: 1 }}>
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

        <View>
          <View styleName="horizontal v-center">
            <EditableProperty
              label="Insanity"
              minimumValue={0}
              maximumValue={30}
              showLabel={true}
              quantity={survivor.insanity}
              setQuantity={qty => {
                survivor.setAttribute('insanity', qty)
                this.setState({ toolTipVisible: false })
              }}
            />
            <Tooltip
              visible={this.props.showTooltip && this.state.toolTipVisible}
            >
              <Text style={styles.tooltipText}>Double tap to increase</Text>
              <Text style={styles.tooltipText}>Long press to decrease</Text>
            </Tooltip>
          </View>
          <View styleName="horizontal v-center">
            <EditableProperty
              label="Survival"
              minimumValue={0}
              maximumValue={this.props.survivalLimit}
              showLabel={true}
              quantity={survivor.survival}
              setQuantity={qty => survivor.setAttribute('survival', qty)}
              disabled={survivor.cannotUseSurvival}
            />
            <Text style={{ color: colors.grey500 }}>
              (Limit: {this.props.survivalLimit})
            </Text>
          </View>
          <EditableProperty
            label="Hunt XP"
            minimumValue={0}
            maximumValue={16}
            showLabel={true}
            quantity={survivor['hunt xp']}
            setQuantity={qty => survivor.setAttribute('hunt xp', qty)}
            milestones={ageMilestones}
          />

          <EditableProperty
            label="Courage"
            minimumValue={0}
            maximumValue={9}
            showLabel={true}
            quantity={survivor.courage}
            setQuantity={qty => survivor.setAttribute('courage', qty)}
            milestones={courageMilestones}
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

        {survivor.weaponProficiency && (
          <EditableProperty
            label={survivor.weaponProficiency.name}
            minimumValue={0}
            maximumValue={8}
            showLabel={true}
            quantity={survivor.weaponProficiencyLevel}
            setQuantity={qty =>
              survivor.setAttribute('weaponProficiencyLevel', qty)
            }
            milestones={this.weaponProficiencyMilestones}
          />
        )}
        <WeaponProficiency survivor={survivor} />

        <Divider />

        <FightingArts
          fightingArts={survivor.fightingArts}
          addFA={survivor.addFA}
          removeFA={survivor.removeFA}
          disabled={survivor.cannotUseFightingArts}
        />

        <Divider />

        <Disorders
          disorders={survivor.disorders}
          addDisorder={survivor.addDisorder}
          removeDisorder={survivor.removeDisorder}
        />

        <Divider />

        <Abilities
          abilities={survivor.abilities}
          addAbility={survivor.addAbility}
          removeAbility={survivor.removeAbility}
          disabled={survivor.cannotUseAbilities}
        />

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
  tooltipText: {
    fontSize: 9,
  },
}
