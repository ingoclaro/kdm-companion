import React from 'react'
import { View, Text, Subtitle, Title } from '@shoutem/ui'
import SimpleStepper from 'react-native-simple-stepper'
import PropTypes from 'prop-types'
import colors from '../src/colors'

export default class StatItem extends React.Component {
  state = {
    value: 0,
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    baseValue: PropTypes.number,
  }

  static defaultProps = {
    baseValue: 0,
  }

  render() {
    let total = this.props.baseValue + this.state.value

    return (
      <View style={styles.stat}>
        <Title style={styles.name}>{this.props.name}: </Title>
        <View style={styles.numberContainer}>
          <Title style={styles.total}>{total}</Title>
          <Subtitle style={styles.baseValue}>
            ({this.props.baseValue} + {this.state.value})
          </Subtitle>
        </View>
        <SimpleStepper
          tintColor="white"
          initialValue={this.state.value}
          minimumValue={-10}
          valueChanged={value => this.setState({ value })}
          style={styles.stepper}
        />
      </View>
    )
  }
}

const styles = {
  name: {
    paddingRight: 5,
    flex: 5,
  },
  baseValue: {
    color: colors.grey500,
  },
  total: {
    color: colors.grey100,
    paddingRight: 5,
  },
  numberContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  stepper: {
    flex: 2,
    right: 5,
  },
}
