import React, { useEffect } from 'react'
import { useState } from 'react'
import SponserCard from './components/SponserCard'
import { useSelector, useDispatch } from 'react-redux'
import { addSponser } from '../../redux'
import {addNewSponserInDb} from '../../redux'


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

    const addNewSponser = () => {
        dispatch(addSponser(newSponser));
        dispatch(addNewSponserInDb(newSponser));
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
                sponsers.map(sponser=>(<SponserCard key={sponser.id} sponser={sponser} />))
            }
        </div>
        
   </div>
  )
}

export default Sponser