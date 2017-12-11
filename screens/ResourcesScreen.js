import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

import MultiSelectList from '../components/MultiSelectList'
import resourcesImage from '../images/resources.jpg'

export default class ResourcesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Resources',
    tabBarIcon: ({ tintColor }) => {
      return <Image source={resourcesImage} style={styles.menuImage} />
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
          <Text>Choose Resources</Text>
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
