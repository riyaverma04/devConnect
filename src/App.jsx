import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import Feed from './components/Feed'
import ProfileEdit from './components/ProfileEdit'
import OtherProfile from './components/OtherProfile'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setUser } from './utils/userSlice'
import Connections from './components/Connections'
import RequestRecieved from './components/RequestRecieved'
import Request from './components/Request'
import Chat from './components/Chat'

function App() {
  

  return(
    <BrowserRouter   basename='/'>
      <Routes>
        <Route path='/' element={<Body />} >
        <Route index element={<Feed />} />
        <Route path='/requests' element={<Request/>} />
        <Route path='/profile/update' element={<ProfileEdit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/chat/:userId' element={<Chat />} />
        
        </Route>
        <Route path='/profile/:userId/view' element={<OtherProfile />} />
        <Route path='/connections' element={<Connections />} />
        <Route path='/requests' element={<RequestRecieved />} />

        

      </Routes>
    
    </BrowserRouter>
  )
}

export default App
