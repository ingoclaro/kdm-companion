import React from 'react'
import { ScrollView } from 'react-native'
import { Screen, Divider, Title, Text } from '@shoutem/ui'
import Expansions from '../components/Expansions'
import { kea, connect } from 'kea'
import PropTypes from 'prop-types'

export default class ExpansionsScreen extends React.Component {
  render() {
    return (
      <Screen style={{ paddingTop: 5, paddingLeft: 5 }}>
        <ScrollView>
          <Expansions />
        </ScrollView>
      </Screen>
    )
  }
}
