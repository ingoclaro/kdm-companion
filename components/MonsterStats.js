import React from 'react'
import { Text } from 'react-native'
import { Screen, View, Title, Row } from '@shoutem/ui'
import SimpleStepper from 'react-native-simple-stepper'

export default class MonsterStats extends React.Component {
  render() {
    return (
      <View>
        <Row>
          {/* TODO: mega hack so text shows up white */}
          <Text style={{ color: 'white' }}>Thoughness</Text>
          <SimpleStepper tintColor={style.stepperTintColor} />
        </Row>
        <Row>
          <Title>Movement</Title>
          <SimpleStepper tintColor={style.stepperTintColor} />
        </Row>
        <Row>
          <Title>Accurancy</Title>
          <SimpleStepper tintColor={style.stepperTintColor} />
        </Row>
        <Row>
          <Title>Speed</Title>
          <SimpleStepper tintColor={style.stepperTintColor} />
        </Row>
        <Row>
          <Title>Health</Title>
          <SimpleStepper tintColor={style.stepperTintColor} />
        </Row>
      </View>
    )
  }
}

const style = {
  stepperTintColor: 'white',
}
