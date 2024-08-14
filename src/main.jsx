import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppContext from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppContext>
        <App />
      </AppContext>
    </Router>
  </StrictMode>,
)
