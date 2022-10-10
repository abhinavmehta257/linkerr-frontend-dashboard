import React, { useEffect } from 'react'
import {useState} from 'react'
import Switch from '@mui/material/Switch';
import {useSelector, useDispatch} from 'react-redux'
import {editLink} from '../../../redux'
import {deleteLink} from '../../../redux'
import {validateLink} from '../../../helper'
import {updateLink} from '../../../redux'
import {deleteLinkInDb} from '../../../redux'
import { Draggable } from 'react-beautiful-dnd';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const linkTagsOptions = [
    'collab',
    'sponsor',
    'recommended'
]

function LinkCard({link, ind}) {
    const [enabled, setEnabled] = useState(link.enabled)
    const [validURL, setValidURL] = useState(true)
    const [isGrid, setisGrid] = useState(link.isGrid)
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const dispatch = useDispatch()
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState('')
    

    const handleChange = (event) => {
        setEnabled(event.target.checked)
        let editedLink = {...link, enabled: event.target.checked}
        console.log(editLink);
        dispatch(editLink(editedLink));
        if(editedLink.url !=='' || editedLink.title !==''){
            dispatch(updateLink(editedLink));
        }
    }

    const onTitleBlur = (event) => {
        console.log(event.target.value);
        let editedLink = {...link, title: event.target.value}
        dispatch(editLink(editedLink));
        dispatch(updateLink(editedLink));
    }

    const setLinkToGrid = () => {
        setisGrid(!isGrid)
        let editedLink = {...link, isGrid:!isGrid}
        dispatch(editLink(editedLink));
        dispatch(updateLink(editedLink));
    }

    const deleteImage = () => {
        let editedLink = {...link, imageAssetId: '', ImageUrl:''}
        dispatch(editLink(editedLink));
        dispatch(updateLink(editedLink));
    }
    const onLinkBlur = (event) => {
        console.log(event.target.value)
        if(event.target.value ==='' || validateLink(event.target.value)){
            if(!event.target.value.includes('http://') && !event.target.value.includes('https://')){
                event.target.value = 'http://' + event.target.value
            }
            var editedLink = {...link, url: event.target.value}
            dispatch(editLink(editedLink));
            setValidURL(true);
        }else{
            console.log('invalid link');
            setValidURL(false);
        }
        if(event.target.value === ''){
            setValidURL(true);
        }
        dispatch(updateLink(editedLink));
    }

    const deleteLinkfromState = () => {
        dispatch(deleteLink(link.id));
        dispatch(deleteLinkInDb(link.id));
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
        return_delete_token:true,
        cropping: 'server',
        showSkipCropButton: false,
        croppingAspectRatio: 1,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            let editedLink = {...link, ImageUrl: result.info.secure_url, imageAssetId: result.info.asset_id}
            dispatch(editLink(editedLink)); 
            dispatch(updateLink(editedLink));
            setIsUploading(false)
          }else{
            console.log(error);
            setIsUploading(false);
            setError(error.response.data.error.message);
          }
        },
      )
      myWidget.open();
    }

    const onTagsChange = (value) => {
        let editedLink = {...link, tags: value}
        dispatch(editLink(editedLink));
        dispatch(updateLink(editedLink));

    }

    useEffect(() => {
        if(link.url !== '')
        validateLink(link.url) ? setValidURL(true) : setValidURL(false)
    } , []);

  return (
    <Draggable 
        key={'draggable-'+link.id}
        draggableId={'draggable-'+link.id} 
        index={ind}
    >
    {(provided, snapshot) => (
        <div className='text-center' 
            {...provided.draggableProps}
            ref={provided.innerRef}
        >
            <div className='mt-5 flex grow  bg-gray-300 text-left rounded-xl shadow-lg link'>
            <div className='item-center flex justify-center flex-col pl-3' {...provided.dragHandleProps}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 4C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3C4 3.55228 4.44772 4 5 4ZM6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8ZM6 13C6 13.5523 5.55228 14 5 14C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12C5.55228 12 6 12.4477 6 13ZM12 8C12 8.55228 11.5523 9 11 9C10.4477 9 10 8.55228 10 8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8ZM11 14C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12C10.4477 12 10 12.4477 10 13C10 13.5523 10.4477 14 11 14ZM12 3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3Z" fill="#676B5F"></path></svg>

            </div>
                <div className='grid grid-cols-7 gap-1 p-3 w-[100%]'>
                <div className='col-span-2'>
                            <div  className=" text-center h-full">
                                <div  className='h-full w-full rounded-xl bg-white' style={{background:`url(${link.ImageUrl}) center/cover no-repeat`}} alt='sponser'>
                                    {
                                        link.ImageUrl ? (
                                            <div className='w-full cursor-pointer rounded-xl' onClick={deleteImage} style={{background: 'linear-gradient(180deg, rgba(254,254,254,0.5), transparent)'}}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="black"/> </svg>
                                            </div>
                                        ):""
                                    }
                                    {link.ImageUrl ? '' : (<div onClick={openWidget} disabled={isUploading} className='p-3 text-sm cursor-pointer flex-col justify-center flex items-center h-full w-full bg-white rounded-xl'>
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z"/></svg>
                                    </div>)}
                                </div>
                            </div>
                    </div>
                    <div className=' col-span-4 grid grid-row-3 gap-1'>
                        <div className="">
                            <input type="text" defaultValue={link.title} onKeyUp={checkForEnter} onBlur={onTitleBlur} className='p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200' name="title" id="" placeholder='Enter Title' />
                        </div>
                        <div className="">
                            <input type="url" defaultValue={link.url} onKeyUp={checkForEnter} onBlur={onLinkBlur} className={`p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200 ${validURL ? '' : 'border-2 border-rose-500'}`} name="url" id="" placeholder='Enter Url' />
                        </div>
                        <Autocomplete
                            multiple
                            freeSolo
                            limitTags={1}
                            id="tags"
                            options={linkTagsOptions}
                            defaultValue = {link.tags}
                            getOptionLabel={(option) => ('#'+option)}
                            renderInput={(params) => (
                                <TextField {...params} label="Tags" placeholder="Favorites" />
                            )}
                            onChange={(event, value) => onTagsChange(value)}
                            />
                        {
                            !validURL ? <div className='text-red-500 text-xs'>Invalid Link please enter URL with http/https.</div> : null
                        }{
                            error
                        }
                    </div>
                    <div className="col-span-1 grid grid-rows-2 text-center ">
                        <div className="flex justify-center">
                        <Switch {...label} onChange={handleChange} checked={enabled}/>
                        </div>
                        <div className='flex flex-row gap-3 items-center justify-center'>
                            <button onClick={setLinkToGrid}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isGrid ? "#1f2937" : "#8cbafb"} class="bi bi-grid-fill" viewBox="0 0 16 16"> <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/> </svg>
                            </button>

                            <button onClick={deleteLinkfromState}>  
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-trash cursor-pointer" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    </Draggable>
  )
}

export default LinkCard