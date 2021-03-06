import React from 'react'
import { View, Text, Divider, Button } from '@shoutem/ui'
import MultiSelectList from '../components/common/MultiSelectList'
import Modal from 'react-native-modal'
import { observer, inject } from 'mobx-react'
import { values } from 'mobx'

import colors from '../src/colors'

export default inject(({ store }) => ({
  expansions: values(store.expansions),
  selectedItems: store.selectedCampaign.expansions.toJS(),
  toggle: store.selectedCampaign.selectExpansion,
  expansionContent: store.selectedCampaign.expansionContent,
}))(
  observer(
    class Expansions extends React.Component {
      constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
      }

      state = {
        showAlert: false,
        content: {
          locations: [],
          innovations: [],
          resources: [],
        },
        expansion: {
          name: '',
        },
      }

      toggle(expansion) {
        let content = this.props.expansionContent(expansion)
        if (expansion.id !== 'core' && content.length > 0) {
          // removing this campaign will cause to loose data!
          this.setState({ content, showAlert: true, expansion })
        } else {
          this.props.toggle(expansion)
        }
      }

      render() {
        return (
          <View>
            <MultiSelectList
              name="expansions"
              data={this.props.expansions}
              toggle={this.toggle}
              selected={this.props.selectedItems}
            />
            <Modal
              isVisible={this.state.showAlert}
              onBackdropPress={() => this.setState({ showAlert: false })}
              onBackButtonPress={() => this.setState({ showAlert: false })}
              useNativeDriver={true}
              backdropColor={colors.black}
            >
              <View
                style={{
                  backgroundColor: colors.grey900,
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}
              >
                <Text>
                  Are you sure you want to remove the{' '}
                  <Text style={styles.bold}>{this.state.expansion.name}</Text>{' '}
                  expansion?
                </Text>
                <Text>
                  The following items would be removed from your campaign:
                </Text>
                <Text />
                <Text>
                  - {this.state.content.locations.length} Settlement Locations
                </Text>
                <Text>
                  - {this.state.content.innovations.length} Innovations
                </Text>
                <Text>- {this.state.content.resources.length} Resources</Text>
                <Divider />
                <Button
                  onPress={() => {
                    this.props.toggle(this.state.expansion)
                    this.setState({ showAlert: false })
                  }}
                  style={styles.delete}
                >
                  <Text>DELETE</Text>
                </Button>
                <Divider />
                <Button onPress={() => this.setState({ showAlert: false })}>
                  <Text>Cancel</Text>
                </Button>
              </View>
            </Modal>
          </View>
        )
      }
    }
  )
)

const styles = {
  delete: {
    backgroundColor: colors.red800,
    borderColor: colors.red900,
  },
  bold: {
    fontWeight: 'bold',
  },
}
