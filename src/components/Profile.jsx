import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import Loading from './loading';
import axios from 'axios';
import { addConnections } from '../utils/connectionSlice';
import { setUser } from '../utils/userSlice';
import { addOtherUser } from '../utils/otherUserSlice';
import { ArrowLeft } from 'lucide-react';

const Profile = ({otherUserId}) => {
  const userProfile = useSelector((state) =>state?.user);
  const viewConnectionProfile = useSelector((store)=>store?.otherUser);
  console.log(userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);

  
  
  
  
  useEffect(() => {
    const fetchUser = async () => {







      //if(!userProfile){
        try {


          if(otherUserId){
            const res = await axios.get(`http://localhost:7777/profile/${otherUserId}/view`,{withCredentials: true});
            console.log(res.data?.userProfile);
            dispatch(addOtherUser(res.data?.userProfile));
            setUser(res.data?.userProfile);
          }else{
            const res = await axios.get("http://localhost:7777/profile", {
        withCredentials: true,})
      
      console.log("app",res.data?.userData)
      dispatch(setUser(res.data?.userData));
      setUser(res.data?.userData)

          }
      
         
    
      
    
    
    
     
    } catch (err) {
      console.log(err);
    }
      //}

  };

  
  

    
  

    fetchUser();
  

}, [otherUserId]);

 




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
       {!user ||!user.firstName? <Loading/> :<div className="photoBox">

        <div onClick={()=>{navigate(-1)}}  className='p-5'>  <ArrowLeft  /></div>


        <div className="coverPhoto">
        <img src={user.coverUrl} alt="" className='cover bg-white w-full h-[20vh] relative' />
      </div>
      {/* //profile photo is round in shape and is overlapping the cover photo and it is at the left side of the cover photo left bottom side  */}
      <div className="profilePhoto w-[100px] h-[100px] absolute rounded-full overflow-hidden border-4 border-white -translate-y-1/2 left-5">
        <img src={user?.profileUrl?.url} alt="Profile" srcset="" className='object-cover' />
      </div>
      <div className="userInfo mt-12 px-5 flex flex-col gap-3">
        <div className='flex items-center gap-2'> 
          <h1 className='font-bold text-xl'>{user?.firstName} {user?.lastName}</h1>{user?.gender && <span className='text-gray-500'>{user.gender}</span>}
        </div>
        {user?.about && <p className='text-gray-500'>{user?.about}</p>}
        {!otherUserId && <p className='text-blue-600  cursor-pointer' onClick={handleConnectionClick}>connections</p>}
       {
        !otherUserId &&  <button className="btn   bg-orange-500" onClick={handleEditProfile}>Edit profile</button>
       }
       {
        otherUserId && <div>
          <button className="btn   bg-orange-500" >Message</button>

        </div>
       }
      </div>

      
      </div>

       }
    </div>
  )
}

export default Profile
