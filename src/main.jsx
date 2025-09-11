// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import '@/index.css'
import 'leaflet/dist/leaflet.css'
import { Toaster } from '@/components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Toaster />
        </BrowserRouter>
    </React.StrictMode>
)
