import React from 'react'
import { useNavigate } from 'react-router';

const UserCard = ({user,handleInterestedRequest}) => {
    
    const {firstName, lastName, profileUrl,about,_id} = user || {};
    const navigate= useNavigate()
    console.log(_id)
  return (
    <>
    <div className='flex justify-center items-center h-screen '>
        <div className="card bg-base-300 w-70 md:w-96 h-auto shadow-sm  ">
    <div className=' w-70 md:w-96 h-74 '>
        
    <img
      src={profileUrl}
      alt="proile" className='w-full h-full object-cover rounded-md'/>
      </div>
  
  <div className="card-body">
    <h2 className="card-title">
      {firstName} {lastName}

      <div className="badge badge-secondary" onClick={()=>{navigate(`/profile/${_id}/view`)}}>VIEW</div>
    </h2>
    <p>{about}</p>
    <div className="card-actions justify-end items-baseline mt-6">
      <div className="badge  bg-red-500 py-4 px-5" onClick={()=>handleInterestedRequest(_id,"ignored")}>ignore</div>
      <div className="badge badge-secondary py-4 px-5" onClick={()=>handleInterestedRequest(_id,"interested")}>interesed</div>
    </div>
  </div>
</div>
</div>
      
    </>
  )
}

export default UserCard
