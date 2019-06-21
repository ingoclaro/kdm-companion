import React from 'react'
import { Screen } from '@shoutem/ui'

import SurvivorList from '../components/survivor/SurvivorList'
import CreateButton from '../components/survivor/CreateButton'

export default class SurvivorListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
  }

  navigate(survivorId, edit = false) {
    this.props.navigation.navigate('Survivor', {
      survivorId,
      edit,
    })
  }

  render() {
    return (
      <Screen
        style={{
          paddingTop: 5,
          paddingLeft: 5,
          justifyContent: 'space-between',
        }}
      >
        <SurvivorList navigate={this.navigate} />

        <CreateButton navigate={this.navigate} />
      </Screen>
    )
  }
}
