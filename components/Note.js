import React from 'react'
import { View, Text, Title, Button, Icon } from '@shoutem/ui'
import Modal from 'react-native-modal'
import { observer } from 'mobx-react/native'
import colors from '../src/colors'

import { MarkdownView } from 'react-native-markdown-view'

@observer
export default class Note extends React.Component {
  constructor(props) {
    super(props)

    // this.setState({ notes: this.props.notes }) //TODO: move this line to the proper hook.

    this.showEditor = this.showEditor.bind(this)
    this.hideEditor = this.hideEditor.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  state = {
    visible: false,
    notes: '',
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
          <View style={styles.propertyLine}>
            <Text>{this.props.notes}</Text>
          </View>

          <Button onPress={this.onSave}>
            <Text>Save</Text>
          </Button>

          <Button onPress={() => this.hideEditor()}>
            <Text>Cancel</Text>
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
