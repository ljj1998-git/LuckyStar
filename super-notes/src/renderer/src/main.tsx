import '@renderer/styles/index.css'

import React from 'react'
import store from './stores'
import ReactDOM from 'react-dom/client'
import AppRoutes from '@renderer/router'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
)
