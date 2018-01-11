import React from 'react'
import {
  Screen,
  View,
  Text,
  Title,
  Image,
  DropDownMenu,
  Divider,
} from '@shoutem/ui'

class Principles extends React.Component {
  state = {
    death: [
      { title: 'None', value: 'none' },
      { title: 'Graves', value: 'graves' },
      { title: 'Cannibalism', value: 'cannibalism' },
    ],
    children: [
      { title: 'None', value: 'none' },
      { title: 'Protect the Young', value: 'pty' },
      { title: 'Survival of the Fittest', value: 'sotf' },
    ],
  }

  render() {
    return (
      <View>
        <Title>Death</Title>
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

        <Divider />

        <Title>New Life</Title>
        <DropDownMenu
          options={this.state.children}
          selectedOption={
            this.state.selectedChild
              ? this.state.selectedChild
              : this.state.children[0]
          }
          onOptionSelected={children =>
            this.setState({ selectedChild: children })
          }
          titleProperty="title"
          valueProperty="value"
        />

        <Divider />

        <Title>Society</Title>

        <Divider />

        <Title>Conviction</Title>
      </View>
    )
  }
}

export default Principles
