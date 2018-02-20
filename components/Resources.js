import React from 'react'
import {
  Screen,
  Button,
  View,
  Text,
  Title,
  Image,
  DropDownMenu,
  Row,
  Icon,
} from '@shoutem/ui'
import Accordion from 'react-native-collapsible/Accordion'
// TODO try:
// https://github.com/ercpereda/react-native-accordion
// https://github.com/metinalim/react-native-accordion-met
// Submit an issue against https://github.com/oblador/react-native-collapsible
import SimpleStepper from 'react-native-simple-stepper'
import { kea } from 'kea'
import PropTypes from 'prop-types'
import R from 'ramda'

import colors from '../src/colors'

class Resources extends React.Component {
  constructor(props) {
    super(props)
    this._renderContent = this._renderContent.bind(this) // so that we can access this.props from within the function
    this._renderHeader = this._renderHeader.bind(this)
    this.sectionResources = this.sectionResources.bind(this)
  }

  sections = [
    {
      id: 'basic',
      title: 'Basic',
    },
    {
      id: 'vermin',
      title: 'Vermin',
    },
    {
      id: 'strange',
      title: 'Strange',
    },
    {
      id: 'white_lion',
      title: 'White Lion',
    },
    {
      id: 'screaming_antelope',
      title: 'Screaming Antelope',
    },
    {
      id: 'phoenix',
      title: 'Phoenix',
    },
  ]

  sectionResources(section_id) {
    return R.filter(resource => {
      return resource.monster === section_id || resource.type === section_id
    })(this.props.resources)
  }

  _renderHeader(section, index, isActive, sections) {
    let icon = isActive ? (
      <Icon name="up-arrow" style={styles.headerArrow} />
    ) : (
      <Icon name="down-arrow" style={styles.headerArrow} />
    )
    let items = this.sectionResources(section.id)

    let number_of_resources = R.reduce(
      (acc, id) => acc + this.props.stored_resources[id],
      0,
      Object.keys(items)
    )

    return (
      <Row>
        <Title>
          {number_of_resources} - {section.title}
        </Title>
        {icon}
      </Row>
    )
  }

  _renderContent(section, index, isActive, sections) {
    let items = this.sectionResources(section.id)

    return (
      <View>
        {Object.keys(items).map(item_key => {
          const { change } = this.actions
          const quantity = this.props.stored_resources[item_key] // TODO something weird happens then the row is re-rendered, the stepper is messed up.
          return (
            <View key={item_key} style={styles.resourceRow}>
              <Text style={styles.resourceText}>
                {quantity} - {item_key}
              </Text>
              <SimpleStepper
                tintColor="white"
                valueChanged={value => {
                  change(item_key, value)
                }}
              />
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
      />
    )
  }
}
Resources.propTypes = {
  resources: PropTypes.object.isRequired,
  stored_resources: PropTypes.object.isRequired,
}

const resourcesLogic = kea({
  connect: {
    props: [state => state, ['resources']],
  },
  actions: () => ({
    change: (id, value) => {
      return { id, value }
    },
  }),
  reducers: ({ actions }) => ({
    stored_resources: [
      {},
      PropTypes.object,
      {
        [actions.change]: (state, payload) => {
          return {
            ...state,
            [payload.id]: payload.value,
          }
        },
      },
    ],
  }),
})

const connectedResources = resourcesLogic(Resources)

const styles = {
  header: {},
  headerArrow: {
    color: colors.grey100,
  },
  headerText: {},
  resourceRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceText: { paddingRight: 5 },
  content: {},
}

export default connectedResources
