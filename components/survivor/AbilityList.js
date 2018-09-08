import React from 'react'
import { View, Text, Button, Icon } from '@shoutem/ui'
import RichText from '../common/RichText'
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
            <View styleName="horizontal v-center">
              <Text>{item.name}</Text>
              {this.props.editable && (
                <Button
                  styleName="clear"
                  onPress={() => {
                    this.props.removeItem(item)
                  }}
                >
                  <Icon name="clear-text" style={{ color: colors.grey100 }} />
                </Button>
              )}
            </View>
            {this.props.showDescription && (
              <RichText>{item.description}</RichText>
            )}
          </View>
        ))}
      </View>
    )
  }
}
