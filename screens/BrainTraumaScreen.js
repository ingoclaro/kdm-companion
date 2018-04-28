import React from 'react'
import { Screen } from '@shoutem/ui'
import BrainTraumaTable from '../components/BrainTraumaTable'

export default class BrainTraumaScreen extends React.Component {
  render() {
    return (
      <Screen
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingHorizontal: 5,
        }}
      >
        <BrainTraumaTable />
      </Screen>
    )
  }
}
