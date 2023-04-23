import { update_my_profile } from '@/services/userProfile'
import { storage } from '@/utils/firebaseSetup';
import { setUserData } from '@/utils/userSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { InfinitySpin } from 'react-loader-spinner';

export default function ProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector(state => state?.User?.userData)
  const [edit, setEdit] = useState(true)
  const [profileProgress, setProfileProgress] = useState(0)
  const [backgroundProgress, setBackgroundProgress] = useState(0)
  const [profileData, setProfileData] = useState({ id: user?._id, name: user?.name || "", dob: user?.dob || "", phoneNumber: user?.phoneNumber || "", bio: user?.bio || "", background: null, profile: null })
  const [updatingProfile, setUpdatedProfile] = useState(false)


  const uploadProfileImages = async (file) => {

    const createFileName = () => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      return `${file?.name}-${timestamp}-${randomString}`;
    }

    const fileName = createFileName();
    const storageRef = ref(storage, `image/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProfileProgress(progress)
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









  const uploadBackgroundImages = async (file) => {
    const createFileName = () => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      return `${file?.name}-${timestamp}-${randomString}`;
    }

    const fileName = createFileName();
    const storageRef = ref(storage, `image/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setBackgroundProgress(progress)
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


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatedProfile(true)


    let profilePicUrl;
    let backgroundPicUrl;






    if (profileData?.profile) {

      const notProf = await uploadProfileImages(profileData?.profile)
      profilePicUrl = notProf



    }

    if (profileData?.background) {
      const notbg = await uploadBackgroundImages(profileData?.background)
      backgroundPicUrl = notbg



    }



    const finalData = { name: profileData?.name, id: profileData?.id, dob: profileData?.dob, phoneNumber: profileData?.phoneNumber, bio: profileData?.bio, background: backgroundPicUrl, profile: profilePicUrl }

    const response = await update_my_profile(finalData);
    if (response?.success) {
      toast.success(response?.message);
      dispatch(setUserData(response?.data));
      setEdit(state => !state);
      setUpdatedProfile(false)
    } else {
      toast.error(response?.message);
    }
  }



  const handleProfileImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileSize = file.size / 1024 / 1024; // Convert to MB
      if (fileSize <= 1) {
        return setProfileData({ ...profileData, profile: file })
      } else {
        return toast.error('Profile Image size should be less than 1MB');
      }
    }
  };


  const handleBackgroundImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileSize = file.size / 1024 / 1024; // Convert to MB
      if (fileSize <= 1) {
        return setProfileData({ ...profileData, background: file })
      } else {
        return toast.error('Background Image size should be less than 1MB');
      }
    }
  };



  return (

    <div className='w-full py-4 mb-2 bg-gray flex flex-col items-center justify-center bg-base-200 '>
      {
        updatingProfile
        &&
        <div className='bg-gray-800/90 absolute flex-col z-50 w-full h-full top-0 left-0 flex items-center justify-center'>
          <InfinitySpin
            width='200'
            color="#4fa94d"
          />
          <p className='text-sm my-2 text-white uppercase font-semibold'>Updating changes Hold Tight .....</p>
        </div>
      }
      <form onSubmit={handleUpdateProfile} className='w-3/4 flex flex-col items-center justify-center'>


        <div className='w-full flex justify-end items-center py-2 '>
          <button type='button' onClick={() => setEdit(state => !state)} className='btn btn-dark'>{edit ? "Edit Profile" : "Cancel"} </button>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input value={profileData?.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} disabled={edit} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea value={profileData?.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} disabled={edit} className="textarea" placeholder="Bio"></textarea>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input value={user?.email} disabled type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">DOB</span>
          </label>
          <input value={profileData?.dob} onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })} disabled={edit} type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input value={profileData?.phoneNumber} onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })} disabled={edit} type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Change Profile</span>
          </label>
          <input accept='image/png ,  image/jpg , image/jpeg' onChange={handleProfileImage} disabled={edit} type="file" placeholder="Type here" className="file-input file-input-bordered w-full max-w-xs" />
          {
            profileProgress > 0 && profileProgress < 100 && <progress className="progress progress-success w-full" value={profileProgress} max="100"></progress>
          }
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Change Background</span>
          </label>
          <input accept='image/png , image/jpg , image/jpeg' onChange={handleBackgroundImage} disabled={edit} type="file" placeholder="Type here" className="file-input file-input-bordered w-full max-w-xs" />
          {
            backgroundProgress > 0 && backgroundProgress < 100 && <progress className="progress progress-success w-full" value={backgroundProgress} max="100"></progress>
          }
        </div>
        <div className='flex w-full items-center justify-center py-2'>
          <button type='submit' disabled={edit} className='btn btn-wide mt-4 mb-2'>Update Profile</button>
        </div>
      </form>
    </div>
  )
}
