import React from 'react'
import ReactDOM from 'react-dom/client'
import PurplePondSpheres from './PurplePondSpheres.jsx'
import { MiniKitContextProvider } from './providers/MiniKitProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MiniKitContextProvider>
      <PurplePondSpheres />
    </MiniKitContextProvider>
  </React.StrictMode>,
)
