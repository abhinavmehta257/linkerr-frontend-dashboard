import React from 'react'
import WebPage from './webpage/WebPage';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';

function Priview() {
  const isDataLoading = useSelector(state => state.data.loading);

  useEffect(() => {
    
  },[isDataLoading])

  return (
    // <div className='col-span-5 p-5'>
    //         <div className=''>
    //           <div class="smartphone">
    //             <div class="content">
    //               {
    //                 !isDataLoading ? <WebPage /> : <div className='text-center'>Loading...</div>
    //               }
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    
          <main className='col-span-5 p-5'>
          <div class="iphonex">
            <div class="front">
              <div class="screen">
                <div class="screen__view">
                  {
                   !isDataLoading ? <WebPage /> : <div className='text-center w-full h-full bg-slate-100 text-2xl text-gray-800 justify justify-center flex flex-col'>Loading...</div>
                  }
                </div>
                <div class="screen__front">
                  <div class="screen__front-speaker"></div>
                  <div class="screen__front-camera"></div>
                </div>
              </div>
              <div class="front__line"></div>
              <div class="front__line front__line-second"></div>
            </div>
            <div class="phoneButtons phoneButtons-right"></div>
            <div class="phoneButtons phoneButtons-left"></div>
            <div class="phoneButtons phoneButtons-left2"></div>
            <div class="phoneButtons phoneButtons-left3"></div>
            <div class="back"></div>
          </div>

          
        </main>
  )
}

export default Priview