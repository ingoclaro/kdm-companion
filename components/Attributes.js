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
import Modal from 'react-native-modal'
import colors from '../src/colors'

@inject(({ store }) => ({
  fightingArts: store.availableFightingArts,
  // selectedItems: store.selectedCampaign.innovations.toJS(),
  // toggle: store.selectedCampaign.selectInnovation,
}))
@observer
export default class Attributes extends React.Component {
  constructor(props) {
    super(props)
    this.showEditor = this.showEditor.bind(this)
  }

  state = {
    visible: false,
  }

  showEditor() {
    this.setState({ visible: true })
  }

  render() {
    const fightingArts = [
      { name: 'Select Fighting Art', id: null },
      ...this.props.fightingArts,
    ]

    let selected = fightingArts[0]

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
        <View styleName="horizontal">
          <Text>FA1</Text>
          <Text>FA2</Text>
          <Text>FA3</Text>
        </View>

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={() => this.setState({ visible: false })}
          onBackButtonPress={() => this.setState({ visible: false })}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View style={styles.propertyLine}>
            <DropDownMenu
              options={fightingArts}
              selectedOption={selected}
              onOptionSelected={item => this.props.select('fightingArt1', item)}
              titleProperty="name"
              valueProperty="id"
            />
            <DropDownMenu
              options={fightingArts}
              selectedOption={selected}
              onOptionSelected={item => this.props.select('fightingArt1', item)}
              titleProperty="name"
              valueProperty="id"
            />
            <DropDownMenu
              options={fightingArts}
              selectedOption={selected}
              onOptionSelected={item => this.props.select('fightingArt1', item)}
              titleProperty="name"
              valueProperty="id"
            />
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
