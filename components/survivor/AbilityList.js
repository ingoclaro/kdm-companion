import React from 'react'
import { View, Text, Button } from '@shoutem/ui'
import { MarkdownView } from 'react-native-markdown-view'
import PropTypes from 'prop-types'

import colors from '../../src/colors'

export default class AbilityList extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    showDescription: PropTypes.bool,
    removeItem: PropTypes.func,
    items: PropTypes.any.isRequired, //is an array, but mobx messes with it.
  }

  static defaultProps = {
    editable: false,
    showDescription: false,
  }

  render() {
    return (
      <View>
        {this.props.items.map(item => (
          <View key={item.id}>
            <View styleName="horizontal">
              <Text>{item.name}</Text>
              {this.props.editable && (
                <Button
                  styleName="textual"
                  style={{ alignSelf: 'flex-start' }}
                  onPress={() => {
                    this.props.removeItem(item)
                  }}
                >
                  <Text>X</Text>
                </Button>
              )}
            </View>
            {this.props.showDescription && (
              <MarkdownView styles={styles.markdown}>
                {item.description}
              </MarkdownView>
            )}
          </View>
        ))}
      </View>
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
