import Image from 'next/image'
import { BiUser } from 'react-icons/bi'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { IoCreateSharp } from 'react-icons/io5'
import { FaUserFriends } from 'react-icons/fa'
import ProfilePage from '@/components/ProfilePage';
import { BiHome } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Post from '@/components/Post';
import useSWR from 'swr'
import { getAllPostsOfSpecifiedUser } from '@/services/posts';
import { setSpecifiedPostData } from '@/utils/postSlices';
import { RotatingLines } from 'react-loader-spinner';
import Friends from '@/components/Friends';
import { getListOfAllUser } from '@/services/friends';

export default function UserProfile() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.User?.userData)
    const SpecifiedPosts = useSelector(state => state?.Post?.specifiedPosts)

    useEffect(() => {
        if (!Cookies.get('token')) {
            router.push('/')
        }
    }, [])


    const [active, setActive] = useState('posts')



    const { data : postData , error : postError, isLoading : postLoading } = useSWR('/getAllSpecifiedUserPost', () => getAllPostsOfSpecifiedUser(user?._id))
    const { data : friendData , error : friendError, isLoading : firendLoading } = useSWR('/getAllUsersDataAsFirend', getListOfAllUser)


    useEffect(() => {
        if (postData) dispatch(setSpecifiedPostData(postData?.data));
    }, [dispatch, postData])

    if (postError) return toast.error('Something went wrong please try again later')
    if (friendError) return toast.error('Something went wrong please try again later')



    const allUser = friendData?.data?.filter((thisUser) => thisUser?._id !== user?._id);




    return (
        <>
            {
                postLoading || firendLoading && (
                    <div className='w-full h-screen flex-col bg-black flex items-center justify-center '>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="30"
                            visible={true}
                        />
                        <h1 className='text-sm my-2 text-white  font-semibold tracking-wider'>Loading Resources hold Tight....</h1>
                    </div>
                )
            }

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
                                <div className="w-16 rounded-full relative">
                                    <Image alt='none' className='rounded-full' fill src={user?.profile || '/profile.png'} />
                                </div>
                            </div>
                            <div className='ml-4 w-full flex md:justify-between justify-center md:flex-row flex-col   px-4 items-start'>
                                <div>
                                    <h1 className='text-lg font-bold'>{user?.name}</h1>
                                    <p className='text-gray-500 text-xs'>2.6k Friends</p>
                                </div>
                                <button onClick={() => router.push('/frontend/createPost')} className='btn md:m-0 mt-2 '>Add Post</button>
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
                                        {
                                            SpecifiedPosts?.length > 0 ? SpecifiedPosts?.map((post) => <Post key={post?._id} post={post} />) : <p className='text-gray-500 text-center mt-4'>No Posts Found</p>
                                        }
                                    </div>
                                    : <div className='w-full h-full py-2 overflow-y-auto'>
                                        {
                                            allUser?.length > 0 ? allUser?.map((friend) => <Friends key={friend?._id} friendData={friend} />) : <p className='text-gray-500 text-center mt-4'>No Posts Found</p>
                                        }
                                        
                                    </div>
                        }
                    </div>


                </div>
                <ToastContainer />
            </div>
        </>
    )
}

