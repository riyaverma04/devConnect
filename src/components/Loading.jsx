import React from 'react'

const Loading = ({userDetails}) => {
  return (
    <div>
       {
        !userDetails && (
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <span className="loading loading-dots loading-xl"></span>
                <h1>Loading...</h1>
            </div>
        )
    }
       
    
      
    </div>
  )
}

export default Loading
