import Image from 'next/image'
import Link from 'next/link'
import { BiUser } from 'react-icons/bi'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { IoCreateSharp } from 'react-icons/io5'
import { FaUserFriends } from 'react-icons/fa'
import ProfilePage from '@/components/ProfilePage';
import { BiHome } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Post from '@/components/Post';


export default function UserProfile() {
    const router = useRouter();
    const user = useSelector(state => state?.User?.userData)

    useEffect(() => {
        if (!Cookies.get('token')) {
            router.push('/')
        }
    }, [])


    const [active, setActive] = useState('posts')






    return (
        <div className='w-full bg-base-200 flex items-start justify-center overflow-hidden '>
            <div className='md:w-1/2 bg-base-200   w-full h-screen    relative pb-72  '>
                <div className='flex items-center justify-center relative pb-2 w-full h-60 '>
                    {user?.background ? (
                        <Image fill src={`${user?.background} `} alt='Background Image' />
                    ) : (

                        <p className='text-gray-500 text-center'>Upload a background image</p>

                    )}

                    <div className='w-full absolute bottom-0 left-0  md:h-20 py-2 md:py-0 mt-5 bg-white flex items-center justify-start px-6'>
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <Image alt='none' className='rounded-full' fill src={user?.profile || '/profile.png'} />
                            </div>
                        </div>
                        <div className='ml-4 w-full flex md:justify-between justify-center md:flex-row flex-col   px-4 items-start'>
                            <div>
                                <h1 className='text-lg font-bold'>{user?.name}</h1>
                                <p className='text-gray-500 text-xs'>2.6k Friends</p>
                            </div>
                            <button className='btn md:m-0 mt-2 '>Add Post</button>
                        </div>
                    </div>


                </div>

                <div className="btm-nav  absolute   bottom-0 left-0 z-50">
                    <button onClick={() => router.push('/frontend/landing')} >
                        <BiHome className="h-5 w-5 " />
                        <span className="btm-nav-label">Home</span>
                    </button>
                    <button onClick={() => setActive('posts')} className={`${active === 'posts' ? 'active' : "null"}`}>
                        <IoCreateSharp className="h-5 w-5 " />
                        <span className="btm-nav-label">Posts</span>
                    </button>
                    <button onClick={() => setActive('profile')} className={`${active === 'profile' ? 'active' : "null"}`}>
                        <BiUser className='h-5 w-5' />
                        <span className="btm-nav-label">Profile</span>
                    </button>
                    <button onClick={() => setActive('friends')} className={`${active === 'friends' ? 'active' : "null"}`}>
                        <FaUserFriends className='h-5 w-5 ' />
                        <span className="btm-nav-label">Friends</span>
                    </button>
                </div>

                <div className='w-full h-full  flex items-start justify-start overflow-y-auto'>


                    {
                        active === 'profile' ?
                            <ProfilePage />
                            : active === 'posts' ?
                                <div className='w-full h-full py-2  overflow-y-auto'>
                                    <Post />
                                    <Post />
                                    <Post />
                                    <Post />
                                    <Post />
                                    <Post />
                                </div>
                                : <div className='w-full h-full  bg-green-500 overflow-y-auto'>
                                    I am friends div
                                    <div className='w-full h-96'></div>
                                    <div className='w-full h-96'></div>
                                    <div className='w-full h-96'></div>
                                    <div className='w-full h-96'></div>
                                </div>
                    }
                </div>


            </div>
            <ToastContainer />
        </div>
    )
}

// <div className='absolute z-50 bottom-0 left-0 mx-auto right-0 w-32 h-32 rounded-full'>
// {user?.profile ? (
//     <Image fill className='rounded-full' alt='Profile Image' src={`${user?.profile || '/profile.png'}`} />
// ) : (

//     <p className='text-gray-500 text-center'>Upload a profile image</p>

// )}
// </div>