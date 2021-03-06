import React from 'react'
import {render} from 'react-dom'
import configureStore from './configureStore'
import {Provider} from 'react-redux'
import routes from './routes'

const store = configureStore()

render((
  <Provider store={store}>
    {routes}
  </Provider>
), document.getElementById('app'))

