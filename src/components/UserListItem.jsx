import { ArrowLeft, Check, MessagesSquare, X } from 'lucide-react';
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';


const UserListItem = ({user,handleUserProfile,handleRemoveUser,handleRequest}) => {
  console.log(user)
    const {firstName, lastName, profileUrl, about,_id} = user;
    const navigate= useNavigate();
   const location = useLocation();
   console.log(location)

    
  return (
    <div className='mt-2'>
         
        <ul className="list bg-base-200 rounded-box shadow-md ">
           
  

  
  <li className="list-row">
    <div onClick={()=>handleUserProfile(_id,user)}><img className="size-10 rounded-box" src={profileUrl.url}/></div>
    <div>
      <div>{firstName }{lastName}</div>
      <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
    </div>
    <p className="list-col-wrap text-xs truncate s:w-20 m:w-40 ">
      "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
    </p>
  {  
    location.pathname ==='/requests' ? <>
    <button className="btn btn-square btn-ghost text-sm" onClick={()=>handleRequest(_id,"accepted")}>
      <Check  className="w-4 h-4"/>
      
    </button>
    <button className="btn btn-square btn-ghost text-sm" onClick={()=>handleRequest(_id,"rejected")}>
     <X className="w-4 h-4"/>
      
    </button>


    </>
:
    
    <><button className="btn btn-square btn-ghost text-sm">
      <MessagesSquare className="w-4 h-4" />
    </button>
    <button className="btn btn-square btn-ghost text-sm" onClick={()=>handleRemoveUser(_id)}>
      <X className="w-4 h-4"/>
    </button>
    </>
    }
  </li>
  
  
  
  
</ul>
      
    </div>
  )
}

export default UserListItem
