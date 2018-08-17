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
import R from 'ramda'

import GenderButton from './GenderButton'
import EditableProperty from './EditableProperty'
import FightingArts from './FightingArts'
import Disorders from './Disorders'
import Note from '../Note'

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
}))
@observer
export default class Survivor extends React.Component {
  static propTypes = {
    survivorId: PropTypes.string.isRequired, // ID of the survivor to show
  }

  render() {
    let survivor = this.props.survivor

    if (!survivor) {
      return null
    }

    return (
      <View>
        <View styleName="horizontal">
          <Text>Name: {survivor.name}</Text>
          <GenderButton
            gender={survivor.gender}
            changeGender={survivor.changeGender}
          />

          <EditableProperty
            label="Survival"
            help="(Limit: 3)"
            minimumValue={0}
            maximumValue={3}
            showLabel={true}
            quantity={survivor.survival}
            setQuantity={qty => survivor.setAttribute('survival', qty)}
          />
        </View>
        <View styleName="horizontal">
          <EditableProperty
            label="Movement"
            icon={ico_movement}
            quantity={survivor.movement}
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
            setQuantity={qty => survivor.setAttribute('insanity', qty)}
          />
        </View>

        <Divider />

        <View>
          <Subtitle>Courage: 3</Subtitle>
          <View styleName="horizontal">
            <Text>Stalwart</Text>
            <Text>Stalwart2</Text>
            <Text>Stalwart3</Text>
          </View>
        </View>

        <Divider />

        <View>
          <Subtitle>Understanding: 3</Subtitle>
          <View styleName="horizontal">
            <Text>Analyze</Text>
            <Text>Analyze2</Text>
            <Text>Analyze3</Text>
          </View>
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

        <Note
          title="Notes"
          notes={survivor.notes}
          saveNote={survivor.saveNotes}
        />
      </View>
    )
  }
}
