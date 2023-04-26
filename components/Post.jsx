import Image from 'next/image'
import React, { useState } from 'react'
import { AiFillDelete, AiOutlineLike } from 'react-icons/ai'
import { BiComment, BiEditAlt } from 'react-icons/bi'
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { SlOptions } from 'react-icons/sl';
import { deletePostOfSpecifiedUser, updatePostOfSpecifiedUser } from '@/services/posts';
import { ToastContainer, toast } from 'react-toastify';
import { useSWRConfig } from "swr"
import { setPostData } from '@/utils/postSlices';

export default function Post({ post }) {
    const { mutate } = useSWRConfig();
    const [showOption, setShowOption] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(state => state.User?.userData)
    
    const getTimeElapsed = (dateString) => formatDistanceToNow(new Date(dateString), { addSuffix: true });
    let createDate = getTimeElapsed(post?.createdAt) || "2 hour ago";


    const checkPost = () => {
        if (post?.userID?._id === user?._id) {
            return true
        }
        return false
    }


    const useOutsideClick = (callback) => {
        const ref = React.useRef();

        React.useEffect(() => {
            const handleClick = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            };

            document.addEventListener('click', handleClick, true);

            return () => {
                document.removeEventListener('click', handleClick, true);
            };
        }, [ref]);

        return ref;
    };

    const handleClickOutside = () => {
        setShowOption(false);
    };
    const ref = useOutsideClick(handleClickOutside);


    const handleDeletePost = async () => {
        let postID = post?._id;
        let userID = user?._id;
        const res = await deletePostOfSpecifiedUser(postID, userID);
        console.log(res)
        if (res?.success) {
            toast.success(res?.data?.message)
            mutate('/getAllSpecifiedUserPost')
        }
        else {
            toast.error(res?.data?.message)
        }
    }


    const handleLikePost = async (post) => {
        let like = post?.likes;
        if (typeof like !== 'number') {
            like = 0;
        }
        like = like + 1;
        
        const { createdAt, description, _id , postImage, title, updatedAt, userID } = post;

        const finalData = { _id, createdAt, description, likes: like, postImage, title, updatedAt, userID: userID?._id }
        

        const res = await updatePostOfSpecifiedUser(finalData);
        if (res?.success) {
            toast.success(res?.message)
            dispatch(setPostData(res?.data))
        } else {
            toast.error(res?.message)
        }
    }




    return (
        <div className='bg-white rounded w-full py-2 mb-2 '>
            <div className='w-full h-20 mt-2 relative bg-white flex items-center justify-start px-6'>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <Image alt='none' className='rounded-full' fill src={post?.user?.profile || '/profile.png'} />
                    </div>
                </div>
                <div className=' w-full flex ml-2  flex-col px-2 '>
                    <h1 className='text-sm font-semibold'>{post?.userID?.name}</h1>
                    <p className='text-gray-500 text-xs '>{createDate}</p>
                </div>
                {
                    checkPost() &&
                    <>
                        <SlOptions onClick={() => setShowOption(state => !state)} className='cursor-pointer text-lg font-semibold ' />
                    </>
                }
                {
                    showOption &&
                    <div ref={ref} className='absolute z-50 top-12 flex items-start justify-start  py-4 px-4 flex-col right-8  rounded-xl bg-base-200'>
                        <p className='text-sm font-semibold my-2 p-1 flex items-center justify-center cursor-pointer hover:text-indigo-600 transition-all duration-300'><BiEditAlt className='mx-2 ' />  Edit Post</p>
                        <p onClick={handleDeletePost} className='text-sm font-semibold my-2 p-1 flex items-center justify-center cursor-pointer hover:text-indigo-600 transition-all duration-300'><AiFillDelete className='mx-2' /> Delete Post</p>
                    </div>
                }
            </div>
            <div className='py-2 px-4 '>
                <p className='text-sm px-2'>{post?.description}</p>
            </div>
            <div className='w-full h-96 relative  px-4 py-2 mt-2'>
                <Image src={post?.postImage} alt='no Image' fill />
            </div>
            <div className='mt-4 mb-4  w-full flex flex-col  px-4'>
                <div className='my-2 w-full flex justify-between px-4 items-center '>
                    <p className='text-gray-500 text-xs'>{post?.likes} Likes</p>
                    <p className='text-gray-500 text-xs'>2 Comments</p>
                </div>
                <div className='flex px-4  my-1 py-2 border-y border-gray-500'>
                    <div onClick={() => handleLikePost(post)} className='mt-1   hover:bg-gray-200  cursor-pointer transition-all duration-200 py-2 px-2 rounded flex items-center justify-center'>
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
