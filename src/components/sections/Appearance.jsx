import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CustomizeTheme from './components/CustomizeTheme';
import Profile from './components/Profile';
import Themes from './components/Themes';
import axios from 'axios';
import { useEffect } from 'react';
import Loading from './components/Loading';


function Appearance() {
  const isProfileLoading = useSelector(state => state.profile.loading);
  const [themes, setThemes] = React.useState(useSelector(state=> state.themes.data));

  useEffect(()=>{
  }, [themes])

  return (
    <div>
      { !isProfileLoading && themes ?
        <div>
          <Profile /> 
          <div className='mt-5 text-left'>
            <Themes themes={themes}></Themes>
          </div>
          <div className='mt-5 text-left'>
            <CustomizeTheme/>
          </div>
        </div>
      : 
      <Loading/>
      }
    </div>
    
  )
}

export default Appearance
