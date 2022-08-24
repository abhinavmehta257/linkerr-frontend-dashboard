import React from 'react'

function getTrackId(url){
    return url.split('/')[4].split('?')[0]
}

function SpotifyLinkCard({link}) {
  const trackId = getTrackId(link.url);
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
                className={`${collapsed ? 'hidden' : ''} transition-all duration-300 ease-in-out rounded mt-2`}
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
              frameBorder="0" 
                width="100%" 
                // height="380px" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            >
            </iframe>
        </div>
      </div>
  )
}

export default SpotifyLinkCard

// https://open.spotify.com/track/1x5sYLZiu9r5E43kMlt9f8?si=dd98a78b32d34d21