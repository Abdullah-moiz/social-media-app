import Image from 'next/image'
import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { useSelector } from 'react-redux'

export default function Post() {
    const user = useSelector(state => state?.User?.userData)
    return (
        <div className='bg-white w-full py-2 mb-2 '>
            <div className='w-full h-20 mt-2 bg-white flex items-center justify-start px-6'>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <Image alt='none' className='rounded-full' fill src={user?.profile || '/profile.png'} />
                    </div>
                </div>
                <div className=' w-full flex ml-2  flex-col px-2 '>
                    <h1 className='text-sm font-semibold'>{user?.name}</h1>
                    <p className='text-gray-500 text-xs'>{user?.time || '2 Hours Ago'}</p>
                </div>
            </div>
            <div className='py-2 px-4 '>
                <p className='text-sm px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum possimus similique aperiam cupiditate odit aut nihil deserunt illo repudiandae sapiente.</p>
            </div>
            <div className='w-full h-96 relative  px-4 py-2 mt-2'>
                <Image src={user?.background} alt='no Image' fill />
            </div>
            <div className='mt-4 mb-4  w-full flex flex-col  px-4'>
                <div className='my-2 w-full flex justify-between px-4 items-center '>
                    <p className='text-gray-500 text-xs'>15 Like</p>
                    <p className='text-gray-500 text-xs'>2 Comments</p>
                </div>
                <div className='flex px-4  my-1 py-2 border-y border-gray-500'>
                    <div className='mt-1   hover:bg-gray-200  cursor-pointer transition-all duration-200 py-2 px-2 rounded flex items-center justify-center'>
                        <AiOutlineLike className='text-2xl mr-2' />
                        <p>Like</p>
                    </div>
                    <div className='mt-1 ml-6 hover:bg-gray-200  cursor-pointer transition-all duration-200 py-2 px-2 rounded flex items-center justify-center'>
                        <BiComment className='text-2xl mr-2' />
                        <p>Comments</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
