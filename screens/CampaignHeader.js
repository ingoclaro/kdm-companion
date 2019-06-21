import React from 'react'
import { Button, Icon, NavigationBar } from '@shoutem/ui'
import colors from '../src/colors'
import { observer, inject } from 'mobx-react'

export default inject(({ store }) => ({
  campaignName: store.selectedCampaign.name,
}))(
  observer(
    class CampaignHeader extends React.Component {
      static defaultProps = {
        title: undefined,
        campaignName: 'Unnamed',
        navigation: {
          navigate: () => null,
          goBack: () => null,
        },
      }

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
            title={this.props.title || this.props.campaignName}
            rightComponent={rightComponent}
            hasHistory={back}
            navigateBack={() => this.props.navigation.goBack()}
            autoStyleStatusBar={false}
          />
        )
      }
    }
  )
)

const styles = {
  header: {
    container: {
      position: 'relative',
      height: 35,
    },
  },
}
