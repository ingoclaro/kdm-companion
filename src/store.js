import thunkPlugin from 'kea-thunk'
import { getStore } from 'kea'
import { constants } from './reducers'

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
import filter from 'redux-storage-decorator-filter'

const engine = filter(createEngine('kdm-manager-state'), ['scenes'])

const storageMiddleware = storage.createMiddleware(
  engine,
  [],
  [constants.SAVE_STATE]
)
export const loadState = storage.createLoader(engine)

export default function configureStore(state = {}) {
  const store = getStore({
    paths: [
      'kea',
      'scenes',
      'settlement_locations',
      'gear',
      'resources',
      'innovations',
      'monsters',
      'principles',
    ],
    plugins: [thunkPlugin],
    preloadedState: state,
    middleware: [storageMiddleware],
  })
  return store
}
