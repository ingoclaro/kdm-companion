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

    return (
      <MultiSelectList
        name="innovations"
        data={this.props.innovationList}
        toggle={toggle}
        selected={this.props.selectedItems}
      />
    )
  }
}
Innovations.propTypes = {
  innovationList: PropTypes.array.isRequired,
}

const innovationLogic = kea({
  path: () => ['scenes', 'innovations'],
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
  selectors: ({ selectors }) => ({
    innovationList: [
      () => [selectors.innovations],
      innovations => {
        return Array.from(Object.entries(innovations), v => ({
          id: v[0],
          title: v[1].name,
        }))
      },
      PropTypes.array,
    ],
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
        selectedItems={this.props.selectedItems}
        items={this.props.innovations}
      />
    )
  }
}
const itemsLogic = kea({
  connect: {
    props: [
      state => state,
      ['innovations'],
      innovationLogic,
      ['selectedItems'],
    ],
  },
})
const connectedInnovationsItems = itemsLogic(InnovationsItems)

export default connectedInnovations
export { connectedInnovationsItems as InnovationsItems }
