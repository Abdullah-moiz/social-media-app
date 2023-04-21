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
import { toast , ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';


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
        <div className='w-full h-screen bg-base-200 flex items-start justify-center overflow-hidden'>
            <div className='md:w-1/2  w-full   bg-base-200 relative'>
                <div className='  flex items-center justify-center relative w-full h-52'>
                    <Image fill src={`/background/${user?.background}`} alt='https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg' />
                    <div className='absolute z-50 bottom-0 left-0 mx-auto right-0 w-32 h-32 rounded-full'>
                        <Image fill className='rounded-full ' alt='/profile.png' src={`/profile/${user?.profile}`} />

                    </div>
                </div>
                <div className="btm-nav fixed bottom-0 left-0 z-50">
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

                <div className='w-full h-128   flex items-start justify-start overflow-y-auto'>


                    {
                        active === 'profile' ?
                            <ProfilePage/>
                            : active === 'posts' ?
                                <div className='w-full h-full  bg-blue-500 overflow-y-auto'>
                                    I am post div
                                    <div className='w-full h-96 '></div>
                                    <div className='w-full h-96'></div>
                                    <div className='w-full h-96'></div>
                                    <div className='w-full h-96'></div>
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
