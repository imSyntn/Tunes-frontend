import { useContext, useCallback } from 'react'
import { useformatTime } from '../Utils/useformatTime';
import { useNameDot } from '../Utils/useNameDot';
import { songIdContext } from '../App';
import { ResultsInDataType } from '../App.types';

const SongCard = ({ result }: { result: ResultsInDataType }) => {

  const songContext = useContext(songIdContext)
  const formatTime = useformatTime()
  const nameWithDot = useNameDot()

  if (!songContext) {
    return null
  }

  const { currentSongObj, tracks, setTracks, setSongIndex } = songContext;

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

  return (
    <div className={`SongCard ${currentSongObj?.id == result.id ? 'playing' : ''}`} onClick={audioSet}>
      <h3>
        <div className="imgWrapperInSongCard">
          <img src={result?.image?.[0]?.url || '../../music.png'} />
        </div>
        <div className="names">
          {
            nameWithDot(result.name)
          }
          <p>{ArtistChar}</p>
        </div>
      </h3>
      <p className='desktopView'>{ArtistChar}</p>
      <span>{formatTime(result.duration || 0)}</span>
    </div>
  )
}

export default SongCard