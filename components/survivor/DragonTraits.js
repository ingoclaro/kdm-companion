import React from 'react'
import {
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Caption,
  DropDownMenu,
  Divider,
} from '@shoutem/ui'
import RichText from '../common/RichText'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import colors from '../../src/colors'

@observer
export default class DragonTraits extends React.Component {
  traitTable() {
    const cellStyle = {
      [true]: styles.cellSel,
      [false]: styles.cell,
    }
    return (
      <View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell} />
            <View style={styles.cell}>
              <Text>Witch</Text>
            </View>
            <View style={styles.cell}>
              <Text>Rust</Text>
            </View>
            <View style={styles.cell}>
              <Text>Storm</Text>
            </View>
            <View style={styles.cell}>
              <Text>Reaper</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Gambler</Text>
            </View>
            <View
              style={cellStyle[this.props.survivor.dragonTraits.understanding]}
            >
              <Text style={styles.itemText}>9+ UND</Text>
            </View>
            <View style={cellStyle[this.props.survivor.dragonTraits.destined]}>
              <Text style={styles.itemText}>Destined Disorder</Text>
            </View>
            <View style={cellStyle[this.props.survivor.dragonTraits.fatedBlow]}>
              <Text style={styles.FAText}>Fated Blow</Text>
            </View>
            <View style={cellStyle[this.props.survivor.dragonTraits.pristine]}>
              <Text style={styles.abilityText}>Pristine</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Absolute</Text>
            </View>
            <View
              style={cellStyle[this.props.survivor.dragonTraits.reincarnated]}
            >
              <Text style={styles.surnameText}>Reincarnated</Text>
            </View>
            <View
              style={cellStyle[this.props.survivor.dragonTraits.frozenStar]}
            >
              <Text style={styles.FAText}>Frozen Star SFA</Text>
            </View>
            <View
              style={cellStyle[this.props.survivor.dragonTraits.iridescentHide]}
            >
              <Text style={styles.abilityText}>Iridescent Hide</Text>
            </View>
            <View
              style={cellStyle[this.props.survivor.dragonTraits.championsRite]}
            >
              <Text style={styles.FAText}>Champion's Rite</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Sculptor</Text>
            </View>
            <View style={cellStyle[this.props.survivor.dragonTraits.scar]}>
              <Text style={styles.itemText}>Scar</Text>
            </View>
            <View style={cellStyle[this.props.survivor.dragonTraits.noble]}>
              <Text style={styles.surnameText}>Noble</Text>
            </View>
            <View
              style={cellStyle[this.props.survivor.dragonTraits.weaponMaster]}
            >
              <Text style={styles.itemText}>Weapon Master</Text>
            </View>
            <View style={cellStyle[this.props.survivor.dragonTraits.accuracy]}>
              <Text style={styles.itemText}>1+ Accuracy</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Goblin</Text>
            </View>
            <View
              style={cellStyle[this.props.survivor.dragonTraits.oraclesEye]}
            >
              <Text style={styles.abilityText}>Oracle's Eye</Text>
            </View>
            <View
              style={cellStyle[this.props.survivor.dragonTraits.unbreakable]}
            >
              <Text style={styles.FAText}>Unbreakable</Text>
            </View>
            <View style={cellStyle[this.props.survivor.dragonTraits.strength]}>
              <Text style={styles.itemText}>3+ Strength</Text>
            </View>
            <View style={cellStyle[this.props.survivor.dragonTraits.courage]}>
              <Text style={styles.itemText}>9+ Courage</Text>
            </View>
          </View>
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.FATextLegend}>Fighting Art</Text>
          <Text style={styles.abilityTextLegend}>Ability</Text>
          <Text style={styles.surnameTextLegend}>Surname</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        <View styleName="horizontal v-center">
          <Title style={{ paddingRight: 5 }}>Dragon Traits</Title>
          {this.props.survivor.dragonTraits.hasCompleteTrait &&
            !this.props.survivor.dragonTraits.constellation && (
              <RichText>![book](book) Faces in the Sky (DK p.22)</RichText>
            )}
        </View>
        {this.props.survivor.dragonTraits.constellation ? (
          <Text>
            {this.props.survivor.dragonTraits.constellation} Constellation
          </Text>
        ) : (
          this.traitTable()
        )}
      </View>
    )
  }
}

const styles = {
  table: {},
  row: {
    flexDirection: 'row',
  },
  headerText: {},
  itemText: {
    fontSize: 12,
  },
  FAText: {
    fontSize: 12,
    color: colors.red800,
    // textShadowColor: colors.red800,
    // textShadowRadius: 10,
    // textShadowOffset: { width: 2, height: 1 },
  },
  FATextLegend: {
    fontSize: 9,
    color: colors.red800,
    // textShadowColor: colors.red800,
    // textShadowRadius: 10,
    // textShadowOffset: { width: 2, height: 1 },
    paddingHorizontal: 3,
  },
  abilityText: {
    fontSize: 12,
    color: colors.yellow600,
    // textShadowColor: colors.yellow600,
    // textShadowRadius: 10,
    // textShadowOffset: { width: 2, height: 1 },
  },
  abilityTextLegend: {
    fontSize: 9,
    color: colors.yellow600,
    // textShadowColor: colors.yellow600,
    // textShadowRadius: 10,
    // textShadowOffset: { width: 2, height: 1 },
    paddingHorizontal: 3,
  },
  surnameText: {
    fontSize: 12,
    color: colors.blue400,
    // textShadowColor: colors.blue400,
    // textShadowRadius: 5,
    // textShadowOffset: { width: 2, height: 1 },
  },
  surnameTextLegend: {
    fontSize: 9,
    color: colors.blue400,
    // textShadowColor: colors.blue400,
    // textShadowRadius: 5,
    // textShadowOffset: { width: 2, height: 1 },
    paddingHorizontal: 3,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 1,
  },
  cellSel: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 1,
    backgroundColor: colors.green900,
  },
  legendContainer: {
    flexDirection: 'row',
  },
}
