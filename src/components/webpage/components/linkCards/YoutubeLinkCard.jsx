import React from 'react'

function YoutubeLinkCard({link}) {
  const [collapsed, setCollapsed] = React.useState(true);
  let videoId;
  if(link.url.includes('?')){
    videoId = link.url.split('?')[1].split('=')[1]
  }else{
    videoId = link.url.split('/')[3];
  }
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }
  return (
      <div className='cursor-pointer transition-all ease-in-out' >
        <div className='link-card' onClick={toggleCollapse}>
          {link.title}
          <iframe 
          width='100%' 
          className={`${collapsed ? 'hidden' : ''} transition-all duration-300 ease-in-out rounded mt-2`}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen></iframe>
        </div>
      </div>
  )
}

export default YoutubeLinkCard