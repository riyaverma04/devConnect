import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {BrowserRouter, Routes ,Route} from 'react-router'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './Profile'

function App() {
  return(
    <BrowserRouter   basename='/'>
      <Routes>
        <Route path='/' element={<Body />} >
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        
        </Route>
        

      </Routes>
    
    </BrowserRouter>
  )
}

export default App
