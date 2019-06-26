import React from 'react'
import {
  Button,
  Divider,
  Icon,
  Screen,
  Subtitle,
  Text,
  Title,
  TouchableOpacity,
  View,
} from '@shoutem/ui'
import { ScrollView, Linking } from 'react-native'
import Modal from 'react-native-modal'
import Constants from 'expo-constants'
import Developer from '../components/Developer'
import colors from '../src/colors'

export default class AboutScreen extends React.Component {
  state = {
    showLicenses: false,
  }

  showDev = () => {
    return (
      Constants.manifest.releaseChannel === undefined ||
      Constants.manifest.releaseChannel === 'default'
    )
  }

  openStoreLink = () => {
    let marketUrl = 'market://details?id=com.github.ingoclaro.kdmcompanion'
    Linking.canOpenURL(marketUrl).then(supported => {
      if (supported) {
        Linking.openURL(marketUrl)
      } else {
        Linking.openURL(
          'http://play.google.com/store/apps/details?id=com.github.ingoclaro.kdmcompanion'
        )
      }
    })
  }

  licenses = [
    {
      title: 'Shoutem UI toolkit',
      url: 'https://github.com/shoutem/ui',
      license: `
        BSD License

        For @shoutem/ui software

        Copyright (c) 2016-present, Shoutem. All rights reserved.

        Redistribution and use in source and binary forms, with or without
        modification, are permitted provided that the following conditions are met:

          * Redistributions of source code must retain the above copyright
            notice, this list of conditions and the following disclaimer.

          * Redistributions in binary form must reproduce the above copyright
            notice, this list of conditions and the following disclaimer in the
             documentation and/or other materials provided with the distribution.

          * Neither the name of the Shoutem nor the
            names of its contributors may be used to endorse or promote products
            derived from this software without specific prior written permission.

        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
        DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER BE LIABLE FOR ANY
        DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
        ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`,
    },
    {
      title: 'React Navigation',
      url: 'https://github.com/react-navigation/react-navigation',
      license: `
      BSD License

      For React Navigation software

      Copyright (c) 2016-present, React Navigation Contributors. All rights reserved.

      Redistribution and use in source and binary forms, with or without modification,
      are permitted provided that the following conditions are met:

      * Redistributions of source code must retain the above copyright notice, this
       list of conditions and the following disclaimer.

      * Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.

      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
      ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
      WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
      DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
      ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
      (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
      LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
      ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
      (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
      SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`,
    },
    {
      title: 'Icons',
      url: null,
      license: `
        Created by Arjun Adamson from Noun Project
        Created by Creative Stall from Noun Project
        Created by Arthur Shlain from Noun Project
        Created by Eyecon Design (Creative Commons (Attribution 3.0 Unported))
        Created by Lorc, Delapouite & contributors (CC Attribution 4.0)
        Created by Skoll (CC BY 3.0)
        Created by Ahkâm (https://www.freeiconspng.com/img/35905)
        Game icons from kdm-manager.com`,
    },
  ]

  licenseText() {
    return (
      <View>
        {this.licenses.map((license, idx) => {
          return (
            <View key={idx}>
              <Subtitle>{license.title}</Subtitle>
              <Text style={styles.licenseUrl}>{license.url}</Text>
              <Text style={styles.licenseText}>{license.license}</Text>
              <Divider />
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <Screen style={styles.screen}>
        <Title>Kingdom Death: Monster Companion</Title>

        <View styleName="horizontal">
          <Subtitle>Version: </Subtitle>
          <Text>
            {Constants.manifest.version}-{Constants.manifest.releaseChannel}
          </Text>
        </View>

        <Divider />
        <ScrollView>
          {this.showDev && <Developer />}
          <Text>
            This application is not developed, maintained, authorized or in any
            other way supported by or affiliated with Kingdom Death or Adam
            Poots Games.
          </Text>

          <Divider />
          <Text>
            This app is open source, if you are a developer and want to
            contribute enhancing the app, open an issue.
          </Text>
          <Text>
            You can also support the app development by becoming a subscriber.
          </Text>

          <Button
            onPress={() => this.props.navigation.navigate('Subscription')}
          >
            <Text>Subscription Status</Text>
          </Button>

          <Divider />

          <Button
            onPress={() =>
              Linking.openURL(
                'https://github.com/ingoclaro/kdm-companion/issues'
              )
            }
          >
            <Icon name="comment" />
            <Text>Report an issue</Text>
          </Button>

          <Divider />

          <Button onPress={this.openStoreLink}>
            <Icon name="add-to-favorites-on" />
            <Text>Rate the App</Text>
          </Button>

          <Divider />

          <Button onPress={() => this.setState({ showLicenses: true })}>
            <Text>Show Licenses</Text>
          </Button>

          <Divider />

          <Button
            onPress={() =>
              Linking.openURL(
                'https://www.freeprivacypolicy.com/privacy/view/55578ac8a64f32d4ff071ebeafb38111'
              )
            }
          >
            <Text>Privacy Policy</Text>
          </Button>
        </ScrollView>

        <Modal
          isVisible={this.state.showLicenses}
          onBackdropPress={() => this.setState({ showLicenses: false })}
          onBackButtonPress={() => this.setState({ showLicenses: false })}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View style={styles.modal}>
            <ScrollView>
              {this.licenseText()}
              <Button onPress={() => this.setState({ showLicenses: false })}>
                <Text>Close</Text>
              </Button>
            </ScrollView>
          </View>
        </Modal>
      </Screen>
    )
  }
}

const styles = {
  screen: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  modal: {
    backgroundColor: colors.grey900,
    padding: 8,
  },
  licenseText: {
    fontSize: 8,
  },
  licenseUrl: {
    fontSize: 10,
  },
}
