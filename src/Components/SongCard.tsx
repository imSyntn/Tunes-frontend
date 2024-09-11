import React,{useContext} from 'react'
import { useformatTime } from '../Utils/useformatTime';
import { songIdContext } from '../App';

const SongCard = ({ result }: any) => {

  const songContext = useContext(songIdContext)
  const formatTime = useformatTime()

  if (!songContext) {
    return null
  }

  const { playId, setPlayId } = songContext;

  const artistsNAme = result.artists.primary.map((acc: any) => ` ${acc.name}`).join(' ,')
  const ArtistChar = (artistsNAme.length > 25) ? artistsNAme.slice(0, 29) + '...' : artistsNAme;

  // const addDot = (str:string) => {

  // }

  return (
    <div className='SongCard' onClick={() => setPlayId([result])}>
      <h3><img src={result?.image?.[0]?.url} />
        <div className="names">
          {
            (result.name.length > 20) ? `${result.name.slice(0, 19)}...` : `${result.name}`
          }
          <p>{ArtistChar}</p>
        </div>
      </h3>
      <p className='desktopView'>{ArtistChar}</p>
      <span>{formatTime(result.duration)}</span>
    </div>
  )
}

export default SongCard