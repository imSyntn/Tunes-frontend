import {useState} from 'react'
import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

// cosnt iconsS

const Player = () => {

    const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className='Player'>
        <div className="imgNames">
            <img src="" alt="" />
            <div className="names">
                <h3>Afterlife</h3>
                <p>Arijit Singh</p>
            </div>
        </div>
        <div className="PlayerOptions">
            <MdSkipPrevious />
            {
                isPlaying ? <FaPause /> : <FaPlay />
            }
            <MdSkipNext />
        </div>
    </div>
  )
}

export default Player