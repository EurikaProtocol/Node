import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const redirectedPath = window.sessionStorage.getItem('eureka-spa-redirect')
if (redirectedPath && window.location.pathname === '/') {
  window.history.replaceState(null, '', redirectedPath)
  window.sessionStorage.removeItem('eureka-spa-redirect')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
