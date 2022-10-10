import React, { useEffect } from 'react'
import { useState } from 'react'
import LinkCard from './components/LinkCard'
import { useSelector, useDispatch } from 'react-redux'
import { addLink } from '../../redux'
import {addNewLinkInDb} from '../../redux'
import { Droppable } from 'react-beautiful-dnd';
import Loading from './components/Loading'
import { DragDropContext } from 'react-beautiful-dnd';
import {updateLinkOrderDB} from '../../redux'

function Links() {
    const dispatch = useDispatch();
    const links = useSelector(state => state.links.data)
    const newLink={
        id: Date.now(),
        title: '',
        url: '',
        type:'url',
        ImageUrl:'',
        imageAssetId:'',
        tags:[],
        enabled: false
    }

    const addNewLink = () => {
        dispatch(addLink(newLink));
        dispatch(addNewLinkInDb(newLink));
    }

    const updateNewLinkOrder = (props)=>{
        if(props.destination.index !== props.source.index){
            const desI = props.destination.index
            const srcI = props.source.index
            const newLinkOrder = [...links];
            newLinkOrder.splice(desI,0,newLinkOrder.splice(srcI,1)[0])
            console.log(links);
            dispatch(updateLinkOrderDB(newLinkOrder))
        }
    }

    useEffect(() => {
        console.log(links);
    } , [])
  return (
   <div>
        <h1 className='text-3xl font-semibold'>Links</h1>
        <div className="grid grid-col-2">
            <button onClick={addNewLink} className=' mt-4 dark:bg-gray-800 dark:border-gray-600hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 text-white font-bold py-2 px-4 rounded-full'>
                Add New Link
            </button>
        </div>
        {links ?( 
        <DragDropContext 
            onDragEnd={(props)=>{
                updateNewLinkOrder(props)
            }}
        >
            <Droppable droppableId="Links" >
            {(provided, snapshot) => (
                <div
                {...provided.droppableProps}
                {...provided.placeholder}
                ref={provided.innerRef}
                >
                    { 
                        links.map((link,ind)=>(
                            <LinkCard key={link.id} link={link} ind={ind}/>
                        ))
                    }
                </div>
            )}
            </Droppable>
        </DragDropContext>
        ):<Loading></Loading>
    }
   </div>
  )
}

export default Links