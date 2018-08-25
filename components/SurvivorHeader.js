import React from 'react'
import { Button, Icon, NavigationBar } from '@shoutem/ui'
import colors from '../src/colors'
import { observer, inject } from 'mobx-react/native'

@inject(({ store }, props) => ({
  survivor: store.selectedCampaign.settlement.survivors.get(props.survivorId),
}))
@observer
export default class SurvivorHeader extends React.Component {
  render() {
    let title = this.props.survivor.name

    return (
      <NavigationBar
        style={styles.header}
        title={title}
        hasHistory={true}
        navigateBack={() => this.props.navigation.goBack()}
        autoStyleStatusBar={false}
      />
    )
  }
}
const styles = {
  header: {
    container: {
      position: 'relative',
      height: 35,
    },
  },
}
