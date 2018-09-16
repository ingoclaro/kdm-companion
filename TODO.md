# TODO

This tracks pending tasks and ideas for the app

- [ ] Needed to fork @shoutem/ui to set the StatusBar color. Once this [pull request](https://github.com/shoutem/ui/pull/386) is merged we can switch back to upstream.
- [ ] react-native-fit-image: waiting for [open PR](https://github.com/huiseoul/react-native-fit-image/pull/81) to be merged, for now patching package locally.

- Known bug: add scroll to AbilityList, if you have a LOT of abilities/impairments the modal clips.

v1.5:

- [x] Fix strange resources to only show resources of the selected expansion
- [x] Fix Brain and severe injury tables, text is clipped.
- [x] Fix Bonus Screen, text is clipped.
- [x] Fix severe injury table titles. Row can't be used???
- [ ] Review TODOs in the codebase.
- [x] Review model to support for "the knowledge worm" innovation.
- [x] Change Hunt screen to show departing bonuses
- [x] Change Bonuses screen to show newborn bonuses
- [x] Improve bonuses to show title different than rest of text
- [x] Test the new bonus/settlement change (adding and removal)
- [x] Change Fight screen to only have the fight tab
  - [x] Add monster selector with all available monsters
  - [x] Show monster initial Stats
  - [x] Add controls for token tracking (+ - buttons) eg: speed: 0 + 2 = 2
  - [x] Add button to show basic action / or show it permanently on screen
  - [x] Show severe injury table
  - [x] Show severe brain trauma table
- [x] Add stats/tracking service
  - [x] Review events
  - [x] Add configuration setting somewhere to use correct Amplitude api-key depending on environment (eg: prod one when publishing)
  - [x] Change tracking to Segment
  - [x] Get production keys
- [x] Add Principles + bonus they provide
- [x] Publish as standalone Android App
  - [x] Standalone build
  - [x] Submit to app store
  - [x] Change splash screen

v1.6:

- [x] Add Settlement Notes
- [ ] Add support for gear builder

v1.7:

- [ ] Add support for Random Settlement event
  - [ ] Consider Settlement events from expansions

v1.8:

- [x] Add support to manage Survivors
  - [ ] ~~Add, name with photo (camera roll)~~
  - [ ] ~~Update name and photo (camera roll)~~
  - [x] Kill/revive

v2.0:

- [ ] Add support for other campaigns (people of the xxx)

v3.0:

- [x] Full fledged survivor management
  - [x] Permanent stats
  - [x] Fighting arts
  - [x] Disorders
  - [x] Re-roll used (if survivor of the fittest)
  - [x] Gender
  - [x] Notes
