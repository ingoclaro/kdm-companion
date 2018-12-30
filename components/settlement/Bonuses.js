import React from 'react'
import { View, Text, Row, Title, Subtitle, ListView } from '@shoutem/ui'
import { values } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import RichText from '../common/RichText'

import colors from '../../src/colors'
import { capitalize } from '../../src/utils'

@inject(({ store }) => ({
  data: store.selectedCampaign.bonuses,
}))
@observer
export default class Bonuses extends React.Component {
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

const styles = {
  bonus: {
    paddingVertical: 3,
  },
}
