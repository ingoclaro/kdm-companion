import React from 'react'
import App from './App'
import RootStore from '../src/models/RootStore'
import renderer from 'react-test-renderer'

const store = RootStore.create()

it('renders without crashing', () => {
  const tree = renderer.create(<App store={store} />).toJSON()
  expect(tree).toBeTruthy()
})
