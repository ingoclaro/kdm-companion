import React from 'react'
import {
  View,
  Text,
  Button,
  Divider,
  DropDownMenu,
  TextInput,
} from '@shoutem/ui'
import { Keyboard } from 'react-native'
import { observer, inject } from 'mobx-react'
import { SimpleStepper } from 'react-native-simple-stepper'
import CheckboxListItem from '../common/CheckboxListItem'
import GenderButton from './GenderButton'
import Tooltip from '../common/Tooltip'
import colors from '../../src/colors'
import R from 'ramda'

@observer
class EditStats extends React.Component {
  constructor(props) {
    super(props)

    this.keyboardWillShow = this.keyboardWillShow.bind(this)
    this.keyboardWillHide = this.keyboardWillHide.bind(this)
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow
    )
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide
    )
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow() {
    this.setState({ showBottomPart: false })
  }

  keyboardWillHide() {
    this.setState({ showBottomPart: true })
  }

  state = {
    showBottomPart: true,
  }

  render() {
    let survivalHint = `(Limit: ${this.props.survivalLimit})`

    let weaponProficiencies = [
      { name: 'Choose', id: undefined },
      ...this.props.availableWeaponProficiencies,
    ]

    let selectedWeaponProficiency = R.find(
      item =>
        this.props.survivor.weaponProficiency &&
        this.props.survivor.weaponProficiency.id === item.id,
      weaponProficiencies
    )
    if (!selectedWeaponProficiency) {
      selectedWeaponProficiency = weaponProficiencies[0]
    }

    return (
      <View>
        <View styleName="horizontal">
          <Text>Name:</Text>
          <TextInput
            style={styles.textInput}
            value={this.props.survivor.name}
            autoFocus={false}
            onChangeText={text =>
              this.props.survivor.setAttribute('name', text)
            }
          />
        </View>

        <View styleName="horizontal">
          <View style={{ flex: 1 }}>
            <View styleName="horizontal v-center" style={styles.genderRow}>
              <Text style={styles.genderText}>Gender:</Text>
              <GenderButton
                gender={this.props.survivor.gender}
                changeGender={this.props.survivor.changeGender}
              />
            </View>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <CheckboxListItem
              styleName="small"
              onPressItem={() => this.props.survivor.toggleSkipNextHunt()}
              title="Skip next Hunt"
              id="skipNextHunt"
              selected={this.props.survivor.skipNextHunt}
            />
          </View>
        </View>

        <View styleName="horizontal v-center" style={{ paddingTop: 10 }}>
          <Text>Status: </Text>
          <Button
            styleName="clear"
            style={{ paddingLeft: 5, borderBottomWidth: 1 }}
            onPress={() => this.props.survivor.cycleStatus()}
          >
            <Text style={{ color: colors.grey200, margin: 0 }}>
              {this.props.survivor.status}
            </Text>
          </Button>

          <Tooltip
            visible={
              this.props.hasReroll &&
              !this.props.survivor.rerollUsed &&
              this.props.survivor.status === 'dead'
            }
          >
            <Text style={styles.tooltipText}>Use the reroll?</Text>
          </Tooltip>

          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {this.props.hasReroll && (
              <Button
                styleName="clear"
                style={{ padding: 2, borderBottomWidth: 1 }}
                onPress={() => this.props.survivor.toggleRerollUsed()}
              >
                {this.props.survivor.rerollUsed ? (
                  <Text style={styles.rerollUsed}>Reroll used</Text>
                ) : (
                  <Text style={styles.rerollAvailable}>Reroll available</Text>
                )}
              </Button>
            )}
          </View>
        </View>

        {this.state.showBottomPart && (
          <View>
            <Divider />

            <View styleName="horizontal space-between v-center">
              <Text>Movement: {this.props.survivor.movement}</Text>
              <SimpleStepper
                tintColor="white"
                initialValue={this.props.survivor.movement}
                value={this.props.survivor.movement}
                imageHeight={24}
                imageWidth={24}
                padding={4}
                minimumValue={1}
                maximumValue={10}
                valueChanged={qty =>
                  this.props.survivor.setAttribute('movement', qty)
                }
              />
            </View>

            <View styleName="horizontal space-between v-center">
              <Text>Accuracy: {this.props.survivor.accuracy}</Text>
              <SimpleStepper
                tintColor="white"
                initialValue={this.props.survivor.accuracy}
                value={this.props.survivor.accuracy}
                imageHeight={24}
                imageWidth={24}
                padding={4}
                minimumValue={-10}
                maximumValue={10}
                valueChanged={qty =>
                  this.props.survivor.setAttribute('accuracy', qty)
                }
              />
            </View>

            <View styleName="horizontal space-between v-center">
              <Text>Strength: {this.props.survivor.strength}</Text>
              <SimpleStepper
                tintColor="white"
                initialValue={this.props.survivor.strength}
                value={this.props.survivor.strength}
                imageHeight={24}
                imageWidth={24}
                padding={4}
                minimumValue={-10}
                maximumValue={10}
                valueChanged={qty =>
                  this.props.survivor.setAttribute('strength', qty)
                }
              />
            </View>

            <View styleName="horizontal space-between v-center">
              <Text>Evasion: {this.props.survivor.evasion}</Text>
              <SimpleStepper
                tintColor="white"
                initialValue={this.props.survivor.evasion}
                value={this.props.survivor.evasion}
                imageHeight={24}
                imageWidth={24}
                padding={4}
                minimumValue={-10}
                maximumValue={10}
                valueChanged={qty =>
                  this.props.survivor.setAttribute('evasion', qty)
                }
              />
            </View>

            <View styleName="horizontal space-between v-center">
              <Text>Luck: {this.props.survivor.luck}</Text>
              <SimpleStepper
                tintColor="white"
                initialValue={this.props.survivor.luck}
                value={this.props.survivor.luck}
                imageHeight={24}
                imageWidth={24}
                padding={4}
                minimumValue={-10}
                maximumValue={10}
                valueChanged={qty =>
                  this.props.survivor.setAttribute('luck', qty)
                }
              />
            </View>

            <View styleName="horizontal space-between v-center">
              <Text>Speed: {this.props.survivor.speed}</Text>
              <SimpleStepper
                tintColor="white"
                initialValue={this.props.survivor.speed}
                value={this.props.survivor.speed}
                imageHeight={24}
                imageWidth={24}
                padding={4}
                minimumValue={-10}
                maximumValue={10}
                valueChanged={qty =>
                  this.props.survivor.setAttribute('speed', qty)
                }
              />
            </View>
          </View>
        )}
        <Divider />

        <View styleName="horizontal v-center">
          <Text>Weapon Proficiency:</Text>
          <DropDownMenu
            options={weaponProficiencies}
            selectedOption={selectedWeaponProficiency}
            onOptionSelected={item =>
              this.props.survivor.setWeaponProficiency(item)
            }
            titleProperty="name"
            valueProperty="id"
          />
        </View>

        <CheckboxListItem
          styleName="title"
          onPressItem={() =>
            this.props.survivor.setAttribute(
              'cannotUseSurvival',
              !this.props.survivor.cannotUseSurvival
            )
          }
          title="Cannot use Survival"
          id="cannotUseSurvival"
          selected={this.props.survivor.cannotUseSurvival}
        />

        <CheckboxListItem
          styleName="title"
          onPressItem={() =>
            this.props.survivor.setAttribute(
              'cannotUseFightingArts',
              !this.props.survivor.cannotUseFightingArts
            )
          }
          title="Cannot use Fighting Arts"
          id="cannotUseFightingArts"
          selected={this.props.survivor.cannotUseFightingArts}
        />

        <CheckboxListItem
          styleName="title"
          onPressItem={() =>
            this.props.survivor.setAttribute(
              'cannotUseAbilities',
              !this.props.survivor.cannotUseAbilities
            )
          }
          title="Cannot use Abilities"
          id="cannotUseAbilities"
          selected={this.props.survivor.cannotUseAbilities}
        />
      </View>
    )
  }
}

export default inject(({ store }, props) => ({
  survivor: store.selectedCampaign.settlement.survivors.get(props.survivorId),
  survivalLimit: store.selectedCampaign.settlement.survivalLimit,
  availableWeaponProficiencies: store.availableWeaponProficiencies,
  hasReroll: store.selectedCampaign.settlement.hasSOTF,
}))(EditStats)

const styles = {
  textInput: {
    flex: 1,
    borderColor: colors.grey700,
    borderBottomWidth: 1,
    selectionColor: colors.grey800,
    left: 4,
    padding: 2,
    height: 22,
  },
  hint: {
    color: colors.grey500,
    paddingLeft: 5,
  },
  genderRow: {
    paddingTop: 8,
  },
  genderText: {
    paddingRight: 5,
  },
  rerollAvailable: {
    color: colors.green800,
    margin: 0,
  },
  rerollUsed: {
    textDecorationLine: 'line-through',
    color: colors.grey400,
    margin: 0,
  },
  tooltipText: {
    fontSize: 9,
  },
}
