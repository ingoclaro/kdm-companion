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
import colors from '../../src/colors'

@observer
export default class AbilitySection extends React.Component {
  constructor(props) {
    super(props)

    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.dropdown = this.dropdown.bind(this)
    this.list = this.list.bind(this)
  }

  state = {
    visible: false,
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    dropdownTitle: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired, // items selected TODO: should be array, but since it's array of references it seems it's received as an object instead.
    availableItems: PropTypes.array.isRequired, // list of all items for the dropdown
    addItem: PropTypes.func.isRequired, // @params item: item to add to selected list
    removeItem: PropTypes.func.isRequired, // @params item: item to remove from selected list
  }

  static defaultProps = {
    title: 'Undefined',
    dropdownTitle: 'Select Undefined',
    items: [],
    availableItems: [],
  }

  showEditor() {
    this.setState({ visible: true })
  }

  hideEditor() {
    this.setState({ visible: false })
  }

  dropdown() {
    if (this.props.items.length >= 3) {
      return null
    }

    const items = [
      { name: this.props.dropdownTitle, id: null },
      ...this.props.availableItems,
    ]

    let selected = items[0]

    return (
      <DropDownMenu
        options={items}
        selectedOption={selected}
        onOptionSelected={item => this.props.addItem(item)}
        titleProperty="name"
        valueProperty="id"
      />
    )
  }

  list(editable = false) {
    let list = this.props.items.map(item => (
      <View styleName="horizontal" key={item.id}>
        <Text>{item.name}</Text>
        {editable && (
          <Button
            styleName="textual"
            style={{ alignSelf: 'flex-start' }}
            onPress={() => {
              this.props.removeItem(item)
            }}
          >
            <Text>X</Text>
          </Button>
        )}
      </View>
    ))

    return list
  }

  render() {
    return (
      <View>
        <Button
          styleName="textual"
          style={{ alignSelf: 'flex-start' }}
          onPress={this.showEditor}
        >
          <Title>{this.props.title}</Title>
          <Icon name="right-arrow" />
        </Button>
        <View>{this.list()}</View>

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={() => this.hideEditor()}
          onBackButtonPress={() => this.hideEditor()}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View style={styles.propertyLine}>
            {this.list(true)}
            {this.dropdown()}

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
}
