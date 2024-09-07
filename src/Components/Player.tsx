import { useState, useContext } from 'react'
import { FaPlay, FaPause } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
// import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { ImLoop } from "react-icons/im";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { songIdContext } from '../App';

// cosnt iconsS

const Player = () => {

    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <div className='Player'>
            <div className="img-Name">
                <img src="https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_50x50.jpg" alt="" />
                <div className="names">
                    <h4>Afterlife</h4>
                    <p>Arijit Singh, Yo Yo Honey Singh</p>
                </div>
            </div>
            <div className="PlayerOptions">
                <ImLoop />
                <IoPlaySkipBackSharp />
                <div className="playPause" onClick={() => setIsPlaying(prev => !prev)}>
                    {
                        isPlaying ? <FaPause /> : <FaPlay />
                    }
                </div>
                <IoPlaySkipForwardSharp />
                <FaShuffle />
            </div>
            <div className="timestamp-volume">
                <p>0:00 / 2:50</p>
                <div className="volume">
                    <input type="range" name="" id="" />
                    <HiMiniSpeakerWave />
                </div>
            </div>
        </div>
    )
}

export default Player