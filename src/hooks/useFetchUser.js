import axios from "axios";
import { useEffect, useState } from "react";



const useFetchUser=(userId)=>{
    const [user, setUser] = useState(null);
    useEffect(()=>{
    const fetchUser = async()=>{
        try{
        const res = await axios.get(`http://localhost:7777/profile/${userId}/view`,{withCredentials:true});
        const profile = res.data?.userProfile;
        // console.log(res)
        setUser(profile);

    }catch(err){
        console.log(err);
    }

    }

    if(userId){
        fetchUser();
    }
        },[userId])


        

        return user;

    

}


export default useFetchUser;