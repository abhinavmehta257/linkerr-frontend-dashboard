import AppleMusicLinkCard from "../components/linkCards/AppleMusicLinkCard"
import LinkCard from "../components/linkCards/LinkCard"
import SpotifyLinkCard from "../components/linkCards/SpotifyLinkCard"
import YoutubeLinkCard from "../components/linkCards/YoutubeLinkCard"

function getLinkType(link) {
  if (link.includes("spotify")) {
    return "spotify"
  }else if(link.includes("youtube") || link.includes("youtu.be")) {
    return "youtube"
  }else if(link.includes('music.apple.com')){
    return "apple"
  }else{
    return "link"
  }
}

export function linkCardSelector(linkCard,key){
    console.log(linkCard.url);
    switch(getLinkType(linkCard.url)){
        case "link":
          return <LinkCard key={key} link={linkCard}></LinkCard>
        case "youtube":
          return <YoutubeLinkCard key={key} link={linkCard}></YoutubeLinkCard>
        case "spotify":
          return <SpotifyLinkCard key={key} link={linkCard}></SpotifyLinkCard>
        case "apple":
          return <AppleMusicLinkCard key={key} link={linkCard}></AppleMusicLinkCard>
        default:
          return <div>Error</div>
    }
}