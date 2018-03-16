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
import { observer, inject, Observer } from 'mobx-react/native'
import PropTypes from 'prop-types'
import R from 'ramda'

import colors from '../src/colors'

function resources_structure(global_resources, settlement_resources) {
  const sections = {
    basic: {
      id: 'basic',
      title: 'Basic',
      count: 0,
      data: [],
    },
    strange: {
      id: 'strange',
      title: 'Strange',
      count: 0,
      data: [],
    },
    vermin: {
      id: 'vermin',
      title: 'Vermin',
      count: 0,
      data: [],
    },
    white_lion: {
      id: 'white_lion',
      title: 'White Lion',
      count: 0,
      data: [],
    },
    screaming_antelope: {
      id: 'screaming_antelope',
      title: 'Screaming Antelope',
      count: 0,
      data: [],
    },
    phoenix: {
      id: 'phoenix',
      title: 'Phoenix',
      count: 0,
      data: [],
    },
  }

  const data = R.reduce(
    (acc, value) => {
      if (!value.section_id || !sections[value.section_id]) {
        return acc
      }

      let stored_resource = settlement_resources.get(value.id)
      let amount = stored_resource ? stored_resource.quantity : 0
      let key = value.section_id

      return {
        ...acc,
        [key]: {
          ...acc[key],
          count: acc[key].count + amount,
          data: [...acc[key].data, value],
        },
      }
    },
    sections,
    global_resources.values()
  )

  return Object.values(data)
}

@inject(({ store }) => ({
  resources: resources_structure(
    store.resources,
    store.selectedCampaign.stored_resources
  ),
  stored_resources: store.selectedCampaign.stored_resources,
  setResourceCount: store.selectedCampaign.setResourceCount,
}))
@observer
export default class Resources extends React.Component {
  constructor(props) {
    super(props)
    this._renderContent = this._renderContent.bind(this) // so that we can access this.props from within the function
    this._renderHeader = this._renderHeader.bind(this)
  }

  _renderHeader(section, isActive) {
    let icon = isActive ? (
      <Icon name="up-arrow" style={styles.headerArrow} />
    ) : (
      <Icon name="down-arrow" style={styles.headerArrow} />
    )

    let number_of_resources = section.count

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
    // const { change } = this.actions
    let item = this.props.stored_resources.get(data.item.id)
    const quantity = item ? item.quantity : 0

    return (
      <View style={styles.resourceRow}>
        <Text style={styles.resourceText}>
          {quantity} - {data.item.name}
        </Text>

        <SimpleStepper
          tintColor="white"
          initialValue={quantity}
          valueChanged={value => {
            this.props.setResourceCount(data.item, value)
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
Resources.wrappedComponent.propTypes = {
  resources: PropTypes.array.isRequired,
  // Structure: (can't be changed because it's needed like that for a native component)
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
  stored_resources: PropTypes.object.isRequired,
  setResourceCount: PropTypes.func.isRequired, // (resource, count)
}

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
