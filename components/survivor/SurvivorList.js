import React from 'react'
import {
  View,
  Text,
  Title,
  Subtitle,
  Image,
  Icon,
  Button,
  Row,
  Caption,
  Divider,
} from '@shoutem/ui'
import AttributeSmall from './AttributeSmall'
import CheckboxListItem from '../common/CheckboxListItem'
import { TouchableOpacity } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'

import { Observer, observer, inject } from 'mobx-react/native'
import colors from '../../src/colors'

const ico_accuracy = require('../../images/icon_accuracy-24.png')
const ico_d10 = require('../../images/icon_d10-32.png')
const ico_evasion = require('../../images/icon_evasion-32.png')
const ico_female = require('../../images/female-32.png')
const ico_insanity = require('../../images/ico_insanity-32.png')
const ico_luck = require('../../images/icon_luck-24.png')
const ico_male = require('../../images/male-32.png')
const ico_movement = require('../../images/icon_movement-24.png')
const ico_strength = require('../../images/icon_strength-24.png')

const ico_skip_hunt = require('../../images/icon_skip_hunt.png')

@inject(({ store }) => ({
  deadSurvivors: store.selectedCampaign.settlement.filterSurvivors('dead'),
  aliveSurvivors: store.selectedCampaign.settlement.activeSurvivorsList,
  reorderSurvivor: store.selectedCampaign.settlement.reorderSurvivor,
}))
@observer
export default class SurvivorList extends React.Component {
  state = {
    selected: 'alive',
    data: [], // used for re-render only
  }

  survivorRow = ({ item, index, move, moveEnd, isActive }) => {
    let survivor = item
    let gender_icon = survivor.gender === 'male' ? ico_male : ico_female
    let rowStyle = index % 2 === 0 ? styles.oddRow : styles.evenRow
    return (
      <Observer>
        {() => (
          <TouchableOpacity onLongPress={move} onPressOut={moveEnd}>
            <View style={isActive ? styles.activeRow : rowStyle}>
              <Button
                styleName="textual"
                style={{ alignSelf: 'flex-start' }}
                onPress={() => this.props.navigate(survivor.id)}
              >
                <Image
                  source={gender_icon}
                  style={{ width: 14, height: 14, marginRight: 5 }}
                />
                <Title>{survivor.name}</Title>
                <Icon name="right-arrow" />
              </Button>
              <View styleName="horizontal">
                {survivor.skipNextHunt && (
                  <Image
                    source={ico_skip_hunt}
                    style={{ width: 20, height: 16, marginRight: -12 }}
                  />
                )}
                <AttributeSmall text="S" value={survivor.survival} />
                <AttributeSmall icon={ico_insanity} value={survivor.insanity} />
                <AttributeSmall
                  icon={ico_movement}
                  label="Movement"
                  value={survivor.movement}
                  hideIfneutral={true}
                />
                <AttributeSmall
                  icon={ico_accuracy}
                  value={survivor.accuracy}
                  hideIfneutral={true}
                />
                <AttributeSmall
                  icon={ico_strength}
                  value={survivor.strength}
                  hideIfneutral={true}
                />
                <AttributeSmall
                  icon={ico_evasion}
                  value={survivor.evasion}
                  hideIfneutral={true}
                />
                <AttributeSmall
                  icon={ico_luck}
                  value={survivor.luck}
                  hideIfneutral={true}
                />
                <AttributeSmall
                  icon={ico_d10}
                  value={survivor.speed}
                  hideIfneutral={true}
                />
              </View>
              <Text>
                {survivor.fightingArts.map(item => item.name).join(', ')}
              </Text>
              <Text>
                {survivor.disorders.map(item => item.name).join(', ')}
              </Text>
              <Text>
                {survivor.abilities.map(item => item.name).join(', ')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </Observer>
    )
  }

  hiddenRow = (data, rowMap) => (
    <View style={styles.hiddenRow}>
      <Button style={styles.departingButton}>
        <Text>Departing</Text>
      </Button>
    </View>
  )

  _keyExtractor = (item, index) => item.id

  render() {
    const survivors =
      this.state.selected === 'dead'
        ? this.props.deadSurvivors
        : this.props.aliveSurvivors

    return (
      <View>
        <View styleName="horizontal space-between">
          <Title>Survivors</Title>
          <CheckboxListItem
            styleName="title"
            onPressItem={() => this.setState({ selected: 'alive' })}
            title="Alive"
            id="alive"
            selected={this.state.selected === 'alive'}
          />
          <CheckboxListItem
            styleName="title"
            onPressItem={() => this.setState({ selected: 'dead' })}
            title="Dead"
            id="dead"
            selected={this.state.selected === 'dead'}
          />
        </View>
        <DraggableFlatList
          data={survivors}
          renderItem={this.survivorRow}
          keyExtractor={this._keyExtractor}
          onMoveEnd={({ data, row, from, to }) => {
            if (from !== to) {
              this.props.reorderSurvivor(row, to)
              this.setState({ data })
            }
          }}
        />
      </View>
    )
  }
}

const styles = {
  evenRow: {
    backgroundColor: colors.grey900,
  },
  oddRow: {
    backgroundColor: colors.black,
  },
  activeRow: {
    backgroundColor: colors.black,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.bluegrey800,
  },
  hiddenRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: colors.red800,
  },
  departingButton: {
    width: 80,
    height: 20,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
}
