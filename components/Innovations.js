import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'
import MultiSelectList, {
  MultiSelectItems,
} from '../components/MultiSelectList'
import { kea } from 'kea'
import PropTypes from 'prop-types'

class Innovations extends React.Component {
  render() {
    const innovationList = Array.from(
      Object.entries(this.props.innovations),
      v => ({ id: v[0], title: v[1].name })
    )

    return <MultiSelectList name="innovations" data={innovationList} />
  }
}
Innovations.propTypes = {
  innovations: PropTypes.object.isRequired,
}

// get props from the store
const connectedInnovations = kea({
  connect: {
    props: [state => state, ['innovations']],
  },
})(Innovations)

class InnovationsItems extends React.Component {
  render() {
    return (
      <MultiSelectItems
        name="innovations"
        emptyText="Tap title to add Innovations..."
      />
    )
  }
}

export default connectedInnovations
export { InnovationsItems }
