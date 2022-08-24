import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

function Profile() {

  const profile = useSelector(state => state.profile.data);

  
  useEffect(() => {
  }, [])
  return (
    <div className='profile-section'>
        <img className='profile-image place-content-center' src={profile.profileImage} alt="" />
        <h1 className='profile-title'>{profile.profileTitle}</h1>
        {profile.profileBio ?
        (<h2 className='profile-bio'>{profile.profileBio}</h2>) : 
        ''}
    </div>
  )
}

export default Profile