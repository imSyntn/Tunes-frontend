import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlay, FaPause } from "react-icons/fa";
import { MdOutlineLibraryMusic } from "react-icons/md";
// import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { ImLoop } from "react-icons/im";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { songIdContext } from '../App';

// cosnt iconsS

const Player = () => {

    const navigate = useNavigate()

    const songContext = useContext(songIdContext)
    if (!songContext) {
        return null
    }

    const { playId, setPlayId } = songContext;
    const audioRef = useRef<HTMLAudioElement>(null)
    const intervalRef = useRef<any>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [audioOptions, setAudioOptions] = useState<any>({
        currentTime: ['-:--', 0],
        totalTime: ['-:--', 0],
        loop: false,
        currentSong: 0,
        volume: 100
    })



    // const audioElemFunc = (url:string) => {
    //     const audio = new Audio(url);

    // }

    useEffect(() => {
        if ((audioOptions.currentTime[1] >= audioOptions.totalTime[1]) && isPlaying) {
            nextSong()
        }
    }, [audioOptions.currentTime])

    useEffect(() => {
        setAudioOptions((prev: any) => ({ ...prev, currentSong: 0 }))
    }, [playId])

    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (audioRef.current) {
                const duration = audioRef.current.duration;
                setAudioOptions((prev: any) => ({
                    ...prev,
                    totalTime: [formatTime(duration), duration],
                }));
                if (!isPlaying) {
                    setIsPlaying(true)
                    audioRef.current.play()
                }
            }
        };

        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, [audioOptions.currentSong]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = audioOptions.volume / 100
        }
    }, [audioOptions.volume])

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const currentTimeOfAudio = () => {
        const CTime = audioRef.current?.currentTime || 0;
        setAudioOptions((prev: any) => ({ ...prev, currentTime: [formatTime(CTime), CTime] }))
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play()
            intervalRef.current = setInterval(currentTimeOfAudio, 500)
        } else {
            audioRef.current?.pause()
            clearInterval(intervalRef.current)
        }

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [isPlaying, audioOptions.currentTime])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = audioOptions.loop;
        }
    }, [audioOptions.loop])

    useEffect(() => {
        // console.log(audioOptions)
    }, [audioOptions])

    const changeAudioTimeline = (e: any) => {
        if (audioRef.current) {
            const time = (audioRef.current.duration / 100) * e.target.value;
            audioRef.current.currentTime = time;
            // setAudioOptions((prev: any) => ({
            //     ...prev,
            //     currentTime: [formatTime(time), time],
            // }));
        }
    }

    const prevSong = () => {
        if (audioOptions.currentSong - 1 >= 0) {
            setAudioOptions((prev: any) => ({ ...prev, currentSong: prev.currentSong - 1 }))
        }
    }

    const nextSong = () => {
        if (audioOptions.currentSong + 1 < playId.length) {
            setAudioOptions((prev: any) => ({ ...prev, currentSong: prev.currentSong + 1 }))
        }
    }

    return (
        <div className='Player'>
            <audio src={playId[audioOptions.currentSong]?.downloadUrl?.[4]?.url} ref={audioRef}
                loop={audioOptions.loop ? true : undefined}
            />
            <div className="rangeAlike">
                <div className="range" style={{ width: `${(audioOptions.currentTime[1] / audioOptions.totalTime[1]) * 100}%` }}></div>
            </div>
            <input type="range" name="audioProgress" id="" value={(audioOptions.currentTime[1] / audioOptions.totalTime[1]) * 100 || 0} onChange={changeAudioTimeline} />
            <div className="img-Name">
                <img src={playId[audioOptions.currentSong]?.image?.[0]?.url || 'https://images5.alphacoders.com/349/thumb-1920-349108.jpg'} alt="" />
                <div className="names">
                    <h4>{playId[audioOptions.currentSong]?.name || '----'}</h4>
                    <p>{playId[audioOptions.currentSong]?.artists?.primary[0].name || '----'}</p>
                </div>
            </div>
            <div className="PlayerOptions">
                <ImLoop />
                <IoPlaySkipBackSharp onClick={prevSong} style={(audioOptions.currentSong == 0) ? { opacity: 0.5 } : {}} />
                <div className="playPause" onClick={() => {
                    (playId.length > 0) && (
                        setIsPlaying(prev => !prev)
                    )
                }}>
                    {
                        isPlaying ? <FaPause /> : <FaPlay />
                    }
                </div>
                <IoPlaySkipForwardSharp onClick={nextSong} style={(audioOptions.currentSong == playId.length - 1) ? { opacity: 0.5 } : {}} />
                <MdOutlineLibraryMusic onClick={() => navigate(`/song/${playId[audioOptions.currentSong]?.id}`)} />
            </div>
            <p className='timestamp'>{audioOptions.currentTime[0]} / <span>{audioOptions.totalTime[0]}</span></p>
            {/* <div className="timestamp-volume"> */}
            <div className="volume">
                <input type="range" value={audioOptions.volume} name="" id="" onChange={(e: any) => setAudioOptions((prev: any) => ({ ...prev, volume: e.target.value }))} />
                <HiMiniSpeakerWave style={audioOptions.volume == 0 ? { opacity: 0.4 } : {}} />
            </div>
            {/* </div> */}
        </div>
    )
}

export default Player