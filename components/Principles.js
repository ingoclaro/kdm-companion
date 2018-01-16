import React from 'react'
import {
  Screen,
  View,
  Text,
  Subtitle,
  Image,
  DropDownMenu,
  Divider,
  Row,
} from '@shoutem/ui'

class Principles extends React.Component {
  state = {
    death: [
      { title: 'None', value: 'none' },
      { title: 'Graves', value: 'graves' },
      { title: 'Cannibalism', value: 'cannibalism' },
    ],
    newlife: [
      { title: 'None', value: 'none' },
      { title: 'Protect the Young', value: 'pty' },
      { title: 'Survival of the Fittest', value: 'sotf' },
    ],
  }

  render() {
    return (
      <View>
        <Row>
          <Subtitle>Death:</Subtitle>
          <DropDownMenu
            options={this.state.death}
            selectedOption={
              this.state.selectedDeath
                ? this.state.selectedDeath
                : this.state.death[0]
            }
            onOptionSelected={death => this.setState({ selectedDeath: death })}
            titleProperty="title"
            valueProperty="value"
          />
        </Row>

        <Row>
          <Subtitle>New Life:</Subtitle>
          <DropDownMenu
            options={this.state.newlife}
            selectedOption={
              this.state.selectedNewlife
                ? this.state.selectedNewlife
                : this.state.newlife[0]
            }
            onOptionSelected={newlife =>
              this.setState({ selectedNewlife: newlife })
            }
            titleProperty="title"
            valueProperty="value"
          />
        </Row>

        <Row>
          <Subtitle>Society:</Subtitle>
          <DropDownMenu
            options={this.state.newlife}
            selectedOption={
              this.state.selectedNewlife
                ? this.state.selectedNewlife
                : this.state.newlife[0]
            }
            onOptionSelected={newlife =>
              this.setState({ selectedNewlife: newlife })
            }
            titleProperty="title"
            valueProperty="value"
          />
        </Row>

        <Row>
          <Subtitle>Conviction:</Subtitle>
          <DropDownMenu
            options={this.state.newlife}
            selectedOption={
              this.state.selectedNewlife
                ? this.state.selectedNewlife
                : this.state.newlife[0]
            }
            onOptionSelected={newlife =>
              this.setState({ selectedNewlife: newlife })
            }
            titleProperty="title"
            valueProperty="value"
          />
        </Row>
      </View>
    )
  }
}

export default Principles
