import React from 'react'
import {
  Screen,
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Row,
  Caption,
  Divider,
} from '@shoutem/ui'
import { ScrollView } from 'react-native'
import { observer, inject } from 'mobx-react/native'

import Modal from 'react-native-modal'
import colors from '../src/colors'

import Survivor from '../components/survivor/Survivor'
import EditStats from '../components/survivor/EditStats'

// TODO: show severe injury buttons (brain, body icons?)
// TODO: change severe tables to be able to select the injury + confirmation? + auto apply effects to survivor.
@inject(({ store }, props) => ({
  survivorList: store.selectedCampaign.settlement.activeSurvivorsList,
}))
@observer
export default class SurvivorShowdownScreen extends React.Component {
  constructor(props) {
    super(props)
    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setParams({ editSurvivor: this.editSurvivor })
    if (this.props.navigation.getParam('edit') === true) {
      this.setState({ visible: true })
    }
  }

  editSurvivor = () => {
    this.showEditor()
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

  render() {
    const survivor = this.props.survivorList[
      this.props.navigation.getParam('survivorPosition')
    ]
    return (
      <Screen style={styles.screen}>
        <ScrollView>
          <Title>{survivor.name}</Title>
          <Survivor survivorId={survivor.id} />
        </ScrollView>
      </Screen>
    )
  }
}

const styles = {
  screen: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  modal: {
    backgroundColor: colors.grey900,
    padding: 8,
  },
}
