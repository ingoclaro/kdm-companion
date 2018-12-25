import React from 'react'
import { Icon } from '@shoutem/ui'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from 'react-native'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

export default class Accordion extends React.Component {
  state = {
    openSection: null,
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    renderContent: PropTypes.func, // @params: item
    renderHeader: PropTypes.func, // @params: section_id, isActive
  }

  _row = data => {
    if (this.state.openSection !== data.section.id) {
      return null
    }
    return this.props.renderContent ? (
      this.props.renderContent(data)
    ) : (
      <Text style={styles.text}>{data.item.text}</Text>
    )
  }

  _header = () => {
    if (!this.props.title) {
      return null
    }
    return <Text styles={[styles.text, styles.title]}>{this.props.title}</Text>
  }

  _sectionHeader = data => {
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

  _defaultSectionHeader = (section, isActive) => {
    let icon = isActive ? (
      <Icon name="up-arrow" style={styles.headerArrow} />
    ) : (
      <Icon name="down-arrow" style={styles.headerArrow} />
    )

    return (
      <View style={styles.row}>
        <Text style={[styles.text, styles.title, styles.sectionTitle]}>
          {section.title}
        </Text>
        {icon}
      </View>
    )
  }

  _sectionClick = section_id => {
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

const styles = StyleSheet.create({
  headerArrow: {
    color: colors.grey100,
    marginRight: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.grey900,
  },
  title: {
    fontSize: 20,
  },
  text: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    color: colors.grey100,
  },
  sectionTitle: {
    flex: 1,
    lineHeight: 25,
  },
})
