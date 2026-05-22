import React from 'react'

const UploadContainer = ({children}) => {
  return (
    <div className='flex  flex-col gap-3 items-center sm:w-[40vw] w-[80vw] p-5 justify-center h-auto bg-gray-700 rounded-lg '>

      {children}
    </div>
  )
}

export default UploadContainer
