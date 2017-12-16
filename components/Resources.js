import React from 'react'
import { Screen, View, Text, Title, Image, DropDownMenu } from '@shoutem/ui'
import ItemCounter from '../components/ItemCounter'

import gameData from '../src/data'

class Resources extends React.Component {
  constructor(props) {
    super(props)

    const resources = gameData.resources
    const resourcesList = Object.keys(resources)
      .sort()
      .map(key => {
        return { id: key, title: key }
      })
    resourcesList.unshift({ id: 'select', title: 'Add Resource' })
    this.state = {
      resourcesList,
      selectedList: [],
    }

    this.onOptionSelected = this.onOptionSelected.bind(this)
    this.noItem = this.noItem.bind(this)
  }

  onOptionSelected(option) {
    this.setState(prevState => {
      return {
        selectedList: [...prevState.selectedList, option],
      }
    })
  }

  noItem(id) {
    this.setState(prevState => {
      return {
        selectedList: prevState.selectedList.filter(e => e.id !== id),
      }
    })
  }

  render() {
    return (
      <View>
        <Title>Resources</Title>
        <DropDownMenu
          styleName="horizontal"
          options={this.state.resourcesList}
          titleProperty="title"
          valueProperty="id"
          selectedOption={this.state.resourcesList[0]}
          onOptionSelected={this.onOptionSelected}
        />
        {this.state.selectedList.map(item => {
          return (
            <ItemCounter
              key={item.id}
              id={item.id}
              name={item.title}
              noItem={this.noItem}
            />
          )
        })}
      </View>
    )
  }
}

export default Resources
