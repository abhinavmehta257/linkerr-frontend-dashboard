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
                <div className='grid grid-cols-6 p-3 w-[100%]'>
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
                    <div className="col-span-1 grid grid-rows-2 text-center ">
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
    )}
    </Draggable>
  )
}

export default LinkCard