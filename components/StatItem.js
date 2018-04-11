import React from 'react'
import { View, Text, Title } from '@shoutem/ui'
import SimpleStepper from 'react-native-simple-stepper'
import PropTypes from 'prop-types'

export default class StatItem extends React.Component {
  state = {
    value: 0,
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    baseValue: PropTypes.number.isRequired,
  }

  static defaultProps = {
    baseValue: 0,
  }

  render() {
    let total = this.props.baseValue + this.state.value

    return (
      <View style={styles.stat}>
        <Title style={styles.itemText}>
          {this.props.name}: {this.props.baseValue} + {this.state.value} ={' '}
          {total}
        </Title>
        <SimpleStepper
          tintColor="white"
          initialValue={this.state.value}
          valueChanged={value => this.setState({ value })}
          style={styles.stepper}
        />
        {
          //TODO: add minValue -10
        }
      </View>
    )
  }
}

const styles = {
  itemText: {
    // paddingRight: 5,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  stepper: {
    // alignSelf: 'end',
  },
}
