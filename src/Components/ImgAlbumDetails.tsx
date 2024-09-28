import { useState, useContext, useEffect } from 'react'
import { Context } from '../App';
import { ResultsInDataType, dataInUserDataType, userDataType } from '../App.types';
import { motion } from 'framer-motion'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import '../Styles/ImgAlbumDetails.scss'

const ImgAlbumDetails = ({ data, audioSet }: { data: ResultsInDataType, audioSet: () => void }) => {

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const songContext = useContext(Context);

  if (!songContext) {
    return
  }
  const { user, setUser } = songContext;

  console.log(data)

  useEffect(() => {
    if (`${data.type}s` in user.userSavedData) {
      const savedData = (user.userSavedData as userDataType)[data.type + 's' as keyof userDataType] as dataInUserDataType[] | undefined;
      if (savedData) {
        const isAvailable = savedData.find((item: dataInUserDataType) => item.dataId === data.id);
        console.log('img-album details', isAvailable);
        if (isAvailable) {
          setIsLiked(true);
        }
      }
    }
  }, [])

  const addToLiked = async (e: any) => {
    e.stopPropagation()
    if (user.loggedIn) {
      try {
        const req = await fetch('http://localhost:8000/api/user/data', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json", "Access-Control-Allow-Origin": "*",
          },
          credentials: 'include',
          body: JSON.stringify({
            [data.type + 's']: {
              dataId: data.id,
              type: data.type,
              title: data.title || data.name,
              image: data.image?.[1]?.url
            }
          }),
        })
        const res = await req.json()
        if (res.removed) {
          setIsLiked(false)
        } else {
          setIsLiked(true)
        }
        console.log(res)
        setUser(prev => ({ ...prev, updated: Math.floor(Math.random() * 100) }))
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="img-albumDetails">
      {
        (data.image?.[2]?.url || data.image?.[1]?.url || data.image?.[0]?.url) && (
          <>
            <img src={data.image?.[2]?.url || data.image[1].url || data.image[0].url || '../../music.png'} alt={data.name || 'Album cover'} />
            <img className='wrapper' src={data.image?.[2]?.url || '../../music.png'} alt={'img wrapper'} />
          </>
        )
      }
      <div className="albumDetails">
        <h1>{data.name}</h1>
        <p>{data.description || data.copyright}</p>
        <p>{data.label} {data.year}</p>
        <p>{data.playCount ? `${data.playCount}  plays` : ''}</p>
        <p>{data.songCount ? `${data.songCount}  Songs` : ''}</p>
        <div className="btns">
          <motion.button whileTap={{ scale: 0.7 }} transition={{ duration: 0.01 }} onClick={() => audioSet()}>Play</motion.button>

          <div className="heart" onClick={addToLiked} style={!user.loggedIn ? { cursor: 'initial', opacity: 0.3 } : {}}>
            {
              isLiked ? <FaHeart /> : <FaRegHeart />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImgAlbumDetails