import React from 'react'
import { View, Text, Image, Button, Caption } from '@shoutem/ui'
import Markdown, { PluginContainer } from 'react-native-markdown-renderer'
import PropTypes from 'prop-types'
import colors from '../src/colors'

const ico_book = require('../images/book.png')

export default class RichText extends React.Component {
  replace(md, options) {
    return state => {
      const Token = state.Token

      for (let i = state.tokens.length - 1; i >= 0; i--) {
        const block = state.tokens[i]
        if (block.type !== 'inline') {
          continue
        }
        for (let j = block.children.length - 1; j >= 0; j--) {
          const token = block.children[j]
          if (token.type !== 'text') {
            continue
          }

          let nodes = []
          let index = 0
          let re = /{book}/g
          while (re.exec(token.content) !== null) {
            let offset = re.lastIndex - 6
            let tok = new Token('text', '', token.nesting)
            tok.content = token.content.substring(index, offset)
            nodes.push(tok)
            nodes.push(new Token('book', '', token.nesting))
            index = re.lastIndex
          }
          if (index > 0) {
            let tok = new Token('text', '', token.nesting)
            tok.content = token.content.substring(index)
            nodes.push(tok)
            block.children = md.utils.arrayReplaceAt(block.children, j, nodes)
          }
        }
      }
    }
  }

  render() {
    return (
      <Markdown
        style={styles.markdown}
        rules={{
          book: (node, children, parent, styles) => (
            <Image key={node.key} source={ico_book} style={{ flex: 1 }} />
          ),
        }}
        plugins={[
          new PluginContainer((md, options) => {
            md.core.ruler.push('kdm', this.replace(md, options))
          }, {}),
        ]}
      >
        {this.props.children}
      </Markdown>
    )
  }
}

const styles = {
  markdown: {
    text: {
      color: colors.grey500,
    },
    paragraph: {
      marginTop: 0,
      marginBottom: 0,
    },
    // listItemBullet: {
    //   color: colors.grey500,
    //   minWidth: 0,
    //   paddingRight: 8,
    // },
    // listItemUnorderedContent: {
    //   color: colors.grey500,
    // },
    // listItemUnorderedContent: {
    //   flex: -1,
    //   color: colors.grey500,
    // },
    // list: {
    //   margin: 0,
    //   marginLeft: 8,
    // },
  },
}
