import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {updateAppearence} from '../../../redux';
import ThemeSample from './ThemeSample';
function Themes({themes}) {
  const dispatch = useDispatch();
  const currentThemeId = useSelector(state => state.data.data.appearance._id);
   


  useEffect(() => {
  } , []);
  return (
    <div>
      <h1 className='text-3xl mb-3'>
          Themes
      </h1>
      <div className='grid grid-cols-3 gap-5'>
        {themes.map((theme, key) => {
          return (<div className={`{ ${currentThemeId === theme._id ? 'border-4 rounded-xl border-gray-800 border-r pointer-events-none' : 'cursor-pointer'} `} onClick={()=>{dispatch(updateAppearence(theme))}}>
            <ThemeSample theme={theme} key={key} />
          </div>);
        })}            
      </div>
    </div>
  )
}

export default Themes