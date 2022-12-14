import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import  {useDispatch} from 'react-redux';
import {deleteAuthTokenAndLogout} from '../redux'

function Sidebar() {

  const dispatch = useDispatch();  
  const profile = useSelector(state => state.profile.data);   
  const userName = useSelector(state => state.data.data.userName);
  const userPageURL = process.env.REACT_APP_USER_PAGE_URL+'/'+userName;
  const copy = ()=>{
    navigator.clipboard.writeText(userPageURL);
    alert('Url copied')
  }

  return (
    <div className="flex grow flex-col h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
        <a href="https://theonelink.me/" >
            <img width={'100px'} className='m-auto' src="logo192.png" alt="" srcset="" />
        </a>

        <div className="relative mt-6"  >
            <span onClick={copy} className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3 dark:text-gray-300 dark:bg-slate-500 rounded pr-2 " >
                Copy
            </span>
            <div  onClick={()=>{window.open(userPageURL, '_blank')}}>
                <input type="text" className="cursor-pointer w-full py-2 pl-[60px] pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" value={userPageURL} disabled/>
            </div>
            
        </div>
        
        <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
                <NavLink className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" to="/">
                    {/* <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> */}

                    <span className="mx-4 font-medium">Links</span>
                </NavLink>

                <NavLink className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" to="/appearance">
                    
                    <span className="mx-4 font-medium">Appearance</span>
                </NavLink>
                {/* <NavLink className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" to="/sponsers">
                    
                    <span className="mx-4 font-medium">Image Grid</span>
                </NavLink> */}

                <NavLink className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" to="/settings">
                    {/* <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> */}

                    <span className="mx-4 font-medium">Settings</span>
                </NavLink>

                <hr className="my-6 border-gray-200 dark:border-gray-600" />

            </nav>

            <div>
                <div className="flex items-center px-4 -mx-2">
                    <img className="object-cover mx-2 rounded-full h-9 w-9" src={profile.profileImage} alt="avatar"/>
                    <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">{userName}</h4>
                </div>
                <button className='text-white bg-rose-600 p-2 pl-4 pr-4 rounded' onClick={()=>{dispatch(deleteAuthTokenAndLogout())}}>
                    Log Out
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default Sidebar