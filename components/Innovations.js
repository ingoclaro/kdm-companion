import React from 'react'
import { Screen, View, Text, Image } from '@shoutem/ui'
import MultiSelectList, {
  MultiSelectItems,
} from '../components/MultiSelectList'
import { kea } from 'kea'
import PropTypes from 'prop-types'
import { constants } from '../src/reducers'

class Innovations extends React.Component {
  render() {
    const { toggle } = this.actions
    const innovationList = Array.from(
      Object.entries(this.props.innovations),
      v => ({ id: v[0], title: v[1].name })
    )

    return (
      <MultiSelectList
        name="innovations"
        data={innovationList}
        toggle={toggle}
        selected={this.props.selectedItems}
      />
    )
  }
}
Innovations.propTypes = {
  innovations: PropTypes.object.isRequired,
}

const innovationLogic = kea({
  connect: {
    props: [state => state, ['innovations']],
  },
  actions: () => ({
    toggleItem: id => ({ id }),
  }),
  reducers: ({ actions }) => ({
    selectedItems: [
      {},
      PropTypes.object,
      {
        [actions.toggleItem]: (state, payload) => {
          return { ...state, [payload.id]: !state[payload.id] }
        },
      },
    ],
  }),
  thunks: ({ actions, get, fetch, dispatch, getState }) => ({
    toggle: innovation => {
      let selectedItems = get('selectedItems')
      let isSelected = selectedItems[innovation.id]
      let action = isSelected ? constants.REMOVE_DATA : constants.ADD_DATA
      let state = getState()
      let hasExpand =
        state.innovations[innovation.id] &&
        state.innovations[innovation.id]['expand']

      if (hasExpand) {
        dispatch({
          type: action,
          payload: state.innovations[innovation.id]['expand'],
        })
      }

      actions.toggleItem(innovation.id)
    },
  }),
})

// get props from the store
const connectedInnovations = innovationLogic(Innovations)

class InnovationsItems extends React.Component {
  render() {
    return (
      <MultiSelectItems
        name="innovations"
        emptyText="Tap title to add Innovations..."
        items={this.props.selectedItems}
      />
    )
  }
}
const itemsLogic = kea({
  connect: {
    props: [innovationLogic, ['selectedItems']],
  },
})
const connectedInnovationsItems = itemsLogic(InnovationsItems)

export default connectedInnovations
export { connectedInnovationsItems as InnovationsItems }
