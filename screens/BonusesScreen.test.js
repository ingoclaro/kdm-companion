import React from 'react'
import BonusesScreen from './BonusesScreen'
import RootStore from '../src/models/RootStore'
import renderer from 'react-test-renderer'
import { Provider } from 'mobx-react'

it('renders without crashing', () => {
  const store = RootStore.create()
  const navigation = {
    navigate: jest.fn(),
    getParam: jest.fn(), //.mockImplementation(() => ''),
    setParams: jest.fn(),
  }
  const tree = renderer
    .create(
      <Provider store={store}>
        <BonusesScreen navigation={navigation} />
      </Provider>
    )
    .toJSON()
  expect(tree).toBeTruthy()
})
