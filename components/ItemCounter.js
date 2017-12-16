import React from 'react'
import { Button, Row, Icon, Text, Image } from '@shoutem/ui'

class ItemCounter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: 1,
    }

    this.add = this.add.bind(this)
    this.substract = this.substract.bind(this)
  }

  add() {
    this.setState(prevState => {
      return { quantity: prevState.quantity + 1 }
    })
  }

  substract() {
    if (this.state.quantity === 0) {
      this.props.noItem(this.props.id)
    }

    this.setState(prevState => {
      if (prevState.quantity > 0) {
        return { quantity: prevState.quantity - 1 }
      }
    })
  }

  render() {
    return (
      <Row>
        <Button styleName="clear" onPress={this.substract}>
          <Icon name="minus-button" />
        </Button>
        <Text>{this.state.quantity}</Text>
        <Button styleName="clear" onPress={this.add}>
          <Icon name="plus-button" />
        </Button>
        <Text>{this.props.name}</Text>
      </Row>
    )
  }
}

export default ItemCounter
