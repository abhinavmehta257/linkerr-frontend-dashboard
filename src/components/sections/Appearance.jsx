import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CustomizeTheme from './components/CustomizeTheme';
import Profile from './components/Profile';
import Themes from './components/Themes';
import axios from 'axios';
import { useEffect } from 'react';


function Appearance() {
  const isProfileLoading = useSelector(state => state.profile.loading);
  const [themes, setThemes] = React.useState(useSelector(state=> state.themes.data));
  async function getThemes  (){
    const {data} = await axios.get(process.env.REACT_APP_API_URL_BASE+'/themes', {withCredentials:true})
    .catch(err=>console.log(err))
    console.log(data);
    setThemes(data);
  } 

  useEffect(()=>{
    if(themes.length == 0){
      getThemes()
    }
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
      <div className='text-center w-full h-full bg-slate-100 text-2xl text-gray-800 justify justify-center flex flex-col'>Loading...</div>
      }
    </div>
    
  )
}

export default Appearance




employee [
  {
    name
  }
]