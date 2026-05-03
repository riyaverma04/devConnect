import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from './Form';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { setUser } from '../utils/userSlice';
// import label from 'daisyui/components/label';



const ProfileEdit = () => {
    const userDetails = useSelector((store) => store?.user);
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
       firstName:  "",
                lastName:  "",
                
                about:   "",
                skills:  "",
        age: "",
        gender: "",
    });

   
useEffect(() => {
  if (userDetails) {
    setFormData({
      firstName: userDetails.firstName || "",
      lastName: userDetails.lastName || "",
    //   profileUrl: userDetails.profileUrl,
      about: userDetails.about || "",
      skills: userDetails.skills || "",
      age: userDetails.age || "",
      gender: userDetails.gender || "",
    });
  }
}, [userDetails]);






   


    // const handleUpdateProfile= async(e)=>{
    //     e.preventDefault()
    //       try {
    // const data = new FormData();

    // // append text fields
    // data.append("firstName", formData.firstName);
    // data.append("lastName", formData.lastName);
    // data.append("about", formData.about);
    // data.append("skills", formData.skills);
    // data.append("age", formData.age);
    // data.append("gender", formData.gender);

    // // 🔥 IMPORTANT: file handling
    // if (formData.profileUrl instanceof File) {
    //   data.append("photo", formData.profileUrl); // must match backend
    // }
       
    //         const res = await axios.patch('http://localhost:7777/update',data,{withCredentials:true, headers: {
    //       "Content-Type": "multipart/form-data",
    //     },});
    //         console.log(res);
    //          dispatch(setUser(res));
    //          navigate('/profile');

    //     }catch(err){
    //         console.log(err)
    //     }
       
    // }


    const handleUpdateProfile = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
  data.append(key, formData[key]);
});

if (file) {
  data.append("photo", file); // 🔥 always works now
}

    const res = await axios.patch(
      "http://localhost:7777/update",
      data,
      { withCredentials: true }
    );

    console.log("UPDATED USER:", res.data);

    dispatch(setUser(res.data.updatedUser));

   setTimeout(() => {
  navigate("/profile");
}, 500);

  } catch (err) {
    console.log(err);
  }
};

    
    // console.log(userDetails.firstName)
    // console.log("userDetails", userDetails.firstName)
     if (!userDetails) {
        return (
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <span className="loading loading-dots loading-xl"></span>
                <h1>Loading...</h1>
            </div>
        );
    }
    const editableDetails = [
        {
            id: 0,
            label: "firstName",
            type: "text",
            valueToDisplay:userDetails.firstName,

        },
        {
            id: 1,
            label: "lastName",
            type: "text",
            valueToDisplay:userDetails.lastName,

        },
        {
            id: 2,
            label: "profileUrl",
            type: "file",
            onChange: (val) => setFile(val),

        },
        {
            id: 3,
            label: "about",
            type: "textarea",
            valueToDisplay:userDetails.about,

        },
        {
            id: 4,
            label: "skills",
            type: "text",
            valueToDisplay:userDetails.skills,
             

        },
        {
            id: 5,
            label: "age",
            type: "date",

        }
    ]



    

    return (

        <>
            <span className="pt-3 pl-5 block" onClick={() => navigate('/profile')}> <ChevronLeft /></span>
            <div className='flex flex-col justify-center items-stretch h-auto p-5'>
                <form action="" className='flex flex-col gap-2'>
                    {
                        editableDetails.map((ele) => {
                            return (
                                <div key={ele.id}>
                                    <Form label={ele.label} type={ele.type} valueToDisplay={formData[ele.label] || ""} onChange={(val) => {
                                        if (ele.type === "file") {
                                            setFile(val);
                                            return // ✅ val is actual File
                                            }
                                        // console.log("Updating:", ele.label, val);
                                        setFormData((prev) => (
                                            { ...prev, [ele.label]: val }
                                        ))
                                    }} />
                                </div>
                            )
                        })
                    }
                    <label className=' text-white font-bold mt-2'>Gender</label>
                    <select
                        className="select"
                        value={formData.gender}
                        onChange={(e) => {
                            setFormData((prev) => ({
                                ...prev,
                                gender: e.target.value
                            }));
                        }}
                    >
                        <option value="" disabled>choose a gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    <button type='button' className="btn mt-5  bg-orange-500" onClick={handleUpdateProfile}>save</button>
                    



                </form>



            </div>
        </>
    )
}

export default ProfileEdit
