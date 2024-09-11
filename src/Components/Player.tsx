import { useState, useContext, useEffect, useRef, useCallback } from 'react'
import { useformatTime } from '../Utils/useformatTime';
import { useNavigate } from 'react-router-dom'
import { MdOutlineLibraryMusic } from "react-icons/md";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { RiRepeat2Fill, RiRepeatOneLine } from "react-icons/ri";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { songIdContext } from '../App';

const Player = () => {

    const navigate = useNavigate()
    const formatTime = useformatTime()

    const songContext = useContext(songIdContext)
    if (!songContext) {
        return null
    }

    const { playId } = songContext;
    const audioRef = useRef<HTMLAudioElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [audioOptions, setAudioOptions] = useState<any>({
        currentTime: ['-:--', 0],
        totalTime: ['-:--', 0],
        loop: true,
        currentSong: 0,
        volume: 100
    })

    // useEffect(() => {
    //     if ((audioOptions.currentTime[1] >= audioOptions.totalTime[1]) && isPlaying && !audioOptions.loop) {
    //         nextSong()
    //     }
    // }, [audioOptions.currentTime])

    useEffect(() => {
        setAudioOptions((prev: any) => ({ ...prev, currentSong: 0 }))
    }, [playId])

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

    // useEffect(() => {
    //     const handleLoadedMetadata = () => {
    //         if (audioRef.current) {
    //             const duration = audioRef.current.duration;
    //             setAudioOptions((prev: any) => ({
    //                 ...prev,
    //                 totalTime: [formatTime(duration), duration],
    //             }));
    //             if (!isPlaying) {
    //                 setIsPlaying(true)
    //                 audioRef.current.play()
    //             }
    //         }
    //     };

    //     const audioElement = audioRef.current;
    //     if (audioElement) {
    //         audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    //     }

    //     return () => {
    //         if (audioElement) {
    //             audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    //         }
    //     };
    // }, [audioOptions.currentSong]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = audioOptions.volume / 100;
        }
    }, [audioOptions.volume])

    // const formatTime = (time: number) => {
    //     const minutes = Math.floor(time / 60);
    //     const seconds = Math.floor(time % 60);
    //     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    // };

    const currentTimeOfAudio = () => {
        const CTime = audioRef.current?.currentTime || 0;
        setAudioOptions((prev: any) => ({ ...prev, currentTime: [formatTime(CTime), CTime] }))
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play()
            // intervalRef.current = setInterval(currentTimeOfAudio, 500)
        } else {
            audioRef.current?.pause()
            // clearInterval(intervalRef.current)
        }

        // return () => {
        //     clearInterval(intervalRef.current)
        // }
    }, [isPlaying
        // , audioOptions.currentTime
    ])

    // useEffect(() => {                  //// Loop
    //     if (audioRef.current) {
    //         audioRef.current.loop = audioOptions.loop;
    //     }
    // }, [audioOptions.loop])

    // useEffect(() => {
    //     console.log(audioOptions)
    // }, [audioOptions])

    const changeAudioTimeline = (e: any) => {
        if (audioRef.current) {
            const time = (audioRef.current.duration / 100) * e.target.value;
            audioRef.current.currentTime = time;
        }
    }

    const prevSong = useCallback(() => {
        if (audioOptions.currentSong - 1 >= 0) {
            setAudioOptions((prev: any) => ({ ...prev, currentSong: prev.currentSong - 1 }))
        }
    },[audioOptions.currentSong])

    const nextSong = useCallback(() => {
        if (audioOptions.currentSong + 1 < playId.length) {
            setAudioOptions((prev: any) => ({ ...prev, currentSong: prev.currentSong + 1 }))
        } else {
            setIsPlaying(false)
        }
    },[playId, audioOptions.currentSong])

    return (
        <div className='Player'>
            <audio preload='auto' src={playId[audioOptions.currentSong]?.downloadUrl?.[4]?.url} ref={audioRef}
                loop={audioOptions.loop} onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={currentTimeOfAudio} autoPlay={true} onEnded={nextSong}
            />
            <div className="rangeAlike">
                <div className="range" style={{ width: `${(audioOptions.currentTime[1] / audioOptions.totalTime[1]) * 100}%` }}></div>
            </div>
            <input type="range" step='any' name="audioProgress" id="" value={(audioOptions.currentTime[1] / audioOptions.totalTime[1]) * 100 || 0} onInput={changeAudioTimeline} />
            <div className="img-Name">
                <img src={playId[audioOptions.currentSong]?.image?.[0]?.url || 'https://images5.alphacoders.com/349/thumb-1920-349108.jpg'} alt="" />
                <div className="names">
                    <h4>{playId[audioOptions.currentSong]?.name || '----'}</h4>
                    <p>{playId[audioOptions.currentSong]?.artists?.primary[0].name || '----'}</p>
                </div>
            </div>
            <div className="PlayerOptions">
                <div className="loopOptions" onClick={() => setAudioOptions((prev: any) => ({ ...prev, loop: !prev.loop }))}>
                    {
                        audioOptions.loop ? (
                            <RiRepeatOneLine />
                        ) : (
                            <RiRepeat2Fill />
                        )
                    }
                </div>
                <IoPlaySkipBackSharp onClick={prevSong} style={(audioOptions.currentSong == 0) ? { opacity: 0.5 } : {}} />
                <div className="playPause" onClick={() => {
                    (playId.length > 0) && (
                        setIsPlaying(prev => !prev)
                    )
                }}>
                    {
                        isPlaying ? <IoMdPause /> : <IoMdPlay />
                    }
                </div>
                <IoPlaySkipForwardSharp onClick={nextSong} style={(audioOptions.currentSong == playId.length - 1) ? { opacity: 0.5 } : {}} />
                <MdOutlineLibraryMusic onClick={() => navigate(`/song/${playId[audioOptions.currentSong]?.id}`)} />
            </div>
            <p className='timestamp'>{audioOptions.currentTime[0]} / <span>{audioOptions.totalTime[0]}</span></p>
            {/* <div className="timestamp-volume"> */}
            <div className="volume">
                <input type="range" value={audioOptions.volume} name="" id="" onInput={(e: any) => setAudioOptions((prev: any) => ({ ...prev, volume: e.target.value }))} />
                <HiMiniSpeakerWave style={audioOptions.volume == 0 ? { opacity: 0.4 } : {}} />
            </div>
            {/* </div> */}
        </div>
    )
}

export default Player