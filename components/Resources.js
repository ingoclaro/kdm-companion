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
import Accordion from './Accordion'
import SimpleStepper from 'react-native-simple-stepper'
import { kea } from 'kea'
import PropTypes from 'prop-types'
import R from 'ramda'

import colors from '../src/colors'

const capitalize = R.replace(/^./, R.toUpper)
const types = {
  basic: {
    name: 'Basic',
  },
  strange: {
    name: 'Strange',
  },
  vermin: {
    name: 'Vermin',
  },
}

class Resources extends React.Component {
  constructor(props) {
    super(props)
    this._renderContent = this._renderContent.bind(this) // so that we can access this.props from within the function
    this._renderHeader = this._renderHeader.bind(this)
  }

  sections = {
    basic: {
      title: 'Basic',
    },
    vermin: {
      title: 'Vermin',
    },
    strange: {
      title: 'Strange',
    },
    white_lion: {
      title: 'White Lion',
    },
    screaming_antelope: {
      title: 'Screaming Antelope',
    },
    phoenix: {
      title: 'Phoenix',
    },
  }

  _renderHeader(section, isActive) {
    let icon = isActive ? (
      <Icon name="up-arrow" style={styles.headerArrow} />
    ) : (
      <Icon name="down-arrow" style={styles.headerArrow} />
    )

    let number_of_resources = this.props.section_resource_count[section.id]

    return (
      <Row>
        <Title>
          {number_of_resources} - {section.title}
        </Title>
        {icon}
      </Row>
    )
  }

  _renderContent(data) {
    const { change } = this.actions
    const quantity = this.props.stored_resources[data.item.id]

    return (
      <View style={styles.resourceRow}>
        <Text style={styles.resourceText}>
          {quantity} - {data.item.name}
        </Text>
        <SimpleStepper
          tintColor="white"
          initialValue={quantity}
          valueChanged={value => {
            change(data.item.id, value)
          }}
          style={{
            alignSelf: 'end',
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <Accordion
        data={this.props.resources}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    )
  }
}
Resources.propTypes = {
  resources: PropTypes.array.isRequired,
  stored_resources: PropTypes.object.isRequired,
  section_resource_count: PropTypes.object.isRequired,
}

const resourcesLogic = kea({
  path: () => ['scenes', 'resources'],
  connect: {
    props: [state => state, ['resources as global_resources', 'monsters']],
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
  selectors: ({ selectors }) => ({
    resources: [
      () => [selectors.global_resources, selectors.monsters],
      (global_resources, monsters) => {
        let items = R.groupBy(R.prop('section'))(
          Array.from(Object.entries(global_resources), v => ({
            id: v[0],
            name: capitalize(v[0]),
            section: v[1].monster || v[1].type,
          }))
        )
        items = Array.from(Object.entries(items), v => ({
          id: v[0],
          title: monsters[v[0]] ? monsters[v[0]]['name'] : types[v[0]].name,
          data: v[1],
        }))
        return items
      },
      PropTypes.array,
      // Structure:
      // [
      //   {
      //     id: 'basic', // id of section/type
      //     title: 'Basic', // title of type
      //     data: [ //array of items
      //       {
      //         id: 'skull', // id of resource
      //         name: 'skull', // name of resource
      //         section: 'basic' // id of section
      //       }
      //     ]
      //   },
      // ],
    ],
    section_resource_count: [
      () => [selectors.stored_resources, selectors.resources],
      (stored_resources, resources) => {
        let counts = resources.map(resource => {
          return {
            [resource.id]: R.reduce(
              (acc, value) => {
                return acc + (stored_resources[value.id] || 0)
              },
              0,
              resource.data
            ),
          }
        })
        return R.mergeAll(counts)
      },
      PropTypes.object,
      // Structure:
      // {
      //   'basic': 12, // id of section/type : number of resources
      //   // ...
      // }
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
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  resourceText: { paddingRight: 5 },
  content: {},
}

export default connectedResources
