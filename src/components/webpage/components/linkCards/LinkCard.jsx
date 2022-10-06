import React from 'react'

function LinkCard({link}) {
  const openUrl=()=>{
    window.open(link.url);
  }
  return (
    <div className='cursor-pointer' >
            <a target={'_blank'} onClick={openUrl} className='font-medium pt-5'>
                <div className='link-card break-all'>
                  { link.ImageUrl ? (
                    <div className='h-[200px]' style={{background:`url(${link.ImageUrl}) center/cover no-repeat`}}>
                    </div>
                  ):''
                  }
                    <p>{link.title}</p>
                </div>
            </a>
        </div>
  )
}

export default LinkCard


{/* <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/4b13SJlne61y53KSEwuQtD?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
https://open.spotify.com/album/4b13SJlne61y53KSEwuQtD?si=Eoa1nPLNTk2M1VPUgEnbKQ */}