import { ResultsInDataType } from '../App.types';
import { motion } from 'framer-motion'

const ImgAlbumDetails = ({ data, audioSet }: { data: ResultsInDataType, audioSet: () => void }) => {
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
                <motion.button whileTap={{scale: 0.7}} transition={{duration:0.01}} onClick={() => audioSet()}>Play</motion.button>
            </div>
        </div>
    )
}

export default ImgAlbumDetails