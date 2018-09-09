import React from 'react'
import { View, Image, Button, Caption } from '@shoutem/ui'
import { Text } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import applyStyle from 'react-native-markdown-renderer/src/lib/util/applyStyle'
import FitImage from 'react-native-fit-image'
import Shield from './Shield'
import PropTypes from 'prop-types'
import colors from '../../src/colors'

const ico_book = require('../../images/book.png')
const ico_movement = require('../../images/movement.png')
const ico_action = require('../../images/action.png')
const ico_endeavor = require('../../images/endeavor.png')

export default class RichText extends React.Component {
  // rules = {
  //   book: (node, children, parent, styles) => this.book(node.key),
  //   movement: (node, children, parent, styles) => this.movement(node.key),
  // }
  // replace(md, options) {
  //   return state => {
  //     const Token = state.Token
  //
  //     for (let i = state.tokens.length - 1; i >= 0; i--) {
  //       const block = state.tokens[i]
  //       if (block.type !== 'inline') {
  //         continue
  //       }
  //       for (let j = block.children.length - 1; j >= 0; j--) {
  //         const token = block.children[j]
  //         if (token.type !== 'text') {
  //           continue
  //         }
  //
  //         let nodes = []
  //         let index = 0
  //         let re = /{([^}]+)}/g // {book}, {whatever}
  //         let result
  //         while ((result = re.exec(token.content)) !== null) {
  //           if (!['book', 'movement'].includes(result[1])) {
  //             continue
  //           }
  //           let offset = re.lastIndex - (2 + result[1].length)
  //           let tok = new Token('text', '', token.nesting)
  //           tok.content = token.content.substring(index, offset)
  //           nodes.push(tok)
  //
  //           let image = new Token(result[1], '', token.nesting)
  //
  //           nodes.push(image)
  //           index = re.lastIndex
  //         }
  //         if (index > 0) {
  //           let tok = new Token('text', '', token.nesting)
  //           tok.content = token.content.substring(index)
  //           nodes.push(tok)
  //           block.children = md.utils.arrayReplaceAt(block.children, j, nodes)
  //         }
  //       }
  //     }
  //   }
  // }

  icons = {
    book: { source: ico_book, style: { width: 14, height: 12 } },
    movement: { source: ico_movement },
    action: { source: ico_action },
    endeavor: { source: ico_endeavor },
  }

  render() {
    return (
      <Markdown
        style={styles.markdown}
        rules={{
          image: (node, children, parent, styles) => {
            if (this.icons[node.attributes.src]) {
              let style = { width: 12, height: 12 }
              if (this.icons[node.attributes.src].style) {
                style = this.icons[node.attributes.src].style
              }
              return (
                <FitImage
                  key={node.key}
                  style={style}
                  source={this.icons[node.attributes.src].source}
                />
              )
            }

            if (node.attributes.src === 'shield') {
              return <Shield key={node.key} value={node.content} />
            }

            return (
              <FitImage
                indicator={true}
                key={node.key}
                style={styles.image}
                source={{ uri: node.attributes.src }}
              />
            )
          },

          // TODO: fix that text after an image doesn't fit, it gets into a new line.

          // text: (node, children, parent, styles) => {
          //   return (
          //     <Text key={node.key} style={styles.text}>
          //       {node.content}
          //     </Text>
          //   )
          // },
          //
          // textgroup: (node, children, parent, styles) => {
          //   // if children doesn't have any images, group them together.
          //   return (
          //     <Text key={node.key} style={styles.text}>
          //       {children}
          //     </Text>
          //   )
          //
          //   // otherwise return as is to "fake" inline images.
          //   // return children
          // },
        }}
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
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  },
}
