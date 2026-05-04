import { ArrowLeft, MessagesSquare, X } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router';

const ConnectionsList = ({connection}) => {
    const {firstName, lastName, profileUrl, about} = connection;
    const navigate= useNavigate();
  return (
    <div className='p-5'>
         <div className='grid grid-cols-3  justify-center items-center '>
                <div onClick={()=>{navigate(-1)}} ><ArrowLeft  /></div>
                <div className='col-span-2'><h1 className='text-xl font-bold '>connections</h1></div>
            </div>
        <ul className="list bg-base-200 rounded-box shadow-md mt-5">
           
  
  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide"> 2 connections </li>
  
  <li className="list-row">
    <div><img className="size-10 rounded-box" src={profileUrl.url}/></div>
    <div>
      <div>{firstName }{lastName}</div>
      <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
    </div>
    <p className="list-col-wrap text-xs truncate s:w-20 m:w-40 ">
      "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
    </p>
    <button className="btn btn-square btn-ghost text-sm">
      <MessagesSquare className="w-4 h-4" />
    </button>
    <button className="btn btn-square btn-ghost text-sm">
      <X className="w-4 h-4"/>
    </button>
  </li>
  
  <li className="list-row">
    <div><img className="size-10 rounded-box" src={profileUrl.url}/></div>
    <div>
      <div>{firstName }{lastName}</div>
      <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
    </div>
    <p className="list-col-wrap text-xs truncate s:w-20 m:w-40 ">
      "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
    </p>
    <button className="btn btn-square btn-ghost text-sm">
      <MessagesSquare className="w-4 h-4" />
    </button>
    <button className="btn btn-square btn-ghost text-sm">
      <X className="w-4 h-4"/>
    </button>
  </li>
  
  
</ul>
      
    </div>
  )
}

export default ConnectionsList
