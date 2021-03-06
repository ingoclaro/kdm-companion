import React from 'react'
import { View, Text, Subtitle, Image, Divider } from '@shoutem/ui'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'

import { ageMilestones } from './AgeMilestone'
import Abilities from './Abilities'
import AttributeLarge from './AttributeLarge'
import Disorders from './Disorders'
import EditableProperty from './EditableProperty'
import FightingArts from './FightingArts'
import Note from '../common/Note'
import WeaponProficiency from './WeaponProficiency'
import Tooltip from '../common/Tooltip'
import DragonTraits from './DragonTraits'
import PotSun from './PotSun'
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

const ico_skip_hunt = require('../../images/icon_skip_hunt.png')

// This is the individual survivor screen
@observer
class Survivor extends React.Component {
  static propTypes = {
    survivorId: PropTypes.string.isRequired, // ID of the survivor to show
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
        <View styleName="horizontal">
          <View style={{ flex: 1 }}>
            <View styleName="horizontal v-center">
              <Subtitle>Gender:</Subtitle>
              <Image
                source={gender_icon}
                style={{ width: 14, height: 14, marginLeft: 5 }}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View styleName="horizontal v-center">
              {this.props.hasReroll &&
                (survivor.rerollUsed ? (
                  <Image
                    source={ico_d10}
                    style={{
                      width: 16,
                      height: 16,
                      marginRight: 14,
                      transform: [{ rotateY: '180deg' }, { rotateZ: '180deg' }],
                    }}
                    tintColor={colors.red800}
                  />
                ) : (
                  <Image
                    source={ico_d10}
                    style={{
                      width: 16,
                      height: 16,
                      marginRight: 14,
                      transform: [{ rotateY: '180deg' }, { rotateZ: '180deg' }],
                    }}
                    tintColor={colors.green800}
                  />
                ))}
              {survivor.skipNextHunt && (
                <Image
                  source={ico_skip_hunt}
                  style={{ width: 20, height: 16, marginRight: 14 }}
                />
              )}
              {survivor.status === 'dead' && (
                <Image
                  source={ico_death}
                  style={{ width: 14, height: 16, marginRight: 14 }}
                />
              )}
            </View>
          </View>
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
            milestones={this.props.courageMilestones}
          />
          <EditableProperty
            label="Understanding"
            minimumValue={0}
            maximumValue={9}
            showLabel={true}
            quantity={survivor.understanding}
            setQuantity={qty => survivor.setAttribute('understanding', qty)}
            milestones={this.props.understandingMilestones}
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

        {this.props.showConstellation && (
          <View>
            <DragonTraits survivor={this.props.survivor} />
            <Divider />
          </View>
        )}

        {this.props.showPotSun && (
          <View>
            <PotSun survivor={this.props.survivor} />
            <Divider />
          </View>
        )}

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

export default inject(({ store }, props) => ({
  survivor: store.selectedCampaign.settlement.survivors.get(props.survivorId),
  survivalLimit: store.selectedCampaign.settlement.survivalLimit,
  showTooltip: store.selectedCampaign.settlement.survivors.size === 1,
  hasReroll: store.selectedCampaign.settlement.hasSOTF,
  showConstellation: store.selectedCampaign.type.id === 'pots',
  showPotSun: store.selectedCampaign.type.id === 'potsun',
  courageMilestones: store.selectedCampaign.courageMilestones,
  understandingMilestones: store.selectedCampaign.understandingMilestones,
}))(Survivor)

const styles = {
  tooltipText: {
    fontSize: 9,
  },
  rerollAvailable: {
    color: colors.green800,
  },
  rerollUsed: {
    color: colors.grey700,
    textDecorationLine: 'line-through',
  },
}
