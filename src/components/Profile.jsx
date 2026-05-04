import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import Loading from './loading';
import axios from 'axios';
import { addConnections } from '../utils/connectionSlice';

const Profile = () => {
  const userProfile = useSelector((state) =>state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(userProfile)
  console.log(userProfile?.profileUrl?.url)
  const handleEditProfile =()=>{
    navigate('/profile/update');
   
  }
  const handleConnectionClick=async()=>{
    console.log("cliked connections");
    //get the connections 
    
     
        navigate('/connections')

    
  

    
  }

  return (
   
    <div>
       {!userProfile ||!userProfile.firstName? <Loading/> :<div className="photoBox">
        <div className="coverPhoto">
        <img src={userProfile.coverUrl} alt="" className='cover bg-white w-full h-[10vh] relative' />
      </div>
      {/* //profile photo is round in shape and is overlapping the cover photo and it is at the left side of the cover photo left bottom side  */}
      <div className="profilePhoto w-[100px] h-[100px] absolute rounded-full overflow-hidden border-4 border-white -translate-y-1/2 left-5">
        <img src={userProfile?.profileUrl?.url} alt="Profile" srcset="" className='object-cover' />
      </div>
      <div className="userInfo mt-12 px-5 flex flex-col gap-3">
        <div className='flex items-center gap-2'> 
          <h1 className='font-bold text-xl'>{userProfile?.firstName} {userProfile?.lastName}</h1>{userProfile?.gender && <span className='text-gray-500'>{userProfile.gender}</span>}
        </div>
        {userProfile?.about && <p className='text-gray-500'>{userProfile?.about}</p>}
        <p className='text-blue-600  cursor-pointer' onClick={handleConnectionClick}>connections</p>
        <button className="btn   bg-orange-500" onClick={handleEditProfile}>Edit profile</button>
      </div>

      
      </div>

       }
    </div>
  )
}

export default Profile
