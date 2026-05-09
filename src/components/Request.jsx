import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import UserListItem from './UserListItem'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Request = () => {
    const requests = useSelector((store)=>store?.requests || []);
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const [loading, setLoading] = useState(true)


    const handleRequestOfUser=async(id, status)=>{
         console.log("this is id of person whom i am interested: ",id);
                console.log("this is status user passed: ", status);
        
        
                //calling api to store information about whether i am interested or not
                try{
                    const res = await axios.post(`http://localhost:7777/requests/${status}/${id}`,{}, {withCredentials:true});
                    console.log(res)
                    dispatch(removeRequest(id));
        
                }catch(err){
                    console.log(err)
                }

    }
    const fetchRequest = async()=>{
       try{
         const res = await axios.get(`http://localhost:7777/requests/received`,{withCredentials:true});
         console.log(res.data?.receivedRequests);
         dispatch(addRequest(res.data?.receivedRequests));
         

       }catch(err){
        console.log(err)
       }finally{
                    setLoading(false)
                }


    }


    useEffect(()=>{
        

            fetchRequest();
        

    },[])

     const handleRequestUserProfile=(userId,requestedUser)=>{
      console.log("hey")
      console.log(userId)
      console.log("handleConnenctionProfile", requestedUser)
      
      navigate(`/profile/${userId}/view`)
    }




      if (loading) {
      return <h1>Loading...</h1>;
    }
    
    if (requests?.length === 0) {
      return (
        <div className="p-5">
                    <div onClick={()=>{navigate(-1)}} >  <ArrowLeft  /></div>
             <div className='flex  h-screen w-full justify-center items-center '>
                    <div ><h1 className='text-xl font-bold '>You do not have any connection now</h1></div>
                </div>
          
        </div>
      );
    }  



  return (
    <>
      <div className='p-5'>
             <div className='grid grid-cols-3  justify-center items-center '>
                    <div onClick={()=>{navigate(-1)}} >  <ArrowLeft  /></div>
                    <div className='col-span-2'><h1 className='text-xl font-bold '>Requests</h1></div>
                </div>
                  <div className="p-4 pb-2 text-xs opacity-60 tracking-wide"> 2 connections </div>
            <div className='p-4'>
               
                {
                    requests?.map((user)=>{
                        return(
                            <div key={user._id}>
                                <UserListItem user={user.senderId}  handleUserProfile={handleRequestUserProfile} handleRequest={handleRequestOfUser} />
                            </div>
                        )
                    })
                }
            </div>
    
          
        </div>
      
      
      </>
  )
}

export default Request
