import React from 'react'
import SummaryScreen from './SummaryScreen'
import RootStore from '../src/models/RootStore'
import renderer from 'react-test-renderer'
import { Provider } from 'mobx-react'

const store = RootStore.create()

it('renders without crashing', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <SummaryScreen />
      </Provider>
    )
    .toJSON()
  expect(tree).toBeTruthy()
})
