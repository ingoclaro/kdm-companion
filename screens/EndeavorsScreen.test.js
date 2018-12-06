import React from 'react'
import EndeavorsScreen from './EndeavorsScreen'
import RootStore from '../src/models/RootStore'
import renderer from 'react-test-renderer'
import { Provider } from 'mobx-react'

const store = RootStore.create()

it('renders without crashing', () => {
  const navigation = {
    navigate: jest.fn(),
    getParam: jest.fn(), //.mockImplementation(() => ''),
    setParams: jest.fn(),
  }
  const tree = renderer
    .create(
      <Provider store={store}>
        <EndeavorsScreen navigation={navigation} />
      </Provider>
    )
    .toJSON()
  expect(tree).toBeTruthy()
})
