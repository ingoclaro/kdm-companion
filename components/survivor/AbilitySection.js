import React from 'react'
import {
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Caption,
  DropDownMenu,
  Divider,
} from '@shoutem/ui'
import R from 'ramda'
import Modal from 'react-native-modal'
import { observer } from 'mobx-react/native'
import PropTypes from 'prop-types'
import AbilityList from './AbilityList'
import colors from '../../src/colors'

@observer
export default class AbilitySection extends React.Component {
  constructor(props) {
    super(props)

    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.dropdown = this.dropdown.bind(this)
  }

  state = {
    visible: false,
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    dropdownTitle: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired, // items selected
    availableItems: PropTypes.array.isRequired, // list of all items for the dropdown
    addItem: PropTypes.func.isRequired, // @params item: item to add to selected list
    removeItem: PropTypes.func.isRequired, // @params item: item to remove from selected list
    additionalDropdownTitle: PropTypes.string,
    additionalAvailableItems: PropTypes.array,
    limit: PropTypes.number,
    disabled: PropTypes.bool, // disable the widget
  }

  static defaultProps = {
    title: 'Undefined',
    dropdownTitle: 'Select Undefined',
    additionalDropdownTitle: 'Select Undefined',
    items: [],
    availableItems: [],
    additionalAvailableItems: [],
    limit: 3,
    disabled: false,
  }

  showEditor() {
    this.setState({ visible: true })
  }

  hideEditor() {
    this.setState({ visible: false })
  }

  dropdown(additional = false) {
    if (
      this.props.items.length >= this.props.limit ||
      (additional === true && this.props.additionalAvailableItems.length === 0)
    ) {
      return null
    }

    let items = []

    if (additional) {
      items = [
        { name: this.props.additionalDropdownTitle, id: null },
        ...this.props.additionalAvailableItems,
      ]
    } else {
      items = [
        { name: this.props.dropdownTitle, id: null },
        ...this.props.availableItems,
      ]
    }

    return (
      <DropDownMenu
        options={items}
        selectedOption={items[0]}
        onOptionSelected={item => this.props.addItem(item)}
        titleProperty="name"
        valueProperty="id"
      />
    )
  }

  render() {
    let titleStyle = this.props.disabled ? styles.titleDisabled : {}

    return (
      <View>
        <Button
          styleName="textual"
          style={{ alignSelf: 'flex-start' }}
          onPress={this.showEditor}
        >
          <Title style={titleStyle}>{this.props.title}</Title>
          <Icon name="right-arrow" />
        </Button>
        <AbilityList
          items={this.props.items}
          editable={false}
          showDescription={true}
        />

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={() => this.hideEditor()}
          onBackButtonPress={() => this.hideEditor()}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View style={styles.propertyLine}>
            <AbilityList
              items={this.props.items}
              editable={true}
              showDescription={false}
              removeItem={this.props.removeItem}
            />
            {this.dropdown()}
            {this.dropdown(true)}

            <Divider />
          </View>
          <Button onPress={() => this.hideEditor()}>
            <Text>Close</Text>
          </Button>
        </Modal>
      </View>
    )
  }
}

const styles = {
  propertyLine: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.grey900,
  },
  titleDisabled: {
    textDecorationLine: 'line-through',
  },
}
