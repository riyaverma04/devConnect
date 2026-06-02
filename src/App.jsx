import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import Feed from './components/Feed'
import ProfileEdit from './components/ProfileEdit'
import OtherProfile from './components/OtherProfile'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setUser } from './utils/userSlice'
import Connections from './components/Connections'
import RequestRecieved from './components/RequestRecieved'
import Request from './components/Request'
import Chat from './components/Chat'
import ChatList from './components/ChatList'
import UploadPost from './components/pages/UploadPost'
import PostList from './components/pages/PostList'

function App() {
  const [posts, setPosts] = useState([]);
  //getting the post 
    const handleToggleLikes = async (postId,profileId) => {
      console.log("toggleLike", postId);
    
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const alreadyLiked = post.likes.includes(userProfile._id);
  
          return {
            ...post,
            likes: alreadyLiked
              ? post.likes.filter((id) => id !== userProfile._id)
              : [...post.likes, userProfile._id],
          };
        }
  
        return post;
      })
    );
  
    // backend api call
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/${postId}/toggle-like/${userProfile._id}`,
        {},
        { withCredentials: true }
      );
  
      console.log(res.data?.message);
    } catch (err) {
      console.log(err);
    }
  };
  

  return(
    <BrowserRouter   basename='/'>
      <Routes>
        <Route path='/' element={<Body />} >
        <Route index element={<Feed />} />
        <Route path='/requests' element={<Request/>} />
        <Route path='/profile/update' element={<ProfileEdit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/chat' element={<ChatList />} />
        <Route path='/chat/:userId' element={<Chat />} />
         <Route path='/profile/:userId/view' element={<OtherProfile />} />
        <Route path='/connections' element={<Connections />} />
        <Route path='/requests' element={<RequestRecieved />} />
        <Route path='/upload' element={<UploadPost />} />
        <Route path='/posts/:userId' element={<PostList  handleToggleLikes={handleToggleLikes}/>} />
        
        </Route>
       

        

      </Routes>
    
    </BrowserRouter>
  )
}

export default App
