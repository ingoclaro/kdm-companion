import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'

import MultiSelectList from '../components/MultiSelectList'
import resourcesImage from '../images/resources.jpg'
import Resources from '../components/Resources'

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
        <View style={styles.container}>
          <View style={styles.resources}>
            <Resources />
          </View>
        </View>
      </Screen>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    left: 10,
  },
  resources: {
    flex: 1,
    justifyContent: 'center',
  },
  menuImage: {
    width: 100,
    height: 50,
  },
}
