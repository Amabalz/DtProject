import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './components/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserProvider } from './components/Context';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
  </React.StrictMode>,
)
