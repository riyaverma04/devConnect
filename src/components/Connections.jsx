import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import axios from 'axios';
import ConnectionsList from './ConnectionsList';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { addOtherUser } from '../utils/otherUserSlice';



const Connections = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    console.log("before store")
    const connections = useSelector((store)=>store?.connections );
    console.log(connections)



    const fetchConnections= async()=>{
        try{
             const res = await axios.get("http://localhost:7777/user/connections",{withCredentials:true});
               console.log(res.data?.connections);
                //storeing connections in redux
                dispatch(addConnections(res.data?.connections));
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
         if (!connections || connections.length === 0) {
            console.log("fetching connections")
        fetchConnections();
  }
    },[connections]);
     const handleConnectionProfile=(userId,connection)=>{
      console.log("hey")
      console.log(userId)
      console.log("handleConnenctionProfile", connection)
      
      navigate(`/profile/${userId}/view`)
    }
   




    
  return (
    <div className='p-5'>
         <div className='grid grid-cols-3  justify-center items-center '>
                <div onClick={()=>{navigate(-1)}} >  <ArrowLeft  /></div>
                <div className='col-span-2'><h1 className='text-xl font-bold '>connections</h1></div>
            </div>
              <div className="p-4 pb-2 text-xs opacity-60 tracking-wide"> 2 connections </div>
        <div className='p-4'>
           
            {
                connections?.map((connection)=>{
                    return(
                        <div key={connection._id}>
                            <ConnectionsList  connection={connection}  handleConnectionProfile={handleConnectionProfile}/>
                        </div>
                    )
                })
            }
        </div>

      
    </div>
  )
}

export default Connections
