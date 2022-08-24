import React from 'react'

function SponcerCard({sponser}) {
    return (
        <div className='cursor-pointer' >
            <div className='link-card'>
                <div >
                    <img src={sponser.ImageUrl} className='rounded' alt="" srcset="" />
                </div>
                <p><a target={'_blank'} href={sponser.url} className='font-medium'>{sponser.title}</a></p>
                <p className='text-[10px] font-thin text-left'>{sponser.description}</p>
            </div>
        </div>
      )
}

export default SponcerCard