import React from 'react'
import { View, Row, Caption } from '@shoutem/ui'
import MultiSelectList from '../common/MultiSelectList'
import { observer, inject } from 'mobx-react'

export default inject(({ store }) => ({
  innovations: store.availableInnovations,
  selectedItems: store.selectedCampaign.innovations.toJS(),
  toggle: store.selectedCampaign.selectInnovation,
}))(
  observer(
    class Innovations extends React.Component {
      render() {
        return (
          <MultiSelectList
            name="innovations"
            data={this.props.innovations}
            toggle={this.props.toggle}
            selected={this.props.selectedItems}
          />
        )
      }
    }
  )
)

export const InnovationsItems = inject(({ store }) => ({
  selectedItems: store.selectedCampaign.innovationsList,
}))(
  observer(
    class InnovationsItems extends React.Component {
      render() {
        return (
          <View>
            <Row>
              {this.props.selectedItems.length > 0 ? (
                <Caption>
                  {this.props.selectedItems.map(item => item.name).join(', ')}
                </Caption>
              ) : (
                <Caption>Tap title to add Innovations...</Caption>
              )}
            </Row>
          </View>
        )
      }
    }
  )
)
