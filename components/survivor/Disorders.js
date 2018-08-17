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
} from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import R from 'ramda'
import Modal from 'react-native-modal'
import colors from '../../src/colors'

@inject(({ store }) => ({
  availableDisorders: store.availableDisorders,
}))
@observer
export default class Disorders extends React.Component {
  constructor(props) {
    super(props)

    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.disorderDropdown = this.disorderDropdown.bind(this)
    this.disorders = this.disorders.bind(this)
  }

  state = {
    visible: false,
  }

  showEditor() {
    this.setState({ visible: true })
  }

  hideEditor() {
    this.setState({ visible: false })
  }

  disorderDropdown() {
    if (this.props.disorders.length >= 3) {
      return null
    }

    const disorders = [
      { name: 'Select Disorder', id: null },
      ...this.props.availableDisorders,
    ]

    let selected = disorders[0]

    return (
      <DropDownMenu
        options={disorders}
        selectedOption={selected}
        onOptionSelected={item => this.props.addDisorder(item)}
        titleProperty="name"
        valueProperty="id"
      />
    )
  }

  disorders(editable = false) {
    let list = this.props.disorders.map(disorder => (
      <View styleName="horizontal" key={disorder.id}>
        <Text>{disorder.name}</Text>
        {editable && (
          <Button
            styleName="textual"
            style={{ alignSelf: 'flex-start' }}
            onPress={() => {
              this.props.removeDisorder(disorder)
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
          <Title>Disorders</Title>
          <Icon name="right-arrow" />
        </Button>
        <View styleName="horizontal">{this.disorders()}</View>

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={() => this.hideEditor()}
          onBackButtonPress={() => this.hideEditor()}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View style={styles.propertyLine}>
            {this.disorders(true)}
            {this.disorderDropdown()}
          </View>
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
