import React from 'react'
import SurvivorScreen from './SurvivorScreen'
import RootStore from '../src/models/RootStore'
import renderer from 'react-test-renderer'
import { Provider } from 'mobx-react'

it('renders without crashing', () => {
  const store = RootStore.create()
  const survivor = store.selectedCampaign.settlement.createSurvivor('survivor')
  const navigation = {
    navigate: jest.fn(),
    getParam: jest.fn().mockImplementation(param => {
      if (param === 'survivorId') {
        return survivor.id
      }
    }),
    setParams: jest.fn(),
  }
  const tree = renderer
    .create(
      <Provider store={store}>
        <SurvivorScreen navigation={navigation} />
      </Provider>
    )
    .toJSON()
  expect(tree).toBeTruthy()
})
