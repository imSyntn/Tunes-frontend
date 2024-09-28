import { useContext, useCallback, useState, useEffect } from 'react'
import { useformatTime } from '../Utils/useformatTime';
import { useNameDot } from '../Utils/useNameDot';
import { Context } from '../App';
import { ResultsInDataType } from '../App.types';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import '../Styles/SongCard.scss'

const SongCard = ({ result }: { result: ResultsInDataType }) => {

  const songContext = useContext(Context)
  const formatTime = useformatTime()
  const nameWithDot = useNameDot()

  if (!songContext) {
    return null
  }

  const { currentSongObj, tracks, setTracks, setSongIndex, user, setUser } = songContext;

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

  useEffect(()=> {
    if('songs' in user.userSavedData) {
      const isAvailable = user.userSavedData.songs.find(item=> item.dataId === result.id)
      console.log('song card', isAvailable)
      if(isAvailable) {
        setIsLiked(true)
      }
    }
  },[])

  const addToLiked = async (e: any) => {
    e.stopPropagation()
    if (user.loggedIn && !isLiked) {
      try {
        const req = await fetch('http://localhost:8000/api/user/data', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json","Access-Control-Allow-Origin": "*",
          },
          credentials: 'include',
          body: JSON.stringify({
            songs: {
              dataId: result.id,
              type: result.type,
              title: result.title,
              image: result.image?.[1]?.url
            }
          }),
        })
        const res = await req.json()
        if(res.removed) {
          setIsLiked(false)
        } else {
          setIsLiked(true)
        }
        console.log(res)
        setUser(prev=> ({...prev, updated: Math.floor(Math.random()*100)}))
      } catch (error) {
        console.log(error)
      }
    }
  }

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
      <div className="heart" onClick={addToLiked} style={!user.loggedIn ? { cursor: 'initial', opacity: 0.3 } : {}}>
        {
          isLiked ? <FaHeart /> : <FaRegHeart />
        }
      </div>
      <span>{formatTime(result.duration || 0)}</span>
    </div>
  )
}

export default SongCard