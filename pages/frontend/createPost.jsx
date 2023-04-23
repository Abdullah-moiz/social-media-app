import Navbar from '@/components/Navbar';
import { submit_my_post } from '@/services/posts';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { InfinitySpin } from 'react-loader-spinner';
import { storage } from '@/utils/firebaseSetup';



export default function CreatePost() {
  const user = useSelector(state => state?.User?.userData);
  const [postData, setPostData] = useState({ title: '', description: '', postImage: null, userID: user?._id })
  const [postingLoader, setPostingLoader] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/')
    }
  }, [])

  const { title, description, postImage, userID } = postData;

  const handlePostData = async (e) => {
    e.preventDefault();
    if (!title || !description || !postImage || !userID) {
      return toast.error('Please fill all the fields')
    }
    setPostingLoader(true)

    const postImageLink = await uploadPOstImages(postImage);
    const finalData = { title, description, postImage: postImageLink, userID }


    const res = await submit_my_post(finalData);
    if (res?.success) {
      setPostingLoader(false)
      toast.success(res?.message);
      setTimeout(() => {
        router.push('/frontend/landing')
      }, 1000);
    }
    else {
      setPostingLoader(false)
      toast.error(res?.message);
    }
  }


  const handlePostImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileSize = file.size / 1024 / 1024; // Convert to MB
      if (fileSize <= 1) {
        return setPostData({ ...postData, postImage: file })
      } else {
        return toast.error('Post Image size should be less than 1MB');
      }
    }
  };



  const uploadPOstImages = async (file) => {
    const createFileName = () => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      return `${file?.name}-${timestamp}-${randomString}`;
    }

    const fileName = createFileName();
    const storageRef = ref(storage, `posts/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot) => {
      }, (error) => {
        console.log(error)
        reject(error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        }).catch((error) => {
          console.log(error)
          reject(error);
        });
      });
    });
  }

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col'>
      <Navbar />
      {
        postingLoader
        &&
        <div className='bg-gray-800/90 absolute flex-col z-50 w-full h-full top-0 left-0 flex items-center justify-center'>
          <InfinitySpin
            width='200'
            color="#4fa94d"
          />
          <p className='text-sm my-2 text-white uppercase font-semibold'>Updating changes Hold Tight .....</p>
        </div>
      }
      <h1 className='text-lg font-bold tracking-widest border-b-2 border-primary mb-4 uppercase'>Create Post</h1>
      <form onSubmit={handlePostData} className='md:w-5/12 w-full h-3/4   px-2 py-3'>
        <input onChange={(e) => setPostData({ ...postData, title: e.target.value })} type="text" className='w-full mb-3 border rounded px-2 font-semibold py-2 ' placeholder='Title' />
        <textarea onChange={(e) => setPostData({ ...postData, description: e.target.value })} className='w-full h-3/5 mb-3 border rounded px-2 font-semibold py-2 ' placeholder='Description' />
        <input accept='image/png ,  image/jpg , image/jpeg' onChange={handlePostImage} type="file" className="file-input mb-3  file-input-bordered w-full " />
        <button type='submit' className='btn w-full'>Create Post</button>
      </form>
      <ToastContainer />
    </div>
  )
}
