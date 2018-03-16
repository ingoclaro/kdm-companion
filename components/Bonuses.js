import React from 'react'
import { View, Text, Row, Title, Subtitle, ListView } from '@shoutem/ui'
import { observer, inject } from 'mobx-react/native'
import PropTypes from 'prop-types'
import { constants } from '../src/reducers'
import colors from '../src/colors'
import R from 'ramda'

@inject(({ store }) => ({
  data: store.selectedCampaign.bonuses.values(),
}))
@observer
export default class Bonuses extends React.Component {
  _header() {
    return <Title>Bonuses</Title>
  }

  _row(item) {
    let text = item.description.map((e, idx) => (
      <Text key={item.id + idx} style={styles.bonusText}>
        {e}
      </Text>
    ))
    return (
      <View style={styles.bonus}>
        <Subtitle>{item.name}</Subtitle>
        {text}
      </View>
    )
  }

  render() {
    return (
      <ListView
        data={this.props.data}
        renderRow={this._row}
        renderHeader={this._header}
        autoHideHeader={false}
      />
    )
  }
}

const styles = {
  bonusText: {
    color: colors.grey500,
  },
  bonus: {
    paddingVertical: 3,
  },
}
