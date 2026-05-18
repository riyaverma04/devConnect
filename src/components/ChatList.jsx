import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from './loading';
import { useNavigate } from 'react-router';

const ChatList = () => {
    const authorizedUser = useSelector(store=> store.user);
    const [chatProfile, setChatProfile] = useState([]);
    const navigate = useNavigate();


    const handleChatView=(userId)=>{
        navigate(`/chat/${userId}`)

    }
    const fetchChatList=async()=>{
        
        try{
            const chatList = await axios(`http://localhost:7777/message-list/${authorizedUser._id}`,{withCredentials: true});
            // console.log(chatList.data.chats);
            setChatProfile(chatList.data.chats)

        }catch(err){
            console.log(err);
        }

    }
    console.log(chatProfile)
    



    //fetching chatlist 
    useEffect(()=>{
        if(!authorizedUser?._id) return;
        fetchChatList();
    },[authorizedUser])
    if(!authorizedUser){
        return <Loading/>
    }
  return (
    <div className='p-5'>
        <ul className="list bg-base-100 rounded-box shadow-md">


            {
                chatProfile.map((chat)=>{
                    return(
                        <li className="list-row cursor-pointer" key={chat._id} onClick={()=>handleChatView(chat.userInfo._id)} >
   
    <div className='w-12 h-12 rounded-full overflow-hidden '><img className="object-cover w-full" src={chat.userInfo?.profileUrl?.url}/></div>
    <div className="list-col-grow">
      <div>{chat.userInfo?.firstName} </div>
      <div className="text-xs  font-semibold opacity-60">{chat.lastMessage}</div>
    </div>
    {/* <button className="btn btn-square btn-ghost">
      <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
    </button> */}
  </li>
                        
                    )
                })
            }
  
 
  
  
  

  
</ul>

        

      
    </div>
  )
}

export default ChatList
