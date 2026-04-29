import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../utils/userSlice'

const Feed = () => {
    const dispatch = useDispatch();
    const [feedUser, setFeedUser] = useState([]);
    const getFeedUser = async()=>{
        try{
            const res = await axios.get('http://localhost:7777/feed',{withCredentials: true});
            console.log(res?.data?.feedUser);
            dispatch(setUser(res?.data?.feedUser))
            setFeedUser(res?.data?.feedUser);

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getFeedUser();
    },[])
    console.log(feedUser[0])

  return (
    <div>
       <UserCard user={feedUser[0]} />
    </div>
  )
}

export default Feed
