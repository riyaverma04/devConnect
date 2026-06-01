import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "../utils/postSlice";


const useFetchPost =(profileId)=>{
   const dispatch = useDispatch();

    useEffect(() => {
     const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${profileId}`,
        {
          withCredentials: true,
        }
      );

      console.log("posts => ", res.data.posts);
      dispatch(setPosts(res.data.posts || []));
    } catch (err) {
      console.log(err);
    }
    };
    if(profileId){
        fetchPosts();
    }   
    }, [profileId]);

  

}
export default useFetchPost;