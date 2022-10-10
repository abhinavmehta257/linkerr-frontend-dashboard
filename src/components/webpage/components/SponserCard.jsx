import React from 'react'

function SponcerCard({sponser}) {
    return (
        <div className={sponser.url !=='' ? 'cursor-pointer':''} >
            <a target={'_blank'} href={sponser.url} className='font-medium pt-5'>
                <div className='link-card break-all'>
                    <div >
                        <img src={sponser.ImageUrl} className='rounded' alt="" srcset="" />
                    </div>
                    <p>{sponser.title}</p>
                   { sponser.description != '' ?
                    (<p className='text-[10px] font-thin text-left pt-1'>
                        {
                            sponser.description?.map(tag =>(
                                <span className='p-1 text-sm rounded-xl mr-1'>#{tag}</span>
                            )) 
                        }
                    </p>): ''
                    }
                </div>
            </a>
        </div>
      )
}

export default SponcerCard