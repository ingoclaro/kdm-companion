import React from 'react'
import { View, Text, Subtitle, ListView } from '@shoutem/ui'
import { observer, inject } from 'mobx-react'
import RichText from '../common/RichText'

export default inject(({ store }) => ({
  data: store.selectedCampaign.bonuses,
}))(
  observer(
    class Bonuses extends React.Component {
      _row = item => (
        <View style={styles.bonus}>
          <Subtitle>{item.source.name}</Subtitle>
          <RichText>{item.description}</RichText>
        </View>
      )

      empty() {
        return <Text>Add some Innovations to see Bonuses.</Text>
      }

      render() {
        if (this.props.data.length === 0) {
          // return this.empty()
        }

        return (
          <ListView
            data={this.props.data}
            renderRow={this._row}
            autoHideHeader={false}
          />
        )
      }
    }
  )
)

const styles = {
  bonus: {
    paddingVertical: 3,
  },
}
