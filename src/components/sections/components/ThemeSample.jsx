import React from 'react'
import {updateAppearence} from '../../../redux';
import {useDispatch} from 'react-redux';

function ThemeSample({theme}) {
    console.log(theme);
    const bodyStyle = {
        background: theme.appearance.bodyStyle.backgroundColor,
        color: theme.appearance.bodyStyle.color,
      };
      const cardStyle = {
        background: theme.appearance.cardStyle.backgroundColor,
        color: theme.appearance.cardStyle.color,
        borderColor: theme.appearance.cardStyle.borderColor,
        borderRadius: parseInt(theme.appearance.cardStyle.borderRadius.split('px')[0])*0.3333+'px',
        borderWidth: theme.appearance.cardStyle.borderWidth,
        boxShadow: theme.appearance.cardStyle.shadow,
      };
  return (
    <div key={theme._id} >
            <div style={bodyStyle} className='bg-gray-500 h-[300px] rounded-lg shadow-lg p-2 flex flex-col align-middle'>
              <div className='m-auto mt-3 mb-4 text-center align-middle'>
                <div className='h-[50px] w-[50px] bg-gray-100 rounded-full mb-[5px] m-auto'></div>
                <p className='text-xs'>John Doe</p>
                <p className='text-xs'>Lorem ipsum dolor sit.</p>
              </div>
              <div className='grid grid-rows-3 gap-2'>
                <div style={cardStyle} className=' text-center h-[20px] bg-slate-50 rounded-full'>
                    <p className='text-xs'>lorem ipsum</p>
                </div>
                <div style={cardStyle} className=' text-center h-[20px] bg-slate-50 rounded-full'>
                    <p className='text-xs'>lorem ipsum</p>
                </div>
                <div style={cardStyle} className=' text-center h-[20px] bg-slate-50 rounded-full'>
                    <p className='text-xs'>lorem ipsum</p>
                </div>
              </div>
            </div>
          </div>  )
}

export default ThemeSample