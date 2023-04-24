import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Post from '@/components/Post';
import useSWR from 'swr'
import { getAllPosts } from '@/services/posts';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import { setPostData } from '@/utils/postSlices';

export default function Landing() {

  const user = useSelector(state => state?.User?.userData)
  const router = useRouter();
  const dispatch = useDispatch();



  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/')
    }
  }, [])


  const { data, error, isLoading } = useSWR('getAllPost', getAllPosts)

  useEffect(() => {
    if (data) dispatch(setPostData(data?.data));
  }, [dispatch, data])

  if (error) return toast.error('Something went wrong please try again later')


  const AllPosts = useSelector(state => state?.Post?.posts)

  


  return (
    <>
      {
        isLoading && (
          <div className='w-full h-screen flex-col bg-black flex items-center justify-center '>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
            <h1 className='text-sm my-2 text-white font-semibold tracking-wider'>Loading Resources hold Tight....</h1>
          </div>
        )
      }
      <div className='w-full h-screen bg-base-200 flex items-center justify-center'>
        <Navbar />
        <div className='md:w-1/2  w-full px-4 md:px-2 pt-16 bg-base-200 h-full overflow-y-auto '>
          <div className='w-full rounded mb-2 md:h-20 py-2 md:py-0 mt-5 bg-white flex items-center justify-start px-6'>
            <div className="avatar">
              <div className="w-16 rounded-full relative">
                <Image alt='none' className='rounded-full' fill src={user?.profile || '/profile.png'} />
              </div>
            </div>
            <div className='ml-4 w-full flex md:justify-between justify-center md:flex-row flex-col   px-4 items-start'>
              <div>
                <h1 className='text-lg font-bold'>{user?.name}</h1>
                <p className='text-gray-500 text-xs'>{user?.email}</p>
              </div>
              <button onClick={() => router.push('/frontend/createPost')} className='btn md:m-0 mt-2 '>Add Post</button>
            </div>
          </div>

          {/* Main Post  */}
          {
            AllPosts?.map((post) => <Post key={post?._id} post={post} />)
          }

          {/* Main Post */}
        </div>
      </div>
    </>
  )
}
