import React from 'react'
import { Screen, View, Title, Text, Row, Icon } from '@shoutem/ui'
import RichText from './common/RichText'
import { Dimensions } from 'react-native'
import Accordion from './common/Accordion'
import colors from '../src/colors'

export default class SevereInjuryTable extends React.Component {
  constructor(props) {
    super(props)
    this._renderContent = this._renderContent.bind(this)
  }

  data = [
    {
      id: 'head',
      title: 'Head',
      data: [
        {
          numbers: '1 - 2',
          title: 'Head Explosion!',
          description:
            'Your head erupts in a shower of gore, killing you instantly. All other survivors are so disturbed that they loose 1 survival.',
        },
        {
          numbers: '3 - 4',
          title: 'Decapitation',
          description: 'Your are dead.',
        },
        {
          numbers: '5',
          title: 'Intracraneal hemorrhage',
          description:
            'You can no longer use or gain survival. This injury is permanent, and can be recorded once. Gain 1 bleeding token.',
        },
        {
          numbers: '6',
          title: 'Deaf',
          description:
            "You won't hear it coming. Suffer -1 permanent evasion. This injury is permanent, and can be recorded once. Gain 1 bleeding token.",
        },
        {
          numbers: '7',
          title: 'Blind',
          description:
            'Loose an eye. Suffer -1 permanent accuracy. This injury is permanent, and can be recorded twice. A survivor with two blind severe permanent injuries suffers -4 permanent accuracy and retires at the end of the next showdown or settlement phase. Gain 1 bleeding token.',
        },
        {
          numbers: '8',
          title: 'Concussion',
          description:
            'Your brain is scrambled like an egg. Gain a random disorder. Gain 1 bleeding token.',
        },
        {
          numbers: '9',
          title: 'Shattered Jaw',
          description:
            'Your dring your meat through a straw. You can no longer consume or be affected by events requiring you to consume. You can no longer encourage. This injury is permanent and can be recorded once. Gain 1 bleeding token.',
        },
        {
          numbers: '10+',
          title: 'Destroyed tooth',
          description:
            'If you have 3+ courage, you boldly spit the tooth out and gain +2 insanity! Otherwise the blow sends you sprawing and you are knocked down.',
        },
      ],
    },
    {
      id: 'arms',
      title: 'Arms',
      data: [
        {
          numbers: '1 - 2',
          title: 'Die of shock',
          description:
            'Your vision fades, along with the sight of your mangled, armless torso.',
        },
        {
          numbers: '3',
          title: 'Bleeding',
          description: 'Gain 2 bleeding tokens.',
        },
        {
          numbers: '4',
          title: 'Dismembered Arm',
          description:
            'Loose an arm. You can no longer activate two-handed weapons. This injury is permanent and can be recorded twice. A survivor with two dismembered arm severe injuries cannot activate any weapons. Gain 1 bleeding token.',
        },
        {
          numbers: '5',
          title: 'Ruptured muscle',
          description:
            'A painful rip. The arm hangs limb. You can no longer activate fighting arts. This injury is permanent and can be recorded once. Gain 1 bleeding token.',
        },
        {
          numbers: '6',
          title: 'Contracture',
          description:
            'The arm will never be the same. Suffer -1 permanent accuracy. This injury is permanent and can be recorded multiple times. Gain 1 bleeding token.',
        },
        {
          numbers: '7',
          title: 'Broken Arm',
          description:
            'An ear-shuttering crunch. Suffer -1 permanent accurance and -1 permanent strenght. This injury is permanent and can be recorded twice. Gain 1 bleeding token.',
        },
        {
          numbers: '8',
          title: 'Spiral fracture',
          description:
            'Your arm twists unnaturally. Gain -2 strength tokens. Skip the next hunt. Gain 1 bleeding token.',
        },
        {
          numbers: '9',
          title: 'Dislocated shoulder',
          description:
            'Pop! You cannot activate two-handed or paired weapons or use block until showdown ends. Gain 1 bleeding token.',
        },
        {
          numbers: '10+',
          title: 'Hit the dirt',
          description: 'The blow send you sprawing and you are knoked down.',
        },
      ],
    },
    {
      id: 'body',
      title: 'Body',
      data: [
        {
          numbers: '1 - 2',
          title: 'Instant death',
          description:
            'The blow sends a bone fragment directly into your heart, killing you instantly.',
        },
        {
          numbers: '3',
          title: 'Bleeding',
          description: 'Gain 2 bleeding tokens.',
        },
        {
          numbers: '4',
          title: 'Gaping chest wound',
          description:
            'Suffer -1 permanent strength. This injury is permanent and can be recorded multiple times. Gain 1 bleeding token.',
        },
        {
          numbers: '5',
          title: 'Destroyed back',
          description:
            'A sharp cracking noise. Suffer -2 permanent movement. You can no longer activate gear that has 2+ strength. This injury is permanent and can be recorded once. Gain 1 bleeding token.',
        },
        {
          numbers: '6',
          title: 'Disemboweled',
          description:
            'Your movement is reduced to 1 until the showdown ends. Gain 1 bleeding token. Skip the next hunt. If you suffer disemboweled during the showdown, at least other survivor must live to the end of that showdown to carry you back to the Settlement. Otherwise, at the end of the showdown, you are lost. Dead.',
        },
        {
          numbers: '7',
          title: 'Ruptured spleen',
          description:
            'A vicious body blow. Skip the next hunt. Gain 2 bleeding tokens.',
        },
        {
          numbers: '8',
          title: 'Broken rib',
          description:
            'It even hurts to breathe. Suffer -1 permanent speed. This injury is permanent and can be recorded multiple times. Gain 1 bleeding token.',
        },
        {
          numbers: '9',
          title: 'Collapsed lung',
          description:
            "You can't catch a breath. Gain -1 movemment token. Gain 1 bleeding token.",
        },
        {
          numbers: '10+',
          title: 'Bowled over',
          description: 'The blow send you sprawing and you are knoked down.',
        },
      ],
    },
    {
      id: 'waist',
      title: 'Waist',
      data: [
        {
          numbers: '1 - 2',
          title: 'Final breath',
          description:
            'With your last gasp you utter final words of bravery. Adjacent survivors gain +1 survival. You are dead.',
        },
        {
          numbers: '3',
          title: 'Bleeding kidneys',
          description: 'Gain 2 bleeding tokens.',
        },
        {
          numbers: '4',
          title: 'Intestinal prolapse',
          description:
            'Your gut is gravely injured. You can no longer equip any gear on your waist, as it is too painful to wear. This injury is permanent, and can be recorded once. Gain 1 bleeding token.',
        },
        {
          numbers: '5',
          title: 'Warped pelvis',
          description:
            'Your pelvis is disfigured. Suffer -1 permanent luck. This injury is permanent, and can be recorded multiple times. Gain 1 bleeding token.',
        },
        {
          numbers: '6',
          title: 'Destroyed genitals',
          description:
            'You cannot be nominated for the intimacy story event. This injury is permanent, and can be recorded once. Gain a random disorder. You are knocked down. Gazing upwards, you wonder at the futility of your struggle. Gain +3 insanity. Gain 1 bleeding token.',
        },
        {
          numbers: '7',
          title: 'Broken hip',
          description:
            'Your hip is dislocated. You can no longer dodge. Suffer -1 permanent movement. This injury is permanent, and can be recorded once. Gain 1 bleeding token.',
        },
        {
          numbers: '8',
          title: 'Slashed Back',
          description:
            'Making sudden movement is excruciatingly painful. You cannot surge until showdown ends. Gain 1 bleeding token.',
        },
        {
          numbers: '9',
          title: 'Bruised Tail-bone',
          description:
            'The base of your spine is in agony. You cannot dash until showdown ends. You are knocked down. Gain 1 bleeding token.',
        },
        {
          numbers: '10+',
          title: 'Belly-up',
          description: 'The blow sends you sprawing and you are knocked down.',
        },
      ],
    },
    {
      id: 'legs',
      title: 'Legs',
      data: [
        {
          numbers: '1 - 2',
          title: 'Blood Geyser',
          description:
            'Blood shoots from your femoral artery at an alarming rate, killing you in seconds.',
        },
        {
          numbers: '3',
          title: 'Bleeding',
          description: 'Gain 2 bleeding tokens.',
        },
        {
          numbers: '4',
          title: 'Dismembered Leg',
          description:
            'Lose a leg. You suffer -2 permanent movement, and can no longer dash. This injury is permanent, and can be recorded twice. A survivor with two dismembered leg severe injuries has lost both of their legs and must retire at the end of the next showdown or settlement phase. Gain 1 bleeding token.',
        },
        {
          numbers: '5',
          title: 'Hamstrung',
          description:
            'A painful rip. The leg is unusable. You can no longer use any fighting arts or abilities. This injury is permanent, and can be recorded once. Gain 1 bleeding token.',
        },
        {
          numbers: '6',
          title: 'Torn Achilles Tendon',
          description:
            'Your leg cannot bear your weight. Until the end of the showdown, whenever you suffer light, heavy or severe injury, you are also knocked down. Skip the next hunt. Gain 1 bleeding token.',
        },
        {
          numbers: '7',
          title: 'Torn muscle',
          description:
            'Your quadriceps is ripped to shreds. You cannot dash until the showdown ends. Skip next hunt. Gain 1 bleeding token.',
        },
        {
          numbers: '8',
          title: 'Broken Leg',
          description:
            'An ear-shattering crunch! Adjacent survivors suffer 1 brain damage. Suffer -1 permanent movement. This injury is permanent, and can be recorded twice. Gain 1 bleeding token.',
        },
        {
          numbers: '9',
          title: 'Bloody Thighs',
          description: 'Gain 2 bleeding tokens',
        },
        {
          numbers: '10+',
          title: 'Lost balance',
          description: 'The blow sends you sprawing and you are knoked down.',
        },
      ],
    },
  ]

  _renderContent(data) {
    //TODO: remove this hack to avoid text clipping (galaxy S8)
    let width = Dimensions.get('window').width - 48

    return (
      <View styleName="horizontal v-start">
        <View style={styles.numberContainer}>
          <Text style={styles.numbers}>{data.item.numbers}</Text>
        </View>
        <View styleName="vertical h-start">
          <Text style={styles.title}>{data.item.title}</Text>
          <View style={{ width }}>
            <RichText>{data.item.description}</RichText>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return <Accordion data={this.data} renderContent={this._renderContent} />
  }
}

const styles = {
  numberContainer: {
    paddingRight: 5,
    width: 38,
  },
  numbers: {
    color: colors.brown400,
  },
  title: {},
}
