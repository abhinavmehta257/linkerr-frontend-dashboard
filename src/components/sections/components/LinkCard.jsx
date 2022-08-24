import React, { useEffect } from 'react'
import {useState} from 'react'
import Switch from '@mui/material/Switch';
import {useSelector, useDispatch} from 'react-redux'
import {editLink} from '../../../redux'
import {deleteLink} from '../../../redux'
import {validateLink} from '../../../helper'
import {updateLink} from '../../../redux'
import {deleteLinkInDb} from '../../../redux'

function LinkCard({link, ind}) {
    const [enabled, setEnabled] = useState(link.enabled)
    const [validURL, setValidURL] = useState(true)
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const dispatch = useDispatch()
    

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

    useEffect(() => {
        if(link.url !== '')
        validateLink(link.url) ? setValidURL(true) : setValidURL(false)
    } , []);

  return (
    <div className='text-center' key={ind}>
        <div className='mt-5 '>
            <div className='grid grid-cols-6 p-3 bg-gray-300 text-left rounded-xl shadow-lg link'>
                <div className=' col-span-5 grid grid-row-2 gap-1'>
                    <div className="">
                        <input type="text" defaultValue={link.title} onKeyUp={checkForEnter} onBlur={onTitleBlur} className='p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200' name="title" id="" placeholder='Enter Title' />
                    </div>
                    <div className="">
                        <input type="url" defaultValue={link.url} onKeyUp={checkForEnter} onBlur={onLinkBlur} className={`p-1 pl-2.5 w-full rounded focus:outline-none placeholder:italic placeholder:text-slate-400 bg-gray-200 ${validURL ? '' : 'border-2 border-rose-500'}`} name="url" id="" placeholder='Enter Url' />
                    </div>
                    {
                        !validURL ? <div className='text-red-500 text-xs'>Invalid Link please enter URL with http/https.</div> : null
                    }
                </div>
                <div className="col-span-1 grid grid-rows-2 text-center">
                    <div className="flex justify-center">
                    <Switch {...label} onChange={handleChange} checked={enabled}/>
                    </div>
                
                    <div className='flex justify-center'>
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
  )
}

export default LinkCard