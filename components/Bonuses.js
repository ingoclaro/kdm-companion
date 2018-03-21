import React from 'react'
import { View, Text, Row, Title, Subtitle, ListView } from '@shoutem/ui'
import { values } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import PropTypes from 'prop-types'
import { constants } from '../src/reducers'
import colors from '../src/colors'
import R from 'ramda'

@inject(({ store }) => ({
  data: values(store.selectedCampaign.bonuses),
}))
@observer
export default class Bonuses extends React.Component {
  _header() {
    return <Title>Bonuses</Title>
  }

  _row(item) {
    console.log('item', item)
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

  empty() {
    return (
      <View>
        <Title>Bonuses</Title>
        <Text>Add some Innovations to see Bonuses.</Text>
      </View>
    )
  }

  render() {
    if (this.props.data.length === 0) {
      return this.empty()
    }

    console.log('data', this.props.data)

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
