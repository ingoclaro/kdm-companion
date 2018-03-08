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

// function resources_structure(global_resources) {
//   let items = R.groupBy(R.prop('section'))(global_resources.values())
//   items = Array.from(Object.entries(items), v => ({
//     id: v[0],
//     title: types[v[0]] ? types[v[0]].name : v[0],
//     data: v[1],
//   }))
//   return items
// }

function resources_structure(global_resources) {
  let items = R.groupBy(R.prop('section'))(global_resources.values())
  items = Array.from(Object.entries(items), v => ({
    id: v[0],
    title: types[v[0]] ? types[v[0]].name : v[0],
    data: v[1],
  }))
  return items
}

function sectionCounts(stored_resources) {
  return R.reduce(
    (acc, value) => {
      return {
        ...acc,
        [value.resource.section]:
          (acc[value.resource.section] || 0) + value.quantity,
      }
    },
    {},
    stored_resources
  )
}

@inject(({ store }) => ({
  resources: resources_structure(store.resources),
  stored_resources: store.selectedCampaign
    ? store.selectedCampaign.stored_resources
    : {},
  setResourceCount: store.selectedCampaign.setResourceCount,
  sectionCounts: sectionCounts(
    store.selectedCampaign.stored_resources.values()
  ),
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

    let number_of_resources = this.props.sectionCounts[section.id] || 0

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
  section_resource_count: PropTypes.object.isRequired,
  // Structure:
  // {
  //   'Basic': 12, // name of section/type : number of resources
  //   // ...
  // }
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
