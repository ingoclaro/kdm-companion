import React from 'react'
import { View, Text, Image, Button, Caption } from '@shoutem/ui'
import { MarkdownView } from 'react-native-markdown-view'
import PropTypes from 'prop-types'
import colors from '../src/colors'

export default class RichText extends React.Component {
  render() {
    return (
      <MarkdownView
        styles={styles.markdown}
        rules={{
          book: {
            match: (source, state, lookbehind) => /{book}/.exec(source),
            parse: (match, nestedParse, state) => ({ content: [] }),
            render: (node, output, state, styles) => (
              <Image source={ico_book} style={{ width: 14, height: 14 }} />
            ),
          },
        }}
      >
        {this.props.children}
      </MarkdownView>
    )
  }
}

const styles = {
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
