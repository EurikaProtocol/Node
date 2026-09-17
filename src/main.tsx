import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

function isSafeInternalPath(value: string | null): value is string {
  return Boolean(value && value.startsWith('/') && !value.startsWith('//'))
}

const redirectedPath = window.sessionStorage.getItem('eureka-spa-redirect')
if (isSafeInternalPath(redirectedPath) && window.location.pathname === '/') {
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
