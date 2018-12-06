import { types, getParent, onAction } from 'mobx-state-tree'

export const DragonTraits = types
  .model('DragonTraits', {
    understanding: false,
    destined: false,
    fatedBlow: false,
    pristine: false,
    reincarnated: false,
    frozenStar: false,
    iridescentHide: false,
    championsRite: false,
    scar: false,
    noble: false,
    weaponMaster: false,
    accuracy: false,
    oraclesEye: false,
    unbreakable: false,
    strength: false,
    courage: false,
  })
  .actions(self => ({
    handleAttributeChange(survivor) {
      if (survivor.courage >= 9) {
        self.courage = true
      }
      if (survivor.understanding >= 9) {
        self.understanding = true
      }
      if (survivor.strength >= 3) {
        self.strength = true
      }
      if (survivor.accuracy >= 1) {
        self.accuracy = true
      }
      if (survivor.weaponProficiencyLevel >= 8) {
        self.weaponMaster = true
      }
    },
    handleDisorderChange(survivor) {
      if (survivor.disorders.find(item => item.id === 'Destined')) {
        self.destined = true
      }
    },
    handleFAChange(survivor) {
      if (survivor.fightingArts.find(item => item.id === 'Fated Blow')) {
        self.fatedBlow = true
      }
      if (survivor.fightingArts.find(item => item.id === "Champion's Rite")) {
        self.championsRite = true
      }
      if (survivor.fightingArts.find(item => item.id === 'Unbreakable')) {
        self.unbreakable = true
      }
      if (survivor.fightingArts.find(item => item.id === 'Frozen Star')) {
        self.frozenStar = true
      }
    },
    handleAbilityChange(survivor) {
      if (survivor.abilities.find(item => item.id === 'Reincarnated')) {
        self.reincarnated = true
      }
      if (survivor.abilities.find(item => item.id === 'Noble')) {
        self.noble = true
      }
      if (survivor.abilities.find(item => item.id === 'Scar')) {
        self.scar = true
      }
      if (survivor.abilities.find(item => item.id === "Oracle's Eye")) {
        self.oraclesEye = true
      }
      if (survivor.abilities.find(item => item.id === 'Iridescent Hide')) {
        self.iridescentHide = true
      }
      if (survivor.abilities.find(item => item.id === 'Pristine')) {
        self.pristine = true
      }
    },
    // afterAttach() {
    //   onAction(
    //     getParent(self),
    //     action => {
    //       let survivor = getParent(self)
    //       switch (action.name) {
    //         case 'setAttribute':
    //           self.handleAttributeChange(survivor)
    //           break
    //         case 'addDisorder':
    //           self.handleDisorderChange(survivor)
    //           break
    //         case 'addFA':
    //           self.handleFAChange(survivor)
    //           break
    //         case 'addAbility':
    //           self.handleAbilityChange(survivor)
    //           break
    //       }
    //     },
    //     true
    //   )
    // },
  }))
  .views(self => ({
    get hasCompleteTrait() {
      let completed = false
      // check for rows
      completed =
        completed ||
        (self.understanding && self.destined && self.fatedBlow && self.pristine)
      completed =
        completed ||
        (self.reincarnated &&
          self.frozenStar &&
          self.iridescentHide &&
          self.championsRite)
      completed =
        completed ||
        (self.scar && self.noble && self.weaponMaster && self.accuracy)
      completed =
        completed ||
        (self.oraclesEye && self.unbreakable && self.strength && self.courage)

      // check for columns
      completed =
        completed ||
        (self.understanding &&
          self.reincarnated &&
          self.scar &&
          self.oraclesEye)
      completed =
        completed ||
        (self.destined && self.frozenStar && self.noble && self.unbreakable)
      completed =
        completed ||
        (self.fatedBlow &&
          self.iridescentHide &&
          self.weaponMaster &&
          self.strength)
      completed =
        completed ||
        (self.pristine && self.championsRite && self.accuracy && self.courage)

      return completed
    },
    get constellation() {
      let survivor = getParent(self)
      // check for abilities of the constellations
      let constellation = undefined
      if (survivor.abilities.find(item => item.id === 'Presage')) {
        constellation = 'Witch'
      }
      if (survivor.abilities.find(item => item.id === 'Way of the Rust')) {
        constellation = 'Rust'
      }
      if (survivor.abilities.find(item => item.id === 'Heart of the Sword')) {
        constellation = 'Storm'
      }
      if (survivor.abilities.find(item => item.id === 'Psychovore')) {
        constellation = 'Reaper'
      }
      if (survivor.abilities.find(item => item.id === 'Twelve Fingers')) {
        constellation = 'Gambler'
      }
      if (survivor.abilities.find(item => item.id === 'Rooted to All')) {
        constellation = 'Absolute'
      }
      if (survivor.abilities.find(item => item.id === 'Limb-maker')) {
        constellation = 'Sculptor'
      }

      return constellation
    },
  }))
