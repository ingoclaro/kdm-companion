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
  availableFightingArts: store.availableFightingArts,
}))
@observer
export default class FightingArts extends React.Component {
  constructor(props) {
    super(props)

    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.faDropdown = this.faDropdown.bind(this)
    this.fa = this.fa.bind(this)
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

  faDropdown() {
    if (this.props.fightingArts.length >= 3) {
      return null
    }

    const fightingArts = [
      { name: 'Select Fighting Art', id: null },
      ...this.props.availableFightingArts,
    ]

    let selected = fightingArts[0]

    return (
      <DropDownMenu
        options={fightingArts}
        selectedOption={selected}
        onOptionSelected={item => this.props.addFA(item)}
        titleProperty="name"
        valueProperty="id"
      />
    )
  }

  fa(editable = false) {
    let list = this.props.fightingArts.map(fa => (
      <View styleName="horizontal" key={fa.id}>
        <Text>{fa.name}</Text>
        {editable && (
          <Button
            styleName="textual"
            style={{ alignSelf: 'flex-start' }}
            onPress={() => {
              this.props.removeFA(fa)
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
          <Title>Fighting Arts</Title>
          <Icon name="right-arrow" />
        </Button>
        <View styleName="horizontal">{this.fa()}</View>

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={() => this.hideEditor()}
          onBackButtonPress={() => this.hideEditor()}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View style={styles.propertyLine}>
            {this.fa(true)}
            {this.faDropdown()}
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
