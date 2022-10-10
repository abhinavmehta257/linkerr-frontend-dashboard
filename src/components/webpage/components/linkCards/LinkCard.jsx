import React from 'react'

function LinkCard({link}) {
  const isTags = link.tags.length > 0 ? true : false;
  const openUrl=()=>{
    window.open(link.url);
  }
  return (
    <div className={link.isGrid ? 'col-span-1 cursor-pointer' : 'col-span-2 cursor-pointer'} >
            <a target={'_blank'} onClick={openUrl} className='font-normal '>
                <div className='link-card break-all'>
                  <p className={`${link.ImageUrl ? '':' font-normal'} text-sm`}>{link.title}</p>
                  { link.ImageUrl ? (
                    <div>
                      <img className='pt-2 pb-2' src = {link.ImageUrl}>
                      </img>
                    </div>
                  ):''
                  }
                    <div className='text-start break-words text-xs'>
                      {
                        isTags ? link.tags.map((tag)=>(
                          <span>#{tag} </span>
                        )) : ''
                      }
                    </div>                
                </div>
            </a>
        </div>
  )
}

export default LinkCard


{/* <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/4b13SJlne61y53KSEwuQtD?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
https://open.spotify.com/album/4b13SJlne61y53KSEwuQtD?si=Eoa1nPLNTk2M1VPUgEnbKQ */}