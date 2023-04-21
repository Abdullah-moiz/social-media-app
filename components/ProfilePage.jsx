import { update_my_profile } from '@/services/userProfile'
import { setUserData } from '@/utils/userSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function ProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector(state => state?.User?.userData)
  const [edit, setEdit] = useState(true)
  const [profileData, setProfileData] = useState({id : user?._id ,  name: user?.name || "", dob: user?.dob || "", phoneNumber: user?.phoneNumber || "", bio: user?.bio || "", background: null, profile: null })



  const handleUpdateProfile = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', profileData?.name);
    formData.append('id', profileData?.id);
    formData.append('dob', profileData?.dob);
    formData.append('phoneNumber', profileData?.phoneNumber);
    formData.append('bio', profileData?.bio);
    formData.append('background', profileData?.background);
    formData.append('profile', profileData?.profile);
    
    const response =  await update_my_profile(formData);
    console.log(response)
    if(response?.success) {
      toast.success(response?.message);
      dispatch(setUserData(response?.data));
      setEdit(state => !state);
    }else{
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
    <div className='w-full py-4 bg-gray flex flex-col items-center justify-center bg-base-200 '>
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
          <textarea value={profileData?.bio } onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} disabled={edit} className="textarea" placeholder="Bio"></textarea>
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
          <input value={profileData?.dob } onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })} disabled={edit} type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input value={profileData?.phoneNumber } onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })} disabled={edit} type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Change Profile</span>
          </label>
          <input accept='image/png ,  image/jpg , image/jpeg' onChange={handleProfileImage} disabled={edit} type="file" placeholder="Type here" className="file-input file-input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Change Background</span>
          </label>
          <input  accept='image/png , image/jpg , image/jpeg' onChange={handleBackgroundImage} disabled={edit} type="file" placeholder="Type here" className="file-input file-input-bordered w-full max-w-xs" />
        </div>
        <div className='flex w-full items-center justify-center py-2'>
          <button type='submit' disabled={edit} className='btn btn-wide mt-4 mb-2'>Update Profile</button>
        </div>
      </form>
    </div>
  )
}
