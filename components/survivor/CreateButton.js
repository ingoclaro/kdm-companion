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
import Modal from 'react-native-modal'
import { inject } from 'mobx-react/native'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

@inject(({ store }) => ({
  createSurvivor: store.selectedCampaign.settlement.createSurvivor,
}))
export default class CreateButton extends React.Component {
  constructor(props) {
    super(props)

    this.create = this.create.bind(this)
  }

  create() {
    let survivor = this.props.createSurvivor()
    this.props.navigate(survivor.id)
  }

  render() {
    return (
      <Button onPress={this.create}>
        <Text>Create</Text>
      </Button>
    )
  }
}

const styles = {}
