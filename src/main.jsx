import React from 'react'
import ReactDOM from 'react-dom/client'
import './lib/leafletFix' // Importa la solución primero
import App from './App'
import './index.css' // Importa el CSS aquí

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
