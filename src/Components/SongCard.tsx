import { useContext, useCallback, useState } from 'react'
import { useformatTime } from '../Utils/useformatTime';
import { useNameDot } from '../Utils/useNameDot';
import { songIdContext } from '../App';
import { ResultsInDataType } from '../App.types';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import '../Styles/SongCard.scss'

const SongCard = ({ result }: { result: ResultsInDataType }) => {

  const songContext = useContext(songIdContext)
  const formatTime = useformatTime()
  const nameWithDot = useNameDot()

  if (!songContext) {
    return null
  }

  const { currentSongObj, tracks, setTracks, setSongIndex } = songContext;

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const artistsNAme = result.artists?.primary?.map((acc: any) => ` ${acc.name}`).join(' ,')
  const ArtistChar = (artistsNAme) ? nameWithDot(artistsNAme) : ''

  // const addDot = (str:string) => {

  // }

  const audioSet = useCallback(() => {
    const index = tracks.findIndex((song: ResultsInDataType) => song.id === result.id)
    const available = (index < 0) ? false : true;
    if (available) {
      setSongIndex(index)
    } else {
      setTracks([result])
    }
  }, [tracks])

  const addToLiked = useCallback(() => {
    setIsLiked(prev => !prev)
  }, [isLiked])

  return (
    <div className={`SongCard ${currentSongObj?.id == result.id ? 'playing' : ''}`} onClick={audioSet}>
      <h3>
        <div className="imgWrapperInSongCard">
          <img src={result?.image?.[0]?.url || '../../music.png'} />
        </div>
        <div className="names">
          {
            nameWithDot(result.name, 16)
          }
          <p>{ArtistChar}</p>
        </div>
      </h3>
      <p className='desktopView'>{ArtistChar}</p>
      <div className="heart" onClick={addToLiked}>
        {
          isLiked ? <FaHeart /> : <FaRegHeart />
        }
      </div>
      <span>{formatTime(result.duration || 0)}</span>
    </div>
  )
}

export default SongCard