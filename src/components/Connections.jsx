import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import axios from 'axios';
import ConnectionsList from './ConnectionsList';


const Connections = () => {
    const dispatch = useDispatch();
    console.log("before store")
    const connections = useSelector((store)=>store?.connections );
    console.log(connections)



    const fetchConnections= async()=>{
        try{
             const res = await axios.get("http://localhost:7777/user/connections",{withCredentials:true});
               console.log(res.data?.connections);
                //storeing connections in redux
                dispatch(addConnections(res.data?.connections));
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
         if (!connections || connections.length === 0) {
            console.log("fetching connections")
        fetchConnections();
  }
    },[connections]);




    
  return (
    <div>
        <div>
            {
                connections?.map((connection)=>{
                    return(
                        <div key={connection._id}>
                            <ConnectionsList  connection={connection}/>
                        </div>
                    )
                })
            }
        </div>

      
    </div>
  )
}

export default Connections
