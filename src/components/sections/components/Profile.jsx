import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../../../redux'
import {fetchProfileFromState} from '../../../redux'

function Profile() {
  const profile = useSelector(state => state.profile.data)
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [bioLength, setBioLength] = useState(0);
  
  const handleChange = (event) => {
    console.log(event.target.value);
    let editedProfile = {...profile, [event.target.name]: event.target.value}
    dispatch(updateProfile(editedProfile));
  }

  const checkForEnter = (event) => {
    if(event.key === 'Enter'){
        event.target.blur();
    }
    if (event.target.name === 'profileBio') {
      setBioLength(event.target.value.length);
    }
  }

  function openWidget(){
    setIsUploading(true);
    var myWidget = window.cloudinary.createUploadWidget({
    cloudName: 'dxe8948vp',
    sources: ['local', 'url', 'camera'], 
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1,
    uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        let editedProfile = {...profile, profileImage: result.info.secure_url, imageAssetId: result.info.asset_id};
        setIsUploading(false);
        dispatch(updateProfile(editedProfile)); 
      }else{
        console.log(error);
        setIsUploading(false);
        setError(error.response.data.error.message);
      }
    }
  )
  myWidget.open();
}

  useEffect(() => {
    setBioLength(profile.profileBio.length);
  }, [profile]);

  return (
<div className='text-left'>
    <h2 className='text-3xl mb-3'>Profile</h2>
    <div className='grid grid-row-2 gap-2 p-3 bg-gray-300 text-left rounded-xl shadow-lg'>
      <div className=''>
        <div className='grid grid-cols-3 gap-3 mb-2 item-center' style={{alignItems:'center'}}>
          <div className='text-center'>
            <img className='h-[100px] w-[100px] rounded-full' src={profile.profileImage} alt="" />
          </div>
          {/* <input type="file" className='hidden' onChange={fileChangedHandler} ref={fileInput=> setFileInput(fileInput)} ></input> */}
          <button onClick={()=>{openWidget()}} disabled={isUploading}  className={`h-[40px] ${isUploading ? 'disabled dark:bg-gray-600':'dark:bg-gray-800'}  dark:border-gray-600hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 text-white font-bold rounded`}>
            { !isUploading ? 'Pick an image' : 'Opening widget' }</button>
          <button className='h-[40px] dark:bg-gray-400 dark:border-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 text-gray-800 font-bold rounded'>Remove</button>
        </div>
      </div>
      <input onBlur={handleChange} onKeyUp={checkForEnter} type="text" className='p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200' name="profileTitle" id="" placeholder='Enter Title' defaultValue={profile.profileTitle}/>
      <textarea onBlur={handleChange} onKeyUp={checkForEnter} name='profileBio' className='p-1 pl-2.5 w-full rounded placeholder:italic placeholder:text-slate-400 focus:outline-none bg-gray-200' placeholder='Bio' maxLength={80} defaultValue={profile.profileBio}></textarea>
      <div className='w-full text-right p-0 m-0'>
        <p>{bioLength}/80</p>
      </div>
    </div>
    {
      error ? <div className='text-red-500 text-center'>{error}</div> : null
    }
  </div>  )
}

export default Profile
