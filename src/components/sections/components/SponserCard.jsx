import React, { useEffect } from 'react'
import {useState} from 'react'
import Switch from '@mui/material/Switch';
import {useDispatch} from 'react-redux'
import {editSponser} from '../../../redux'
import {deleteSponser} from '../../../redux'
import {validateLink} from '../../../helper'
import {updateSponser} from '../../../redux'
import {deleteSponserInDb} from '../../../redux'
import { Draggable } from 'react-beautiful-dnd';


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
    <Draggable 
        key={'draggable-'+sponser.id}
        draggableId={'draggable-'+sponser.id} 
        index={ind}
    >
    {(provided, snapshot) => (
    <div className='text-center' 
        {...provided.draggableProps}
        ref={provided.innerRef}
    >
        <div className='mt-5 bg-gray-300 text-left rounded-xl shadow-lg sponser flex'>
        <div className='item-center flex justify-center flex-col pl-3' {...provided.dragHandleProps}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 4C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3C4 3.55228 4.44772 4 5 4ZM6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8ZM6 13C6 13.5523 5.55228 14 5 14C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12C5.55228 12 6 12.4477 6 13ZM12 8C12 8.55228 11.5523 9 11 9C10.4477 9 10 8.55228 10 8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8ZM11 14C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12C10.4477 12 10 12.4477 10 13C10 13.5523 10.4477 14 11 14ZM12 3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3Z" fill="#676B5F"></path></svg>

            </div>
            <div className='grid grid-cols-6 gap-1 p-3 grow'>
                    <div className='col-span-1'>
                            <div  className="cursor-pointer text-center h-full">
                                <div onClick={openWidget} disabled={isUploading} className='h-full w-full rounded-xl' style={{background:`url(${sponser.ImageUrl || "https://res.cloudinary.com/dxe8948vp/image/upload/v1661105259/linkerr/weebly_sidebar_basic_image_nxow9g.png"}) center/cover no-repeat`}} alt='sponser'>
                                    <div className='w-full rounded-xl' style={{background: 'linear-gradient(180deg, rgba(254,254,254,0.5), transparent)'}}>
                                        <svg style={{padding:'6px'}} fill='#1f2937' width={'30px'} height={'30px'} color="palette.slate4" font-style="italic" viewBox="0 0 12 12" enable-background="new 0 0 24 24" class="sc-hoXqvr hGXGXO"><path d="M2.5,6.67188,8.46477.70711a1,1,0,0,1,1.41421,0L11.29289,2.121a1,1,0,0,1,0,1.41421L5.32813,9.5ZM4.32813,10.5,0,12,1.5,7.67188Z"></path></svg>
                                    </div>
                                </div>
                                {/* <button  className={`${isUploading ? 'dark:bg-slate-600' :'dark:bg-slate-800' }`+' text-white mt-2 p-1 pl-4 pr-4 rounded'}>{isUploading ?'opening widget' : 'Upload Image'}</button> */}
                            </div>
                    </div>
                <div className=' col-span-4 grid grid-row-4 gap-1'>
                    
                    <div className="">
                        <input type="text" defaultValue={sponser.title} onKeyUp={checkForEnter} onBlur={onTitleBlur} className='p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200' name="title" id="" placeholder='Enter Title' />
                    </div>
                    <div className="">
                        <input type="url" defaultValue={sponser.url} onKeyUp={checkForEnter} onBlur={onSponserLinkBlur} className={`p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200 ${validURL ? '' : 'border-2 border-rose-500'}`} name="url" id="" placeholder='Enter Url' />
                    </div>
                    <div>
                        <textarea name='description' rows={1} onBlur={ondescriptionBlur} className='p-1 pl-2.5 w-full rounded placeholder:italic placeholder:text-slate-400 focus:outline-none bg-gray-200' placeholder='description' maxLength={80} defaultValue={sponser.description}></textarea>
                    </div>
                    {
                        !validURL ? <div className='text-red-500 text-xs'>Invalid Sponser please make sure url has http/https.</div> : null
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
    )}
    </Draggable>
  )
}

export default SponserCard