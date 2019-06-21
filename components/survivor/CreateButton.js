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
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

// TODO: this could be changed to instead create an empty survivor and pass the survivor as a param
// then a save button to attach that survivor to the Settlement, cancel to discard the survivor.
// (survivor to be stored in the component's state). Similar to edit, a clone can be used and a save to commit the changes
// save = () => applySnapshot(survivor, getSnapshot(this.state.survivor))
// see https://egghead.io/lessons/react-create-an-entry-form-to-add-models-to-the-state-tree
export default inject(({ store }) => ({
  createSurvivor: store.selectedCampaign.settlement.createSurvivor,
}))(
  class CreateButton extends React.Component {
    constructor(props) {
      super(props)

      this.create = this.create.bind(this)
    }

    create() {
      let survivor = this.props.createSurvivor()
      this.props.navigate(survivor.id, true)
    }

    render() {
      return (
        <Button onPress={this.create}>
          <Text>Create</Text>
        </Button>
      )
    }
  }
)

const styles = {}
