/* eslint-disable react/jsx-no-undef */
// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import './styles/index.css'
import { UserProvider } from './UseContext'

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <UserProvider>   
      <App /> 
    </UserProvider>
  
)
