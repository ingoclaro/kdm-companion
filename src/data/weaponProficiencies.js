export default {
  axe: {
    id: 'axe',
    name: 'Axe',
    expansion: 'core',
    specialistBonus:
      'When attacking with an axe, if your wound attempt fails, you may ignore it and attempt to wound the selected hit location again. Limit once per attack.',
    masterBonus:
      'When an Axe Master wounds a monster with an axe at a location with a persistent injury, that wound becomes a critical wound.',
  },
  bow: {
    id: 'bow',
    name: 'Bow',
    expansion: 'core',
    specialistBonus:
      'When attacking with a bow, you may reroll any misses once. Limit once per attack.',
    masterBonus:
      'If you are a Bow Master, all Bows in your gear grid gain **Deadly 2**. In addition, ignore **cumbersome** on all Bows.',
  },
  club: {
    id: 'club',
    name: 'Club',
    expansion: 'core',
    specialistBonus:
      'When attacking with a club, on a **perfect hit**, double your wound attempt total on the first selected hit location. Limit once per attack.',
    masterBonus:
      "When a Club Master attacks with a club, if a successful wound attempt total is greater than or equal to twice the monster's toughness, inflict an additional wound.",
  },
  dagger: {
    id: 'dagger',
    name: 'Dagger',
    expansion: 'core',
    specialistBonus:
      'When attacking with a Dagger, if a wound attempt fails, after performing any reactions, you may discard another drawn hit location card to attempt to wound that hit location again. Limit once per attack.',
    masterBonus:
      'After a wounded hit location is discarded, a Dagger Master who is adjacent to the attacker and the wounded monster may spend 1 survival to re-draw the wounded hit location and attempt to wound with a dagger. Treat monster reactions on the re-drawn hit location card normally.',
  },
  'fist & tooth': {
    id: 'fist & tooth',
    name: 'Fist & Tooth',
    expansion: 'core',
    specialistBonus:
      "You may stand (if knocked down) at the start of the monster's turn or the survivor's turn. Limit once per round.",
    masterBonus:
      'While a survivor is a Fist & Tooth Master, they gain +2 permanent accuracy and +2 permanent strength.',
  },
  'grand weapon': {
    id: 'grand weapon',
    name: 'Grand Weapon',
    expansion: 'core',
    specialistBonus:
      'When attacking with a grand weapon, gain +1 accuracy. When attacking with a grand weapon during your act, if you critically wound, the monster is knocked down.',
    masterBonus:
      'When a Gran Weapon Master perfectly hits with a grand weapon, cancel all reactions for that attack.',
  },
  katar: {
    id: 'katar',
    name: 'Katar',
    expansion: 'core',
    specialistBonus:
      'When attacking with a Katar, cancel all reactions on the first selected hit location.',
    masterBonus:
      'If you are a Katar Master, gain a +1 evasion token on a **perfect hit** with a katar. When you are knocked down, remove all +1 evasion tokens.',
  },
  katana: {
    id: 'katana',
    name: 'Katana',
    expansion: 'sunstalker',
    specialistBonus:
      'You may not select this as your weapon type. If you are **blind** and have 4+ levels of Katana proficiency, gain the following: On your first **Perfect Hit** each attack with a katana, do not draw a hit location. The monster suffers 1 wound.',
    masterBonus: '',
  },
  scythe: {
    id: 'scythe',
    name: 'Scythe',
    expansion: 'dk',
    specialistBonus:
      'When you critically wound with a scythe, roll 1d10. On a 6+, schuffle the hit location deck (do not shuffle unresolved hit locations). Limit once per round.',
    masterBonus:
      "At the start of a Scythe Master's act, if they are insane, they gain +1![action](action) which they may only spend to activate scythes.",
  },
  shield: {
    id: 'shield',
    name: 'Shield',
    expansion: 'core',
    specialistBonus:
      'While a shield is in your gear grid, you are no longer knocked down after **collision** with a monster. While a shield is in your gear grid, add ![1](shield) to all hit locations.',
    masterBonus:
      'When a Shield Master is adjacent to a survivor that is targeted by a monster, they may swap spaces on the board with the survivor and become the target instead. The master must have a shield to perform this.',
  },
  spear: {
    id: 'spear',
    name: 'Spear',
    expansion: 'core',
    specialistBonus:
      'When attacking with a spear, if you draw a **trap**, roll 1d10. On a 7+, cancel the **trap**. Discard it, then reshuffle the hit location deck and draw a new card. Limit once per round.',
    masterBonus:
      'Whenever a Spear Master hits a monster with a Spear, they may spend 1 survival to gain the Priority Target token. If they made the hit from directly behind another survivor, that survivor gains the Priority Target token instead.',
  },
  sword: {
    id: 'sword',
    name: 'Sword',
    expansion: 'core',
    specialistBonus:
      'When attacking with a sword, after drawing hit locations, make a wound attempt and then select a hit location to resolve with that result. Limit once per attack.',
    masterBonus:
      'A Sword Master gains +1 accuracy, +1 strength, and +1 speed when attacking with a Sword.',
  },
  'twilight sword': {
    id: 'twilight sword',
    name: 'Twilight Sword',
    expansion: 'core',
    specialistBonus:
      "This sentient sword improves as it's used. Gain the effect as proficiency rank increases. 2: ignore **cumbersome** on Twilight Sword. 4: When attacking with the Twilight Sword, ignore **slow** and gain +2 speed. 6: Twilight Sword gains **Deadly**.",
    masterBonus:
      "Any survivor who attains Twilight Sword Mastery leaves the settlement forever in pursuit of a higher purpose. Remove them from the settlement's population. You may place the master's Twilight Sword in another survivor's gear grid or archive it.",
  },
  whip: {
    id: 'whip',
    name: 'Whip',
    expansion: 'core',
    specialistBonus:
      'When you wound with a whip, instead of moving the top card of the AI deck into the wound stack, you may move the top card of the AI discard pile. Limit once per attack.',
    masterBonus: 'Whip Masters gain +5 strength when attacking with a Whip.',
  },
}
