import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '../utils/userSlice'

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFromStore = useSelector((state) => state.user);
  const getProfile = async()=>{
  if (userFromStore && userFromStore._id) return;
      try{
        const res = await axios.get('http://localhost:7777/profile',{withCredentials: true});
        dispatch(setUser(res?.data?.userData));
        console.log(res?.data?.userData)



    }catch(err){
      navigate('/login');
      console.log(err)
    }
  }

  useEffect(()=>{
    getProfile();
  },[userFromStore])
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

export default Body
