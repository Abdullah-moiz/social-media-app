import { getCommentsOFPost } from '@/services/posts';
import { AddNewComment } from '@/services/posts';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { mutate } from 'swr'
import { formatDistanceToNow } from 'date-fns';
import useSWR from 'swr'
import Image from 'next/image';
import { RotatingLines } from 'react-loader-spinner';

export default function Comments({ postID, setShowCommentBox }) {

    const user = useSelector(state => state?.User?.userData)
    const [comment, setComment] = useState('');



    const { data, isLoading, error } = useSWR('/getAllCommentsOFPOst', () => getCommentsOFPost(postID))
    if (error) toast.error('Something Went Wrong ')

    const getTimeElapsed = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) {
            return "2 hour Ago";
        }
        return formatDistanceToNow(date, { addSuffix: true });
    }
    const createDate =  getTimeElapsed(data?.data?.createdAt)

    const handleSubmitComment = async () => {
        if (!comment) return toast.error("PLease Write Your Comment");
        const finalData = { userComment: comment, userID: user?._id, postID }
        const res = await AddNewComment(finalData);
        if (res?.success) {
            toast.success(res?.message);
            mutate('/getAllCommentsOFPOst')
        } else {
            toast.error(res?.message);
        }
        setComment('')
    }




    const useOutsideClick = (callback) => {
        const ref = useRef();

        useEffect(() => {
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
        setShowCommentBox(false);
    };
    const commentRef = useOutsideClick(handleClickOutside);

    

    

    return (
        <>
            {
                isLoading ? (
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
                ) : (
                    <div ref={commentRef} className='absolute bottom-0 left-0 z-30 w-full px-4 h-96  bg-white '>
                        <div className='w-full py-3 h-full overflow-auto  '>
                            {/* map over it for comments */}
                            {
                                data?.data?.map((comment) => {
                                    return (
                                        <div key={comment?._id} className="chat chat-start">
                                            <div className="chat-image avatar">
                                                <div className="w-10 relative rounded-full">
                                                    <Image fill alt='no Image' src={comment?.userID?.profile || "/profile.png"} />
                                                </div>
                                            </div>
                                            <div className="chat-header">
                                                {comment?.userID?.name}
                                                <time className="text-xs opacity-50 mx-2">{createDate}</time>
                                            </div>
                                            <div className="chat-bubble">{comment?.userComment}</div>

                                        </div>
                                    )
                                })

                            }
                            {
                                data?.data.length === 0 && <p className='text-gray-700 py-2 px-2 my-2 font-semibold'>No Comments Found</p>
                            }



                            {/* map over it for comments */}

                        </div>
                        <div className='flex relative  bottom-0 w-full left-0 px-3 py-2'>
                            <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Type Your Comment" className="input input-bordered  w-full " />
                            <button onClick={handleSubmitComment} className='btn mx-2 '>Comment</button>
                        </div>
                    </div>
                )

            }


        </>
    )
}
