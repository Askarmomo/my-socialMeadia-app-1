import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast'
// import { LogInUserContextProvider } from './context/authContext'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        {/* <LogInUserContextProvider > */}
          <App />
        {/* </LogInUserContextProvider> */}
        <Toaster />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
)
