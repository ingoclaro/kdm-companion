import React from 'react'
import { View, Text, Image, Button, Caption } from '@shoutem/ui'
import { Platform, PixelRatio } from 'react-native'
import Markdown, { PluginContainer } from 'react-native-markdown-renderer'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

const ico_book = require('../../images/book.png')
const ico_movement = require('../../images/movement.png')

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
          let re = /{([^}]+)}/g // {book}, {whatever}
          let result
          while ((result = re.exec(token.content)) !== null) {
            if (!['book', 'movement'].includes(result[1])) {
              continue
            }
            let offset = re.lastIndex - (2 + result[1].length)
            let tok = new Token('text', '', token.nesting)
            tok.content = token.content.substring(index, offset)
            nodes.push(tok)

            let image = new Token('image', '', token.nesting)

            nodes.push(image)
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

  book(key) {
    const width = 14 * (Platform.OS === 'ios' ? 1 : PixelRatio.get())
    const height = 12 * (Platform.OS === 'ios' ? 1 : PixelRatio.get())
    return <Image key={key} source={ico_book} style={{ width, height }} />
  }

  movement(key) {
    const width = 12 * (Platform.OS === 'ios' ? 1 : PixelRatio.get())
    const height = 12 * (Platform.OS === 'ios' ? 1 : PixelRatio.get())
    return <Image key={key} source={ico_movement} style={{ width, height }} />
  }

  render() {
    return (
      <Markdown
        style={styles.markdown}
        rules={{
          book: (node, children, parent, styles) => this.book(node.key),
          movement: (node, children, parent, styles) => this.movement(node.key),
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
