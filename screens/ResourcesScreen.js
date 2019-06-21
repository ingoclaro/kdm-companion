import React from 'react'
import { Screen, View } from '@shoutem/ui'

import Resources from '../components/settlement/Resources'

export default class ResourcesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Resources',
  }

  constructor(props) {
    super(props)

    this.state = { craftVisible: false }
  }

  render() {
    return (
      <Screen>
        <View style={styles.resources}>
          <Resources />
        </View>
      </Screen>
    )
  }
}

const styles = {
  resources: {
    flex: 1,
    justifyContent: 'center',
  },
}
