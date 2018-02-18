import thunkPlugin from 'kea-thunk'
import { getStore } from 'kea'
import gameData from './data'

export default getStore({
  paths: [
    'kea',
    'scenes',
    'settlement_locations',
    'gear',
    'resources',
    'innovations',
    'monsters',
    'principles',
    'endeavors',
    'bonuses',
  ],
  plugins: [thunkPlugin],
  preloadedState: gameData,
})
