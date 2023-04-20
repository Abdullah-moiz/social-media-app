import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'


export default function Landing() {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/')
    }
  }, [])

  return (
    <div className='w-full h-screen bg-base-200 flex items-center justify-center'>
      <Navbar />
      <div className='md:w-1/2  w-full px-4 md:px-2 pt-14 bg-white border-2 border-red-600 h-full overflow-y-auto '>

        <div className='h-96 w-full bg-red-600 my-4 '></div>
        <div className='h-96 w-full bg-red-600 my-4 '></div>
        <div className='h-96 w-full bg-red-600 my-4 '></div>
        <div className='h-96 w-full bg-red-600 my-4 '></div>
        <div className='h-96 w-full bg-red-600 my-4 '></div>

      </div>
    </div>
  )
}
