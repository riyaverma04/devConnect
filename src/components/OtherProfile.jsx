import React from 'react'
import Profile from './Profile'
import { useParams } from 'react-router'

const OtherProfile = () => {
  const {userId} = useParams();
  console.log(userId)
  return (
    <div>
        <Profile otherUserId={userId}/>
      
    </div>
  )
}

export default OtherProfile
