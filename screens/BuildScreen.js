import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

import buildImage from '../images/build.png'

export default class BuildScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Build',
    tabBarIcon: ({ tintColor }) => {
      return <Image source={buildImage} style={styles.menuImage} />
    },
  }

  render() {
    return (
      <Screen style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Build something</Text>
        </View>
      </Screen>
    )
  }
}

const styles = {
  menuImage: {
    width: 100,
    height: 50,
  },
}
