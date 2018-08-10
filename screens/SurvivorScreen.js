import React from 'react'
import {
  Screen,
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

import GenderButton from '../components/GenderButton'
import EditableProperty from '../components/EditableProperty'
import Attributes from '../components/Attributes'

const ico_movement = require('../images/icon_movement-24.png')
const ico_accuracy = require('../images/icon_accuracy-24.png')
const ico_strength = require('../images/icon_strength-24.png')
const ico_evasion = require('../images/icon_evasion-32.png')
const ico_luck = require('../images/icon_luck-24.png')
const ico_d10 = require('../images/icon_d10-32.png')
const ico_insanity = require('../images/ico_insanity-32.png')

// This is the individual survivor screen
export default class SurvivorScreen extends React.Component {
  render() {
    return (
      <Screen
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          // paddingTop: 5,
          paddingLeft: 5,
        }}
      >
        <View styleName="horizontal">
          <Text>Name: Yuna</Text>
          <GenderButton />

          <EditableProperty
            label="Survival"
            help="(Limit: 3)"
            minimumValue={0}
            maximumValue={3}
            showLabel={true}
          />
        </View>
        <View styleName="horizontal">
          <EditableProperty label="Movement" icon={ico_movement} />
          <EditableProperty label="Accuracy" icon={ico_accuracy} />
          <EditableProperty label="Strength" icon={ico_strength} />

          <EditableProperty label="Evasion" icon={ico_evasion} />
          <EditableProperty label="Luck" icon={ico_luck} />
          <EditableProperty label="Speed" icon={ico_d10} />
          <EditableProperty label="Insanity" icon={ico_insanity} />
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

        <Attributes />

        <Divider />

        <View>
          <Subtitle>Disorders</Subtitle>
          <View styleName="horizontal">
            <Text>Dis1</Text>
            <Text>Dis2</Text>
            <Text>Dis3</Text>
          </View>
        </View>
      </Screen>
    )
  }
}
