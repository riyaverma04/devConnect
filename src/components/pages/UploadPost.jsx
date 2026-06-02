import React from 'react'
import UploadContainer from '../UploadContainer'
import { ArrowLeft, Folder } from 'lucide-react'
import Button from 'daisyui/components/button'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const UploadPost = () => {
    const [postContent, setPostContent ] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const handleUploadPost = async(e)=>{
        e.preventDefault();
        try{
            const data = new FormData();
            data.append("content", postContent);
            if(file){
                data.append("photos", file);
            }

            const uploadedData = await axios.post(import.meta.env.VITE_BASE_URL+'/post', data, {withCredentials: true});
            console.log(uploadedData);
            setPostContent("");
            setFile(null);
            navigate('/profile');
        }catch(err){
            console.log(err);
        }

    }


  return (
    <div className="  h-screen w-screen">
        <ArrowLeft className='text-4xl text-orange-500 cursor-pointer m-5' onClick={()=>window.history.back()} />

    <div className='flex items-center justify-center h-screen w-screen  p-5 capitalize'>
       
        <UploadContainer>
            <h1 className='text-xl font-bold text-orange-500'> Upload your Post</h1>
            <textarea placeholder="Type your post here..." className="textarea border-none focus:outline-none w-full h-40 bg-gray-700 text-white" onChange={(e) => setPostContent(e.target.value)} />

           <div className=' w-full align-left '>
             <label htmlFor="fileInput" className="cursor-pointer text-4xl text-orange-500 align-left ">
        <Folder  />
      </label>

     
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />
           </div>



                              <button type='button' className="btn mt-5  bg-orange-500" onClick={handleUploadPost}>upload</button>

     




        </UploadContainer>

      
    </div>
    </div>
  )
}

export default UploadPost
