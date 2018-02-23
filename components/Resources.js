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

class Resources extends React.Component {
  constructor(props) {
    super(props)
    this._renderContent = this._renderContent.bind(this) // so that we can access this.props from within the function
    this._renderHeader = this._renderHeader.bind(this)
    // this.sectionResources = this.sectionResources.bind(this)
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

  // sectionResources(section_id) {
  //   return R.filter(resource => {
  //     return resource.monster === section_id || resource.type === section_id
  //   })(this.props.resources)
  // }

  _renderHeader(section, isActive) {
    let icon = isActive ? (
      <Icon name="up-arrow" style={styles.headerArrow} />
    ) : (
      <Icon name="down-arrow" style={styles.headerArrow} />
    )
    // let items = this.sectionResources(section_id)

    // let number_of_resources = R.reduce(
    //   (acc, id) => acc + this.props.stored_resources[id],
    //   0,
    //   Object.keys(items)
    // )
    let number_of_resources = 1

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
}

const resourcesLogic = kea({
  path: () => ['scenes', 'resources'],
  connect: {
    props: [state => state, ['resources as global_resources']],
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
      () => [selectors.global_resources],
      global_resources => {
        let items = R.groupBy(R.prop('section'))(
          Array.from(Object.entries(global_resources), v => ({
            id: v[0],
            name: v[0],
            section: v[1].monster || v[1].type,
          }))
        )
        items = Array.from(Object.entries(items), v => ({
          id: v[0],
          title: v[0],
          data: v[1],
        }))
        return items
      },
      PropTypes.array,
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
