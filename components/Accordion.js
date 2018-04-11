import React from 'react'
import {
  View,
  Text,
  Row,
  Title,
  Subtitle,
  Icon,
  TouchableOpacity,
} from '@shoutem/ui'
import { SectionList } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../src/colors'

export default class Accordion extends React.Component {
  constructor(props) {
    super(props)
    this._row = this._row.bind(this) // so that we can access this.props from within the function
    this._header = this._header.bind(this)
    this._sectionHeader = this._sectionHeader.bind(this)
    this._sectionClick = this._sectionClick.bind(this)
    this._defaultSectionHeader = this._defaultSectionHeader.bind(this)
  }

  state = {
    openSection: null,
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    renderContent: PropTypes.func, // @params: item
    renderHeader: PropTypes.func, // @params: section_id, isActive
  }

  _row(data) {
    if (this.state.openSection !== data.section.id) {
      return null
    }
    return this.props.renderContent ? (
      this.props.renderContent(data)
    ) : (
      <Text>{data.item.text}</Text>
    )
  }

  _header() {
    if (!this.props.title) {
      return null
    }
    return <Title>{this.props.title}</Title>
  }

  _sectionHeader(data) {
    let isActive = this.state.openSection === data.section.id
    let renderer = this.props.renderHeader
      ? this.props.renderHeader(data.section, isActive)
      : this._defaultSectionHeader(data.section, isActive)

    return (
      <TouchableOpacity onPress={() => this._sectionClick(data.section.id)}>
        {renderer}
      </TouchableOpacity>
    )
  }

  _defaultSectionHeader(section, isActive) {
    let icon = isActive ? (
      <Icon name="up-arrow" style={styles.headerArrow} />
    ) : (
      <Icon name="down-arrow" style={styles.headerArrow} />
    )

    return (
      <Row>
        <Title>{section.title}</Title>
        {icon}
      </Row>
    )
  }

  _sectionClick(section_id) {
    let openSection = section_id
    if (this.state.openSection === section_id) {
      openSection = null
    }
    this.setState({ openSection })
    // this.messagesSectionListRef.scrollToLocation({
    //   itemIndex: 1,
    //   sectionIndex: 1,
    // })
  }

  render() {
    const extraData = [this.state.openSection]
    return (
      <SectionList
        ref={ref => {
          this.messagesSectionListRef = ref
        }}
        sections={this.props.data}
        renderItem={this._row}
        renderSectionHeader={this._sectionHeader}
        extraData={extraData}
        keyExtractor={(item, index) => `accordion-item-${index}`}
      />
    )
  }
}

const styles = {
  headerArrow: {
    color: colors.grey100,
  },
}
