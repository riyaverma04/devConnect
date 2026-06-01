import { ChevronLeft, Lectern, ThumbsUp } from 'lucide-react';
import React, { useState ,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router';
import useFetchUser from '../../hooks/useFetchUser';
import useFetchPost from '../../hooks/useFetchPost';
import { toggleLike } from '../../utils/postSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const PostList = ({posts,user,handleToggleLike}) => {
  const userProfile = useSelector((state) => state?.user);
  const allPosts = useSelector((state) => state?.posts) || posts ;
  
  console.log("this is post list :", allPosts);
  console.log("this is user : " , user);
  const dispatch = useDispatch();
  const [userPost, setUserPost] = useState([]);
  
    
    // const [liked , setLiked] = useState(false);
    // const [postUser, setPostUser] = useState("");
    const location = useLocation();
    const postProfileId = location.pathname.split('/')[2];
    console.log(postProfileId, "this is post profile id")
    
   
    const postUserData = useFetchUser(postProfileId) || user;
    console.log(postUserData, "this is post user") 
   
  
       useFetchPost(postProfileId);
      console.log( "these are all posts",allPosts);

    
  
  
  
   console.log("USER DATA =>", postUserData);
   const navigate = useNavigate();

const handleLike = async(postId)=>{
  dispatch(toggleLike({postId,userId:userProfile._id}));
   try {
    const res = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/${postId}/toggle-like/${userProfile._id}`,
      {},
      { withCredentials: true }
    );
    const isLiked = allPosts.likes?.includes(userProfile._id);
    // if(isLiked){
    //   setLiked(true);
    // }else{
    //   setLiked(false);
    // }
    console.log(res.data?.message);
  } catch (err) {
    console.log(err);
  }


}


console.log(allPosts, "these are all posts")
  

    
    // console.log(postUser, "this is post user")
  return (
    <div className="mt-5">
        
            <span className="pt-3 pl-5 block mb-5" onClick={() => navigate('/profile')}> <ChevronLeft /></span>
          {
            location.pathname ==='/posts/:userId' && <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Posts</h2>

            <span className="text-gray-400 text-sm">
              {allPosts?.length || 0} posts
            </span>
          </div>
          }

          {/* allPosts GRID */}
          {allPosts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {allPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                >
                  {post?.photos && (
                    <img
                      src={post.photos?.url}
                      alt="post"
                      className="w-full h-64 object-cover"
                    />
                  )}

                  <div className="pl-5 p-2">
                    {/* <h3 className="font-bold text-lg mb-2">
                      {post?.title || "Untitled Post"}
                    </h3> */}

                    {post?.content && (
                      <div className={`flex gap-4  items-center`}>
                        {
                            post?.photos?.url && (
                              <img src={postUserData?.profileUrl?.url} alt="" srcset="" className="sm:w-8 sm:h-8 w-10 h-10 rounded-[100%] object-cover" />
                            )
                        }
                      <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                      {post?.content }
                    </p>

                      </div>
                    )}
                  </div>

                  {/* //like and comment section */}
                  <div className="flex gap-4 pl-5 p-3">
                    <div onClick={()=> handleLike(post._id)}>
                      {
                         post.likes?.includes(userProfile._id)
                              ? <ThumbsUp color="#a63707" />
                              : <ThumbsUp />
                      }
                      
                     
                     

                    </div>
                    <div>
                      comment
                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-base-100 rounded-2xl p-10 text-center shadow-md">
              <h2 className="text-2xl font-bold mb-2">
                No posts Yet!!
              </h2>

              <p className="text-gray-400">
                This user hasn’t shared any posts yet.
              </p>
            </div>
          )}
        </div>
  )
}

export default PostList
