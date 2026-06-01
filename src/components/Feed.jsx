// Feed.jsx

import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserFromFeed, setFeed } from '../utils/feedSlice'

const Feed = () => {

    const dispatch = useDispatch();

    const feedUser = useSelector((store) => store?.feed);

    const getFeedUser = async () => {
        try {

            const res = await axios.get(
                'http://localhost:7777/feed',
                { withCredentials: true }
            );

            dispatch(setFeed(res?.data?.feedUser));

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFeedUser();
    }, []);

    const handleInterestClick = async (id, status) => {

        try {

            await axios.post(
                `http://localhost:7777/send/${status}/${id}`,
                {},
                { withCredentials: true }
            );

            dispatch(removeUserFromFeed(id));

        } catch (err) {
            console.log(err);
        }
    };

    const firstUser = feedUser?.[0];

    return (

        <div className='min-h-screen bg-base-200 flex justify-center items-center px-3 sm:px-5 py-6'>

            {firstUser ? (

                <UserCard
                    user={firstUser}
                    handleInterestedRequest={handleInterestClick}
                />

            ) : (

                <div className='bg-base-100 w-full max-w-md rounded-3xl shadow-2xl p-8 text-center'>

                    <h1 className='text-2xl sm:text-3xl font-bold'>
                        No More Profiles
                    </h1>

                    <p className='text-gray-400 mt-3 text-sm sm:text-base'>
                        You’ve reached the end of your feed.
                    </p>

                </div>
            )}

        </div>
    )
}

export default Feed