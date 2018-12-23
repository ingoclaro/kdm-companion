import React from 'react'
import { View, Button, Text, Subtitle, Divider } from '@shoutem/ui'
import { Constants, MailComposer, FileSystem } from 'expo'

export default class Developer extends React.Component {
  sendStore = () => {
    MailComposer.composeAsync({
      recipients: ['miclaro@gmail.com'],
      subject: 'backup of kdm-companion store',
      body: 'backup of kdm-companion store',
      isHtml: false,
      attachments: [`file://${FileSystem.documentDirectory}/campaigns.json`],
    })
  }

  render() {
    return (
      <View>
        <Subtitle>Dev stuff</Subtitle>
        <Text>deviceId: {Constants.deviceId}</Text>

        <Button onPress={this.sendStore}>
          <Text>Send store</Text>
        </Button>

        <Divider />
      </View>
    )
  }
}
