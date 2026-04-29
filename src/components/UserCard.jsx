import React from 'react'

const UserCard = ({user}) => {
    
    const {firstName, lastName, profileUrl,about} = user || {};
  return (
    <>
    <div className='flex  justify-center items-center h-screen'>
        <div className="card bg-base-300 w-96 shadow-sm ">
  <figure>
    <img
      src={profileUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {firstName} {lastName}

      <div className="badge badge-secondary">VIEW</div>
    </h2>
    <p>{about}</p>
    <div className="card-actions justify-end items-baseline mt-6">
      <div className="badge  bg-red-500 py-4 px-5">ignore</div>
      <div className="badge badge-secondary py-4 px-5">interesed</div>
    </div>
  </div>
</div>
</div>
      
    </>
  )
}

export default UserCard
