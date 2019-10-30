import React from 'react'
import { View, Text, Title, Subtitle, ListView } from '@shoutem/ui'
import { observer, inject } from 'mobx-react'
import colors from '../../src/colors'
import RichText from '../common/RichText'

export default inject(({ store }) => ({
  endeavors: store.selectedCampaign.endeavors,
}))(
  observer(
    class Endeavors extends React.Component {
      _header = () => {
        return <Title>Endeavors</Title>
      }

      _row = item => {
        return (
          <View style={styles.endeavor}>
            <Subtitle>
              {item.name} ({item.source.name})
            </Subtitle>
            <Text style={styles.recipe}>
              {item.recipe.items
                .map(item => {
                  return `${item.quantity} x ${item.name}`
                })
                .join(', ')}
            </Text>
            <RichText>{item.description}</RichText>
          </View>
        )
      }

      empty = () => {
        return (
          <View>
            <Title>Endeavors</Title>
            <Text>Add some Locations or Innovations to see Endeavors.</Text>
          </View>
        )
      }

      render() {
        if (this.props.endeavors.length === 0) {
          return this.empty()
        }

        return (
          <ListView
            data={this.props.endeavors}
            renderRow={this._row}
            renderHeader={this._header}
            autoHideHeader={false}
          />
        )
      }
    }
  )
)

const styles = {
  recipe: {
    color: colors.grey500,
  },
  endeavor: {
    paddingVertical: 3,
  },
}
