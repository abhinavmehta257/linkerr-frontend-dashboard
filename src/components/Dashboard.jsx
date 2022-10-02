import {React, useEffect, useState} from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import Priview from './Priview'
import Sidebar from './Sidebar'
import {fetchDataRequest} from '../redux'
import {useDispatch, useSelector} from 'react-redux'
import IsMobilePrompt from './sections/IsMobilePrompt'

function Dashboard() {
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);;
  const dispatch = useDispatch();
  const isDataLoading = useSelector((state) => state.data.loading);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchDataRequest());
    if(!isDataLoading){
      setLoading(false);
    }
    console.log(isMobile);
  }, [])
  useEffect(() => {
    if(loading){
      dispatch(fetchDataRequest());
    }
  }, [loading])
  return (
    <div className=''>
        {
          !isMobile?(
            <div className='grid grid-cols-12 gap-3 bg-slate-100'>
              <div className='col-span-2'>
                <Sidebar/>
              </div>
              <div className='col-span-5 p-5 overflow-y-scroll h-[100vh] scrollbar'>
                  <Outlet />
              </div>
              <Priview />
            </div>
          ):(<IsMobilePrompt/>)
        }

      </div>
  )
}

export default Dashboard