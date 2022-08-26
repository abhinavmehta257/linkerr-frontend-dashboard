import axios from 'axios'
import React, { useEffect } from 'react'
import {useState} from 'react'

function ChangePassword() {
    const [res, setRes] = useState(null);
    const [confirmPassError, setconfirmPassError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(null)
    const [formData,setFormData] = useState({});

    function ChangePassword(){
        const check = comparingPassword();
        setRes(null)
        if(check){
            setIsProcessing(true)
            axios.post(process.env.REACT_APP_API_URL_BASE+'/setting/changePassword', formData).then(res=>{
                setRes(res.data.message);
                setIsProcessing(false)
                console.log(res);
            }).catch(err => {
                console.log(err.response.data.error);
                setconfirmPassError(err.response.data.error)
                setIsProcessing(false)

            })
        }
    }
    const handleChange = (event)=>{
        let newformData = {
            ...formData,
            [event.target.name]:event.target.value
        }

        setFormData(newformData)
        console.log(formData);
    }

    const comparingPassword = ()=>{
        if(formData.newPassword.length < 6){
            setconfirmPassError('Password cannot be less than 6 character')
            return false
        }
        if(formData.newPassword === formData.currentPassword){
            setconfirmPassError('New password cannot be same as current password')
            return false
        }
        if(formData.newPassword !== formData.confirmPassword && formData.confirmPassword  && formData.newPassword ){
            setconfirmPassError('Confirm Password should match new password')
            return false
        }else{
            setconfirmPassError(null)
            return true
        }
        
    }


    useEffect(()=>{
    })

  return (
    <div className='text-left'>
        <h1 className='text-3xl mb-3'>Change Password</h1>
        <div className='grid grid-row-2 gap-2 p-3 bg-gray-300 text-left rounded-xl shadow-lg'>
            <p className='text-green-400'>{res}</p>
            <input onChange={handleChange} type="text" className='p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200' name="currentPassword" id="" placeholder='Current Password' />
            <input onChange={handleChange} type="text" className='p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200' name='newPassword' placeholder='New password' />
            <input onChange={handleChange} type="text" className='p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200' name='confirmPassword' placeholder='Confirm password' />
            <p className='text-sm text-rose-500'>{ confirmPassError ? confirmPassError : null }</p>
            <button disabled={isProcessing} className={`${isProcessing ? 'bg-gray-600' : "bg-gray-800"}  p-2 pr-4 pl-4 text-white rounded`} onClick={()=>{ChangePassword()}}>{!isProcessing? 'Change Password': 'Processing...'} </button>
        </div>
    </div>
  )
}

export default ChangePassword

