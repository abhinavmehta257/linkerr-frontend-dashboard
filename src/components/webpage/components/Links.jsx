import React, { useEffect } from 'react'
import { linkCardSelector } from '../helper/linkCardSelector';
import LinkCard from './linkCards/LinkCard';
import {fetchLinksFromState} from '../../../redux';
import {useSelector, useDispatch} from 'react-redux'

function Links() {
  const links = useSelector(state => state.links.data)
  useEffect(() => {
    console.log(links);
  }, [])
  return (
    <div className='links-container'>
      <div   className='card-container'>
        {links.map((link,ind) =>(
          link.enabled && link.title !== '' && link.url !== '' ? 
          linkCardSelector(link, ind): null
        ))}
      </div>
    </div>
  )
}

export default Links