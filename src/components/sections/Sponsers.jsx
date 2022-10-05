import React, { useEffect } from 'react'
import SponserCard from './components/SponserCard'
import { useSelector, useDispatch } from 'react-redux'
import { addSponser } from '../../redux'
import {updateSponsersOrderDB} from '../../redux'
import {addNewSponserInDb} from '../../redux'
import Loading from './components/Loading'
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';



function Sponser() {
    const dispatch = useDispatch();
    const sponsers = useSelector(state => state.sponsers.data)
    const newSponser={
        id: Date.now(),
        title: '',
        url: '',
        type:'url',
        enabled: false
    }
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const addNewSponser = () => {
        dispatch(addSponser(newSponser));
        dispatch(addNewSponserInDb(newSponser));
    }
    const updateNewSponsersOrder = (props)=>{
        if(props.destination.index !== props.source.index){
            const desI = props.destination.index
            const srcI = props.source.index
            const newSponsersOrder = [...sponsers];
            newSponsersOrder.splice(desI,0,newSponsersOrder.splice(srcI,1)[0])
            dispatch(updateSponsersOrderDB(newSponsersOrder))
        }
    }


    useEffect(() => {
        console.log(sponsers);
    } , [])
  return (
   <div>
        <h1 className='text-3xl font-semibold'>Sponser</h1>
        <div className="grid grid-col-2">
            <button onClick={addNewSponser} className=' mt-4 dark:bg-gray-800 dark:border-gray-600hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 text-white font-bold py-2 px-4 rounded-full'>
                Add New Sponser
            </button>
        </div>
        <div >
            { 
               sponsers?(
                <DragDropContext 
                    onDragEnd={(props)=>{
                        updateNewSponsersOrder(props);
                        console.log(props);
                    }}
                >{
                    <Droppable droppableId="sponcers" >
                        {(provided, snapshot) => (
                            <div
                            {...provided.droppableProps}
                            {...provided.placeholder}
                            ref={provided.innerRef}
                            >{
                                sponsers.map((sponser,ind)=>(<SponserCard key={sponser.id} sponser={sponser} ind={ind}/>))
                            }
                            </div>
                        )}
                    </Droppable>
                }
                </DragDropContext>) : <Loading/>
            }
        </div>
        
   </div>
  )
}

export default Sponser