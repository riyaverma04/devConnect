// UserCard.jsx

import React from 'react'
import { useNavigate } from 'react-router'

const UserCard = ({ user, handleInterestedRequest }) => {

    const {
        firstName,
        lastName,
        profileUrl,
        about,
        _id,
        age,
        gender
    } = user || {};

    const navigate = useNavigate();

    return (

        <div className='w-full flex justify-center'>

            <div className='
                w-full
                max-w-sm
                sm:max-w-md
                bg-base-100
                rounded-3xl
                overflow-hidden
                shadow-2xl
                border border-base-300
            '>

                {/* IMAGE SECTION */}

                <div className='relative h-[380px] sm:h-[500px] w-full'>

                    <img
                        src={profileUrl?.url}
                        alt='profile'
                        className='w-full h-full object-cover'
                    />

                    {/* Overlay */}

                    <div className='absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent'></div>

                    {/* User Info */}

                    <div className='absolute bottom-0 left-0 w-full p-4 sm:p-6 text-white'>

                        <div className='flex justify-between items-end gap-3'>

                            <div>

                                <h1 className='text-2xl sm:text-3xl font-bold leading-tight'>
                                    {firstName} {lastName}
                                </h1>

                                <div className='flex gap-3 mt-2 text-xs sm:text-sm text-gray-200'>

                                    {age && (
                                        <span>
                                            {age} years
                                        </span>
                                    )}

                                    {gender && (
                                        <span className='capitalize'>
                                            {gender}
                                        </span>
                                    )}

                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    navigate(`/profile/${_id}/view`)
                                }
                                className='btn btn-xs sm:btn-sm btn-secondary rounded-full px-4'
                            >
                                View
                            </button>

                        </div>

                    </div>
                </div>

                {/* CONTENT */}

                <div className='p-4 sm:p-6'>

                    <p className='
                        text-gray-400
                        text-sm
                        sm:text-base
                        leading-relaxed
                        min-h-[60px]
                    '>
                        {about || "No bio available"}
                    </p>

                    {/* BUTTONS */}

                    <div className='flex gap-3 mt-6'>

                        <button
                            className='
                                btn
                                flex-1
                                bg-red-500
                                hover:bg-red-600
                                border-none
                                text-white
                                rounded-2xl
                                text-sm
                            '
                            onClick={() =>
                                handleInterestedRequest(_id, "ignored")
                            }
                        >
                            Ignore
                        </button>

                        <button
                            className='
                                btn
                                btn-primary
                                flex-1
                                rounded-2xl
                                text-sm
                            '
                            onClick={() =>
                                handleInterestedRequest(_id, "interested")
                            }
                        >
                            Interested
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserCard