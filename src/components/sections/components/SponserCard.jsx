import React, { useEffect } from 'react'
import {useState} from 'react'
import Switch from '@mui/material/Switch';
import {useSelector, useDispatch} from 'react-redux'
import {editSponser} from '../../../redux'
import {deleteSponser} from '../../../redux'
import {validateLink} from '../../../helper'
import {updateSponser} from '../../../redux'
import {deleteSponserInDb} from '../../../redux'

function SponserCard({sponser, ind}) {
    const [enabled, setEnabled] = useState(sponser.enabled)
    const [isUploading, setIsUploading] = useState(false)
    const [validURL, setValidURL] = useState(true)
    const [error, setError] = useState('')
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const dispatch = useDispatch()
    
    console.log(sponser);
    const handletoggleChange = (event) => {
        setEnabled(event.target.checked)
        let editedSponser = {...sponser, enabled: event.target.checked}
        console.log(editSponser);
        dispatch(editSponser(editedSponser));
        if(editedSponser.url !=='' || editedSponser.title !=='' ||editedSponser.ImageUrl !==''){
            dispatch(updateSponser(editedSponser));
        }
    }

    const onTitleBlur = (event) => {
        console.log(event.target.value);
        let editedSponser = {...sponser, title: event.target.value}
        dispatch(editSponser(editedSponser));
        dispatch(updateSponser(editedSponser));

    }
    const ondescriptionBlur = (event) => {
        console.log(event.target.value);
        let editedSponser = {...sponser, description: event.target.value}
        dispatch(editSponser(editedSponser));
        dispatch(updateSponser(editedSponser));

    }
    const onSponserLinkBlur = (event) => {
        console.log(event.target.value)
        if(event.target.value ==='' || validateLink(event.target.value)){
            if(!event.target.value.includes('http://') && !event.target.value.includes('https://')){
                event.target.value = 'http://' + event.target.value
            }
            var editedSponser = {...sponser, url: event.target.value}
            dispatch(editSponser(editedSponser));
            setValidURL(true);
        }else{
            console.log('invalid sponser');
            setValidURL(false);
        }
        if(event.target.value === ''){
            setValidURL(true);
        }
        dispatch(updateSponser(editedSponser));
    }

    const deleteSponserfromState = () => {
        dispatch(deleteSponser(sponser.id));
        dispatch(deleteSponserInDb(sponser.id));
    }

    const checkForEnter = (event) => {
        if(event.key === 'Enter'){
            event.target.blur();
        }
    }

    function openWidget(){
        setIsUploading(true)
        var myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dxe8948vp',
        sources: ['local', 'url', 'camera'], 
        cropping: 'server',
        showSkipCropButton: false,
        croppingAspectRatio: 1,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            let editedSponser = {...sponser, ImageUrl: result.info.secure_url}
            dispatch(editSponser(editedSponser)); 
            dispatch(updateSponser(editedSponser));
            setIsUploading(false)
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
        if(sponser.url !== '')
        validateLink(sponser.url) ? setValidURL(true) : setValidURL(false)
    } , []);

  return (
    <div className='text-center' key={ind}>
        <div className='mt-5 '>
            <div className='grid grid-cols-6 gap-1 p-3 bg-gray-300 text-left rounded-xl shadow-lg sponser'>
                    <div className='col-span-2'>
                            <div  className="cursor-pointer text-center">
                                <img className='h-full w-full rounded-xl' src={sponser.ImageUrl || 'https://res.cloudinary.com/dxe8948vp/image/upload/v1661105259/linkerr/weebly_sidebar_basic_image_nxow9g.png'} alt='sponser'/>
                                <button onClick={openWidget} disabled={isUploading} className={`${isUploading ? 'dark:bg-slate-600' :'dark:bg-slate-800' }`+' text-white mt-2 p-1 pl-4 pr-4 rounded'}>{isUploading ?'opening widget' : 'Upload Image'}</button>
                            </div>
                    </div>
                <div className=' col-span-3 grid grid-row-4 gap-1'>
                    
                    <div className="">
                        <input type="text" defaultValue={sponser.title} onKeyUp={checkForEnter} onBlur={onTitleBlur} className='p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200' name="title" id="" placeholder='Enter Title' />
                    </div>
                    <div>
                        <textarea name='description' rows={3} onBlur={ondescriptionBlur} className='p-1 pl-2.5 w-full rounded placeholder:italic placeholder:text-slate-400 focus:outline-none bg-gray-200' placeholder='description' maxLength={80} defaultValue={sponser.description}></textarea>
                    </div>
                    <div className="">
                        <input type="url" defaultValue={sponser.url} onKeyUp={checkForEnter} onBlur={onSponserLinkBlur} className={`p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200 ${validURL ? '' : 'border-2 border-rose-500'}`} name="url" id="" placeholder='Enter Url' />
                    </div>
                    {
                        !validURL ? <div className='text-red-500 text-xs'>Invalid Sponser please enter URL with http/https.</div> : null
                    }
                </div>
                <div className="col-span-1 grid grid-rows-2 text-center">
                    <div className="flex justify-center">
                    <Switch {...label} onChange={handletoggleChange} checked={enabled}/>
                    </div>
                
                    <div className='flex justify-center'>
                        <button onClick={deleteSponserfromState}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-trash cursor-pointer" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            {error ? <div className='text-red-500 text-xs'>{error}</div> : null}
            </div>
        </div>
        
    </div>
  )
}

export default SponserCard