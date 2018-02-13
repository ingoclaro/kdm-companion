import { getStore } from 'kea'
import gameData from './data'

export default getStore({
  paths: ['kea', 'scenes', 'settlement_locations', 'gear', 'resources'],
  preloadedState: gameData,
})
