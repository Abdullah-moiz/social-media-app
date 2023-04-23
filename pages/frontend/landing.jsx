import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Post from '@/components/Post';


export default function Landing() {

  const user = useSelector(state => state?.User?.userData)
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/')
    }
  }, [])

  return (
    <div className='w-full h-screen bg-base-200 flex items-center justify-center'>
      <Navbar />
      <div className='md:w-1/2  w-full px-4 md:px-2 pt-16 bg-base-200 h-full overflow-y-auto '>
        <div className='w-full mb-2 md:h-20 py-2 md:py-0 mt-5 bg-white flex items-center justify-start px-6'>
          <div className="avatar">
            <div className="w-16 rounded-full">
              <Image alt='none' className='rounded-full' fill src={user?.profile || '/profile.png'} />
            </div>
          </div>
          <div className='ml-4 w-full flex md:justify-between justify-center md:flex-row flex-col   px-4 items-start'>
            <div>
              <h1 className='text-lg font-bold'>{user?.name}</h1>
              <p className='text-gray-500 text-xs'>{user?.email}</p>
            </div>
            <button className='btn md:m-0 mt-2 '>Add Post</button>
          </div>
        </div>

        {/* Main Post  */}

        <Post />
        <Post />
        <Post />
        <Post />
        {/* Main Post */}
      </div>
    </div>
  )
}
