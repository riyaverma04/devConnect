import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections, removeConnection } from '../utils/connectionSlice';
import axios from 'axios';
import UserListItem from './UserListItem';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { addOtherUser } from '../utils/otherUserSlice';
import Loading from './loading';



const Connections = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    console.log("before store")
    const connections = useSelector((store)=>store?.connections  || []);
    console.log(connections)




    const handleMessage=(userId)=>{
        console.log(userId, "for message this is user id");
        navigate(`/chat/${userId}`);

    }



    const fetchConnections= async()=>{
        try{
             const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/connections`,{withCredentials:true});
               console.log(res.data?.connections);
                //storeing connections in redux
                dispatch(addConnections(res.data?.connections));
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }



    const handleRemoveConnectionFromList = async(id)=>{
        console.log(id)
        try{
          await axios.delete(`${import.meta.env.VITE_BASE_URL}/connection-remove/${id}`,{withCredentials: true});
            dispatch(removeConnection(id));


        }catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{
        
        fetchConnections();
  
    },[]);
     const handleConnectionProfile=(userId,connection)=>{
      console.log("hey")
      console.log(userId)
      console.log("handleConnenctionProfile", connection)
      
      navigate(`/profile/${userId}/view`)
    }

    if (loading) {
  return <Loading/>;
}

if (connections.length === 0) {
  return (
    <div className="p-5">
                <div onClick={()=>{navigate(-1)}} >  <ArrowLeft  /></div>
         <div className='flex  h-screen w-full justify-center items-center '>
                <div ><h1 className='text-xl font-bold '>You do not have any connection now</h1></div>
            </div>
      
    </div>
  );
}
   




    
  return (<>
  <div className='p-5'>
         <div className='grid grid-cols-3  justify-center items-center '>
                <div onClick={()=>{navigate(-1)}} >  <ArrowLeft  /></div>
                <div className='col-span-2'><h1 className='text-xl font-bold '>connections</h1></div>
            </div>
              <div className="p-4 pb-2 text-xs opacity-60 tracking-wide"> {connections.length} connections </div>
        <div className='p-4'>
           
            {
                connections?.map((user)=>{
                    return(
                        <div key={user._id}>
                            <UserListItem  user={user}  handleUserProfile={handleConnectionProfile} handleRemoveUser={handleRemoveConnectionFromList} handleMessageButton={handleMessage}/>
                        </div>
                    )
                })
            }
        </div>

      
    </div>
  
  
  </>
   
  )
}

export default Connections
