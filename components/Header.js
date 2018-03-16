import React from 'react'
import { Button, Icon, NavigationBar } from '@shoutem/ui'
import colors from '../src/colors'
import { observer, inject } from 'mobx-react/native'

@inject(({ store }) => ({
  title: store.selectedCampaign.name,
}))
@observer
export default class Header extends React.Component {
  button() {
    return (
      <Button
        style={{
          backgroundColor: colors.grey900,
          borderColor: colors.grey900,
        }}
        onPress={() => this.props.navigation.navigate('Campaign')}
      >
        <Icon name="edit" style={{ color: colors.grey50 }} />
      </Button>
    )
  }

  render() {
    let back = this.props.navigation.state.routeName !== 'Main'
    rightComponent = back ? null : this.button()

    return (
      <NavigationBar
        style={styles.header}
        title={this.props.title}
        rightComponent={rightComponent}
        hasHistory={back}
        navigateBack={() => this.props.navigation.goBack()}
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
