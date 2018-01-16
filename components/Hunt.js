import React from 'react'
import { Screen, View, Text, Image, DropDownMenu } from '@shoutem/ui'

import MonsterSelector from './MonsterSelector'

class Hunt extends React.Component {
  render() {
    return (
      <View>
        <View styleName="horizontal v-center">
          <Text>Monster:</Text>
          <MonsterSelector />
        </View>
        <Text>[M]->[M]->[R]->[L]->[H]->[D]->[M]->[H]</Text>
        <Text>M: Monster hunt event</Text>
        <Text>H: Regular hunt event</Text>
        <Text>L: White Lion</Text>
        <Text>D: Overwhelming Darkness</Text>
      </View>
    )
  }
}

export default Hunt
