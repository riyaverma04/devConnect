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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:7777/profile", {
        withCredentials: true,
      });
      console.log("app",res.data?.userData)
      dispatch(setUser(res.data?.userData));
    } catch (err) {
      console.log(err);
    }
  };

  fetchUser();
}, []);
  return(
    <BrowserRouter   basename='/'>
      <Routes>
        <Route path='/' element={<Body />} >
        <Route index element={<Feed />} />
        <Route path='/profile/update' element={<ProfileEdit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        
        </Route>
        <Route path='profile/:useId/view' element={<OtherProfile />} />
        

      </Routes>
    
    </BrowserRouter>
  )
}

export default App
