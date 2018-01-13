import React from 'react'
import { Screen, View, Title, Row, Button } from '@shoutem/ui'
import SimpleStepper from 'react-native-simple-stepper'

export default class MonsterStats extends React.Component {
  render() {
    return (
      <View>
        <Row>
          <Title>Thoughness</Title>
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
