import React from 'react'

function getTrackId(url){
    return url.split('music.apple.com')[1];
}

function AppleMusicLinkCard({link}) {
  const trackpath = getTrackId(link.url);
  const [collapsed, setCollapsed] = React.useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }


  return (
    <div className='cursor-pointer ' >
        <div className='link-card ' onClick={toggleCollapse}>
          <div>
            {link.title}
          </div>
          <iframe 
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
            className={`${collapsed ? 'hidden' : ''} transition-all duration-300 ease-in-out rounded mt-2`}
            frameborder="0" 
            height="100%" 
            width="100%"
            // style="width:100%;max-width:660px;overflow:hidden;background:transparent;" 
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
            src={`https://embed.music.apple.com${trackpath}`}>
              
          </iframe>
                {/* <iframe 
                className={`${collapsed ? 'hidden' : ''} transition-all duration-300 ease-in-out rounded mt-2`}
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
              frameBorder="0" 
                width="100%" 
                // height="380px" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            >
            </iframe> */}
        </div>
      </div>
  )
}

export default AppleMusicLinkCard

// https://music.apple.com/us/album/her/1639430350?i=1639431051