import React from 'react'
import { View, Text, Subtitle, DropDownMenu, Row, Caption } from '@shoutem/ui'
import { observer, inject } from 'mobx-react'
import R from 'ramda'
import colors from '../../src/colors'

export default inject(({ store }) => ({
  selectedPrinciples: store.selectedCampaign.principles,
  select: store.selectedCampaign.selectPrinciple,
}))(
  observer(
    class Principles extends React.Component {
      state = {}

      principles = {
        death: [
          { title: 'None', id: null },
          { title: 'Graves', id: 'graves' },
          { title: 'Cannibalize', id: 'cannibalize' },
        ],
        newlife: [
          { title: 'None', id: null },
          { title: 'Protect the Young', id: 'pty' },
          { title: 'Survival of the Fittest', id: 'sotf' },
        ],
        society: [
          { title: 'None', id: null },
          { title: 'Accept Darkness', id: 'accept_darkness' },
          { title: 'Collective Toil', id: 'collective_toil' },
        ],
        conviction: [
          { title: 'None', id: null },
          { title: 'Barbaric', id: 'barbaric' },
          { title: 'Romantic', id: 'romantic' },
        ],
      }

      render() {
        let selectedDeath = R.find(
          item =>
            this.props.selectedPrinciples.death &&
            this.props.selectedPrinciples.death.id === item.id,
          this.principles.death
        )
        if (!selectedDeath) {
          selectedDeath = this.principles.death[0]
        }

        let selectedNewlife = R.find(
          item =>
            this.props.selectedPrinciples.newlife &&
            this.props.selectedPrinciples.newlife.id === item.id,
          this.principles.newlife
        )
        if (!selectedNewlife) {
          selectedNewlife = this.principles.newlife[0]
        }

        let selectedSociety = R.find(
          item =>
            this.props.selectedPrinciples.society &&
            this.props.selectedPrinciples.society.id === item.id,
          this.principles.society
        )
        if (!selectedSociety) {
          selectedSociety = this.principles.society[0]
        }

        let selectedConviction = R.find(
          item =>
            this.props.selectedPrinciples.conviction &&
            this.props.selectedPrinciples.conviction.id === item.id,
          this.principles.conviction
        )
        if (!selectedConviction) {
          selectedConviction = this.principles.conviction[0]
        }

        return (
          <View>
            <Row>
              <View>
                <Subtitle>Death:</Subtitle>
                <Text style={styles.bookPage}>(p.155)</Text>
              </View>
              <DropDownMenu
                options={this.principles.death}
                selectedOption={selectedDeath}
                onOptionSelected={death => this.props.select('death', death)}
                titleProperty="title"
                valueProperty="id"
              />
            </Row>

            <Row>
              <View>
                <Subtitle>New Life:</Subtitle>
                <Text style={styles.bookPage}>(p.157)</Text>
              </View>
              <DropDownMenu
                options={this.principles.newlife}
                selectedOption={selectedNewlife}
                onOptionSelected={newlife =>
                  this.props.select('newlife', newlife)
                }
                titleProperty="title"
                valueProperty="id"
              />
            </Row>

            <Row>
              <View>
                <Subtitle>Society:</Subtitle>
                <Text style={styles.bookPage}>(p.159)</Text>
              </View>
              <DropDownMenu
                options={this.principles.society}
                selectedOption={selectedSociety}
                onOptionSelected={society =>
                  this.props.select('society', society)
                }
                titleProperty="title"
                valueProperty="id"
              />
            </Row>

            <Row>
              <View>
                <Subtitle>Conviction:</Subtitle>
                <Text style={styles.bookPage}>(p.153)</Text>
              </View>
              <DropDownMenu
                options={this.principles.conviction}
                selectedOption={selectedConviction}
                onOptionSelected={conviction =>
                  this.props.select('conviction', conviction)
                }
                titleProperty="title"
                valueProperty="id"
              />
            </Row>
          </View>
        )
      }
    }
  )
)

export const PrinciplesItems = inject(({ store }) => ({
  selectedPrinciples: store.selectedCampaign.principles,
}))(
  observer(
    class PrinciplesItems extends React.Component {
      render() {
        let descriptions = []
        if (this.props.selectedPrinciples.death) {
          descriptions.push(this.props.selectedPrinciples.death.name)
        }
        if (this.props.selectedPrinciples.newlife) {
          descriptions.push(this.props.selectedPrinciples.newlife.name)
        }
        if (this.props.selectedPrinciples.society) {
          descriptions.push(this.props.selectedPrinciples.society.name)
        }
        if (this.props.selectedPrinciples.conviction) {
          descriptions.push(this.props.selectedPrinciples.conviction.name)
        }

        return (
          <View>
            <Row>
              {descriptions.length > 0 ? (
                <Caption>{descriptions.join(', ')}</Caption>
              ) : (
                <Caption>Tap title to add Principles...</Caption>
              )}
            </Row>
          </View>
        )
      }
    }
  )
)

const styles = {
  bookPage: {
    color: colors.grey800,
  },
}
