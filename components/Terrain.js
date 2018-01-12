import React from 'react'
import { Screen, View, Text, Title } from '@shoutem/ui'

export default class Terrain extends React.Component {
  render() {
    return (
      <View>
        <Title>Terrain</Title>
        <Text>1 Tall Grass</Text>
        <Text>2 Random terrain</Text>
        <Text>---------------------</Text>
        <Text>| |</Text>
        <Text>| |</Text>
        <Text>| |</Text>
        <Text>| |</Text>
        <Text>| |</Text>
        <Text>| |</Text>
        <Text>---------------------</Text>
      </View>
    )
  }
}
