import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "./loading";
import axios from "axios";
import { setUser } from "../utils/userSlice";
import { addOtherUser } from "../utils/otherUserSlice";
import {
  ArrowLeft,
  Pencil,
  Users,
  MessageCircle,
  MapPin,
  Briefcase,
  ThumbsUp,
} from "lucide-react";
import PostList from "./pages/PostList";

const Profile = ({ otherUserId }) => {
  const userProfile = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  // const [toggleLike,setToggelLike]= useState(false);



  //handleToggelLike
  // const handleToggleLike=async (postId)=>{
  //   console.log("toggleLike", postId)
  //   console.log(userProfile._id, "this is user id")
  //   set
  //   //calling api to toggle like
  //   try{
  //     const res = await axios.patch(import.meta.env.VITE_BASE_URL+`/${postId}/toggle-like/${userProfile._id}`,{}, {withCredentials: true});
  //     console.log(res.data?.message)
  //     if(res.data?.message === "Post liked"){
  //       setToggelLike(true);
  //     }else{
  //       setToggelLike(false);
  //     } 


  //   }catch(err){
  //     console.log(err);
  //   }


  // }

   const handleToggleLikes = async (postId) => {
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


 







  // fetch posts
  const fetchPosts = async (profileId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${profileId}`,
        {
          withCredentials: true,
        }
      );

      console.log("posts => ", res.data.posts[0]);
      setPosts(res.data.posts[0]);
      dispatch(setPosts(res.data.posts || []));
    } catch (err) {
      console.log(err);
    }
  };

  // fetch profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // OTHER USER PROFILE
        if (otherUserId) {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/profile/${otherUserId}/view`,
            {
              withCredentials: true,
            }
          );

          const profile = res.data?.userProfile;

          if (!profile) return;

          dispatch(addOtherUser(profile));
          setUserData(profile);

          fetchPosts(profile._id);
        }

        // MY PROFILE
        else {
          const res = await axios.get(
            import.meta.env.VITE_BASE_URL+"/profile",
            {
              withCredentials: true,
            }
          );

          const profile = res.data?.userData;

          if (!profile) return;

          dispatch(setUser(profile));
          setUserData(profile);

          fetchPosts(profile._id);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [otherUserId]);
  console.log(posts[0],"thisis first post")

  // buttons
  const handleEditProfile = () => {
    navigate("/profile/update");
  };

  const handleConnectionClick = () => {
    navigate("/connections");
  };

  // loading
  if (!user || !user.firstName) {
    return <Loading />;
  }

  console.log("this are posts", posts);

  return (
    <div className="min-h-screen bg-base-200 pb-10">
      {/* TOP BAR */}
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-base-300 transition"
          >
            <ArrowLeft size={22} />
          </button>

          
        </div>
      

      {/* MAIN */}
      <div className="max-w-5xl mx-auto px-3 md:px-6 mt-5">
        {/* PROFILE CARD */}
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden">
          {/* COVER */}
          <div className="relative">
            <img
              src={
                user?.coverUrl ||
                "https://images.unsplash.com/photo-1503264116251-35a269479413"
              }
              alt="cover"
              className="w-full h-[180px] md:h-[280px] object-cover"
            />

            {/* PROFILE IMAGE */}
            <div className="absolute -bottom-16 left-5 md:left-10">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-base-100 overflow-hidden shadow-2xl">
                <img
                  src={user?.profileUrl?.url}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* USER INFO */}
          <div className="pt-20 md:pt-24 px-5 md:px-10 pb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              {/* LEFT */}
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h1>

                  {user?.gender && (
                    <span className="badge badge-secondary capitalize">
                      {user.gender}
                    </span>
                  )}
                </div>

                {/* ABOUT */}
                <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
                  {user?.about || "No bio added yet."}
                </p>

                {/* EXTRA INFO */}
                <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    Developer
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    India
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    Active User
                  </div>
                </div>

                {/* SKILLS */}
                {user?.skills?.length > 0 && (
                  <div className="mt-6">
                    <h2 className="font-semibold mb-3 text-lg">Skills</h2>

                    <div className="flex flex-wrap gap-3">
                      {user.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT BUTTONS */}
              <div className="flex gap-3 flex-wrap">
                {!otherUserId ? (
                  <>
                    <button
                      onClick={handleEditProfile}
                      className="btn bg-orange-500 hover:bg-orange-600 border-none text-white rounded-xl"
                    >
                      <Pencil size={18} />
                      Edit Profile
                    </button>

                    <button
                      onClick={handleConnectionClick}
                      className="btn btn-outline rounded-xl"
                    >
                      <Users size={18} />
                      Connections
                    </button>
                  </>
                ) : (
                  <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white rounded-xl">
                    <MessageCircle size={18} />
                    Message
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* POSTS SECTION */}
                <div className="flex items-center justify-between m-5">
            <h2 className="text-2xl font-bold">Posts</h2>

            <span className="text-gray-400 text-sm">
              {posts?.length || 0} Posts
            </span>
          </div>
           
         {
           !posts ? <Loading/>: posts.length > 0 ? (
             <div className="flex flex-col gap-5 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            {[posts[0]].map((post) => (
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
                                            <img src={user?.profileUrl?.url} alt="" srcset="" className="sm:w-8 sm:h-8 w-10 h-10 rounded-[100%] object-cover" />
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
                                  <div onClick={()=> handleToggleLikes(post._id)}>
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
              
               <button className="bg-orange-500 p-3 rounded-2xl" onClick={()=>navigate(`/posts/${user._id}` )}>see all posts</button>
             </div>
           ) : null
         }
         
        
      </div>
    </div>
  );
};

export default Profile;