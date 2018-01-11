import React from 'react'
import {
  Screen,
  View,
  Text,
  Title,
  Image,
  DropDownMenu,
  Row,
} from '@shoutem/ui'
import Accordion from 'react-native-collapsible/Accordion'
import SimpleStepper from 'react-native-simple-stepper'

class Resources extends React.Component {
  constructor(props) {
    super(props)
  }

  sections = [
    {
      title: 'Basic',
      content: ['???', 'Broken Lantern'],
    },
    {
      title: 'Varmin',
      content: ['vermin 1', 'vermin 2'],
    },
    {
      title: 'Strange',
      content: ['strange 1', 'strange 2'],
    },
    {
      title: 'White Lion',
      content: ['lion 1', 'lion 2'],
    },
    {
      title: 'Screaming Antelope',
      content: ['ante 1', 'ante 2'],
    },
    {
      title: 'Phoenix',
      content: ['phoenix 1', 'phoenix 2'],
    },
  ]

  _renderHeader(section) {
    return (
      <Row>
        <Title>
          {2} - {section.title}
        </Title>
        <Text>vv</Text>
      </Row>
    )
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        {section.content.map(item => {
          return (
            <View
              key={item}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ paddingRight: 5 }}>* {item}</Text>
              <SimpleStepper tintColor="white" />
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <Accordion
        sections={this.sections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        initiallyActiveSection={0}
      />
    )
  }
}

const styles = {
  header: {},
  headerText: {},
  content: {},
}

export default Resources
