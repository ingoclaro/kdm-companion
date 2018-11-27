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
import Accordion from './common/Accordion'
import { SimpleStepper } from 'react-native-simple-stepper'
import { observer, inject } from 'mobx-react/native'
import { values } from 'mobx'
import PropTypes from 'prop-types'
import R from 'ramda'

import colors from '../src/colors'

function resources_structure(global_resources, settlement_resources, filter) {
  const sections = {
    basic: {
      id: 'basic',
      title: 'Basic',
      expansion: { id: 'core' },
      count: 0,
      data: [],
    },
    strange: {
      id: 'strange',
      title: 'Strange',
      expansion: { id: 'core' },
      count: 0,
      data: [],
    },
    vermin: {
      id: 'vermin',
      title: 'Vermin',
      expansion: { id: 'core' },
      count: 0,
      data: [],
    },
    white_lion: {
      id: 'white_lion',
      title: 'White Lion',
      expansion: { id: 'core' },
      count: 0,
      data: [],
    },
    screaming_antelope: {
      id: 'screaming_antelope',
      title: 'Screaming Antelope',
      expansion: { id: 'core' },
      count: 0,
      data: [],
    },
    phoenix: {
      id: 'phoenix',
      title: 'Phoenix',
      expansion: { id: 'core' },
      count: 0,
      data: [],
    },
    gorm: {
      id: 'gorm',
      title: 'Gorm',
      expansion: { id: 'gorm' },
      count: 0,
      data: [],
    },
    dbk: {
      id: 'dbk',
      title: 'Dung Beetle Knight',
      expansion: { id: 'dbk' },
      count: 0,
      data: [],
    },
    fk: {
      id: 'fk',
      title: 'Flower Knight',
      expansion: { id: 'fk' },
      count: 0,
      data: [],
    },
    spidicules: {
      id: 'spidicules',
      title: 'Spidicules',
      expansion: { id: 'spidicules' },
      count: 0,
      data: [],
    },
    sunstalker: {
      id: 'sunstalker',
      title: 'Sunstalker',
      expansion: { id: 'sunstalker' },
      count: 0,
      data: [],
    },
    dk: {
      id: 'dk',
      title: 'Dragon King',
      expansion: { id: 'dk' },
      count: 0,
      data: [],
    },
    //TODO: check if all monsters that have resources are here
  }

  const data = R.reduce(
    (acc, value) => {
      if (!value.section_id || !acc[value.section_id]) {
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
    filter(sections),
    filter(global_resources)
  )

  return Object.values(data)
}

@inject(({ store }) => ({
  resources: resources_structure(
    store.resources,
    store.selectedCampaign.stored_resources,
    store.selectedExpansionFilter
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

  static propTypes = {
    resources: PropTypes.array.isRequired,
    // Structure: (can't be changed because it's needed like that for a native component)
    // [
    //   {
    //     id: 'basic', // id of section/type
    //     title: 'Basic', // title of type
    //     data: [ // array of items
    //       {
    //         id: 'skull', // id of resource
    //         name: 'skull', // name of resource
    //       }
    //     ]
    //   },
    // ],
    stored_resources: PropTypes.object.isRequired,
    setResourceCount: PropTypes.func.isRequired, // (resource, count)
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
          value={quantity}
          imageHeight={24}
          imageWidth={24}
          padding={4}
          valueChanged={value => {
            this.props.setResourceCount(data.item, value)
          }}
          style={styles.stepper}
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
  stepper: {
    alignSelf: 'end',
  },
}
