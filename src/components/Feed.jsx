import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { setFeed } from '../utils/feedSlice'

const Feed = () => {
    const dispatch = useDispatch();
    const [feedUser, setFeedUser] = useState([]);
    const getFeedUser = async()=>{
        try{
            const res = await axios.get('http://localhost:7777/feed',{withCredentials: true});
            console.log(res?.data?.feedUser);
            dispatch(setFeed(res?.data?.feedUser))
            setFeedUser(res?.data?.feedUser);

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getFeedUser();
    },[])
    console.log(feedUser[0]);
    const handleInterestClick=async(id,status)=>{
        console.log("this is id of person whom i am interested: ",id);
        console.log("this is status user passed: ", status);


        //calling api to store information about whether i am interested or not
        try{
            const res = await axios.post(`http://localhost:7777/send/${status}/${id}`,{}, {withCredentials:true});
            console.log(res)

        }catch(err){
            console.log(err)
        }



    }

  return (
    <div>
        {feedUser? <><div className='w-full h-screen flex justify-center items-center'>
            <div className='5/12 h-auto p-5'><h1 className='text-xl'>You have already reached at max of your feed.</h1></div>
            
            </div></> :  <UserCard user={feedUser[0]} handleInterestedRequest={handleInterestClick} />}
       
    </div>
  )
}

export default Feed
