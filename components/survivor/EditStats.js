import React from 'react'
import {
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Caption,
  Divider,
  TextInput,
} from '@shoutem/ui'
import { Keyboard } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import SimpleStepper from 'react-native-simple-stepper'
import GenderButton from './GenderButton'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

@inject(({ store }, props) => ({
  survivor: store.selectedCampaign.settlement.survivors.get(props.survivorId),
  survivalLimit: store.selectedCampaign.settlement.survivalLimit,
}))
@observer
export default class EditStats extends React.Component {
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
            maxLength={35}
          />
        </View>
        <View styleName="horizontal v-center" style={styles.genderRow}>
          <Text style={styles.genderText}>Gender:</Text>
          <GenderButton
            gender={this.props.survivor.gender}
            changeGender={this.props.survivor.changeGender}
          />
        </View>

        {this.state.showBottomPart && (
          <View>
            <Divider />

            <View styleName="horizontal space-between v-center">
              <Text>Movement: {this.props.survivor.movement}</Text>
              <SimpleStepper
                tintColor="white"
                initialValue={this.props.survivor.movement}
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

        <View styleName="horizontal space-between v-center">
          <Text>Insanity: {this.props.survivor.insanity}</Text>
          <SimpleStepper
            tintColor="white"
            initialValue={this.props.survivor.insanity}
            minimumValue={0}
            maximumValue={30}
            valueChanged={qty =>
              this.props.survivor.setAttribute('insanity', qty)
            }
          />
        </View>

        <View styleName="horizontal space-between v-center">
          <View styleName="horizontal">
            <Text>Survival: {this.props.survivor.survival}</Text>
            <Text style={styles.hint}>(Limit: {this.props.survivalLimit})</Text>
          </View>
          <SimpleStepper
            tintColor="white"
            initialValue={this.props.survivor.survival}
            minimumValue={0}
            maximumValue={this.props.survivalLimit}
            valueChanged={qty =>
              this.props.survivor.setAttribute('survival', qty)
            }
          />
        </View>
      </View>
    )
  }
}

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
}
