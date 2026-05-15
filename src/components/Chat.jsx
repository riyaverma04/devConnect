import React, { useEffect, useRef, useState } from 'react'
import socket from '../utils/socket'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addMessagesFromRoom } from '../utils/messageFromRoomSlice';


const Chat = () => {
    const params = useParams();
    const authenticUser = useSelector(store=> store?.user);
    const messagesFromStore = useSelector(store=>store?.messageFromRoom);
    const [messages, setMessages ] = useState([]);
    // const [liveMessages, setLiveMessages ] = useState([]);
    const [otherUserProfile, setOtherUserProfile] = useState('');
    const [newMessage, setNewMessage] = useState('')
    const  messagesEndRef = useRef(null);
    const dispatch = useDispatch();
   
    const {userId} = params
    console.log(userId)
    //creating room id for private chat 
    //sorting this so it sorted for both the clients and become same roomId for connected people(both users enter same room).

    const fetchuserWhomMessaging = async()=>{
        try{
            const user = await axios.get(`http://localhost:7777/profile/${userId}/view`,{withCredentials:true});
            console.log(user.data?.userProfile);
            setOtherUserProfile(user.data?.userProfile);


        }catch(err){
            console.log(err);
        }
    }


   const fetchMessages = async()=>{
    try{

        const roomId = [authenticUser._id, userId].sort().join("_");
        const messageArray = await axios.get(`http://localhost:7777/messages/${roomId}`,{withCredentials:true});
        console.log(messageArray.data?.messagesFromRoomId);
        // dispatch(addMessagesFromRoom(messageArray.data?.messagesFromRoomId));
        setMessages(messageArray.data?.messagesFromRoomId)


    }catch(err){
        console.log(err);
    }


   }

    useEffect(()=>{

        if(!authenticUser?._id) return;
       
        
        
         const roomId = [authenticUser._id, userId].sort().join("_");

        //joining room from frontend
        socket.emit('join_chat',roomId);
          socket.on("receive_message", (data) => {

        setMessages((prev) => [...prev, data]);

    });




        socket.on('connect',()=>{
            console.log("connected:", socket.id);
            

        });
        socket.on('disconnect', ()=>{
            console.log("Disconnected");
        });
            fetchuserWhomMessaging();
            fetchMessages()

        return()=>{
             socket.off("receive_message");
   
           
        }
    },[authenticUser,userId])
    useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
        behavior: "smooth"
    });

}, [messages]);



    const handleSendMessage=()=>{
        if(!newMessage.trim()) return;
        const roomId = [authenticUser?._id, userId].sort().join('_');
         const messageData =  {
    text: newMessage,
    roomId: roomId,
    senderId: authenticUser?._id,
    timeStamp:  new Date().toLocaleTimeString()
    
};
 
   socket.emit("send_message", messageData);
//    fetchMessages()

        setNewMessage("")
        
        
    }
  return (
    <div className='m-10 flex justify-center items-center'>
        <div className='w-[80%] h-[80vh] bg-gray-700 flex flex-col gap-3'>
            <div className='h-[70vh] p-5  overflow-y-auto align-baseline'>
       
  

{
    messages.map((typedMessage, index)=>{
        console.log(typedMessage)

        const senderId =
    typedMessage.senderId?._id ? typedMessage.senderId?._id: typedMessage.senderId;
    console.log("hey senderId ",senderId)
    console.log("at user", authenticUser?._id)
   

const isMyMessage =senderId === authenticUser?._id;
    
        return(
            <div key={index} className={`chat ${isMyMessage ? 'chat-end': "chat-start"}`}>
  <div className="chat-header">
    {isMyMessage ? "you" : `${typedMessage.senderId?.firstName || otherUserProfile.firstName} `}
    <time className="text-xs opacity-50">{new Date(
   typedMessage.createdAt
).toLocaleTimeString()}</time>
  </div>
                             <div  className="chat-bubble bg-orange-500">
          
                {typedMessage.message}
            
            </div>
            <div className="chat-footer opacity-50">Seen</div>
            </div>
        )
    })
}
{/* {
    liveMessages.map((typedMessage, index)=>{
        console.log("tpedmessage: ",typedMessage)
        const isMyMessage = typedMessage.senderId === authenticUser?._id;
        return(
            <div key={index} className={`chat ${isMyMessage ? 'chat-end': "chat-start"}`}>
  <div className="chat-header">
    Obi-Wan Kenobi
    <time className="text-xs opacity-50">{typedMessage.timeStamp}</time>
  </div>
                             <div  className="chat-bubble bg-orange-500">
          
                {typedMessage.message}
            
            </div>
            <div className="chat-footer opacity-50">Seen</div>
            </div>
        )
    })
} */}


{/* <div className="chat chat-start"> */}
  {/* <div className="chat-header">
    Obi-Wan Kenobi
    <time className="text-xs opacity-50">2 hour ago</time>
  </div> */}
  {/* <div className="chat-bubble bg-orange-500">I loved you.</div>
  <div className="chat-footer opacity-50">Delivered</div> */}
{/* </div> */}
<div ref={messagesEndRef}></div>

          </div>
            <div className='p-5 flex gap-3'>
               <input type="text" value={newMessage} placeholder="Secondary" className="input w-11/12 border-orange-500 focus:outline-orange-500" onChange={(e)=>setNewMessage(e.target.value)} onKeyDown={(e)=> {e.key === "Enter" && handleSendMessage()}} />
                <button className="btn btn-soft bg-orange-500 border-orange-500 hover:bg-orange-600 text-white" onClick={handleSendMessage}>SEND</button>
            </div>
        </div>

      
    </div>
  )
}

export default Chat
