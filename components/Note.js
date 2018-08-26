import React from 'react'
import {
  View,
  Text,
  Title,
  Button,
  Icon,
  Divider,
  TextInput,
} from '@shoutem/ui'
import Modal from 'react-native-modal'
import { observer } from 'mobx-react/native'
import PropTypes from 'prop-types'
import colors from '../src/colors'

import { MarkdownView } from 'react-native-markdown-view'

@observer
export default class Note extends React.Component {
  constructor(props) {
    super(props)

    this.state.notes = this.props.notes

    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  state = {
    visible: false,
    notes: '',
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    saveNote: PropTypes.func, // @params: notes
  }

  static defaultProps = {
    title: 'Undefined',
    notes: '',
  }

  showEditor() {
    this.setState({ visible: true })
  }

  hideEditor() {
    this.setState({ visible: false })
  }

  onSave() {
    this.props.saveNote(this.state.notes)
    this.hideEditor()
  }

  //TODO: make text editor.
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

        <MarkdownView styles={styles.markdown}>{this.props.notes}</MarkdownView>

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={() => this.hideEditor()}
          onBackButtonPress={() => this.hideEditor()}
          useNativeDriver={true}
          backdropColor={colors.black}
        >
          <View style={styles.modal}>
            <TextInput
              style={styles.textInput}
              value={this.state.notes}
              multiline={true}
              autoFocus={true}
              onChangeText={notes => this.setState({ notes })}
            />

            <Divider />

            <Button onPress={this.onSave}>
              <Text>Save</Text>
            </Button>

            <Divider />

            <Button onPress={() => this.hideEditor()}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = {
  modal: {
    backgroundColor: colors.grey900,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  textInput: {
    height: 200,
    borderColor: colors.grey700,
    borderWidth: 1,
    selectionColor: colors.grey800,
    textAlignVertical: 'top',
  },
  markdown: {
    paragraph: {
      color: colors.grey500,
      marginTop: 0,
      marginBottom: 0,
    },
    listItemBullet: {
      color: colors.grey500,
      minWidth: 0,
      paddingRight: 8,
    },
    listItemUnorderedContent: {
      color: colors.grey500,
    },
    listItemUnorderedContent: {
      flex: -1,
      color: colors.grey500,
    },
    // list: {
    //   margin: 0,
    //   marginLeft: 8,
    // },
  },
}
