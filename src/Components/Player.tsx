import { useState, useContext, useEffect, useRef, useCallback, useMemo } from 'react'
import { useformatTime } from '../Utils/useformatTime';
import { useNameDot } from '../Utils/useNameDot';
import { useNavigate } from 'react-router-dom'
import { MdOutlineLibraryMusic } from "react-icons/md";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { RiRepeat2Fill, RiRepeatOneLine } from "react-icons/ri";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { songIdContext } from '../App';
import { ResultsInDataType } from '../App.types';

const Player = () => {

    const navigate = useNavigate()
    const formatTime = useformatTime()
    const nameWithDot = useNameDot()

    const songContext = useContext(songIdContext)
    if (!songContext) {
        return null
    }

    const { tracks, setCurrentSongObj, songIndex, setSongIndex } = songContext;

    const audioRef = useRef<HTMLAudioElement>(null)
    const trackListMomo = useRef<ResultsInDataType[] | null>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [audioOptions, setAudioOptions] = useState<any>({
        currentTime: ['-:-', 0],
        totalTime: ['-:-', 0],
        loop: true,
        // currentSong: 0,
        volume: 100
    })

    const disabled = (tracks.length == 0) ? true : false;

    // useEffect(() => {
    //     if ((audioOptions.currentTime[1] >= audioOptions.totalTime[1]) && isPlaying && !audioOptions.loop) {
    //         nextSong()
    //     }
    // }, [audioOptions.currentTime])

    useEffect(() => {
        if (trackListMomo.current == null || trackListMomo.current?.[0]?.id != tracks?.[0].id) {
            // setAudioOptions((prev: any) => ({ ...prev, currentSong: 0 }))
            setSongIndex(0)
        }
        trackListMomo.current = tracks;
        setCurrentSongObj(tracks[songIndex])
    }, [tracks])

    useEffect(() => {
        if (tracks.length != 0) {
            setCurrentSongObj(tracks[songIndex])
        }
    }, [songIndex])


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
        if (songIndex - 1 >= 0) {
            // setAudioOptions((prev: any) => ({ ...prev, currentSong: prev.currentSong - 1 }))
            setSongIndex((prev: number) => prev - 1)
        }
    }, [songIndex])

    const nextSong = useCallback(() => {
        if (songIndex + 1 < tracks.length) {
            // setAudioOptions((prev: any) => ({ ...prev, currentSong: prev.currentSong + 1 }))
            setSongIndex((prev: number) => prev + 1)
        } else {
            setIsPlaying(false)
        }
    }, [tracks, songIndex])

    const artistsNAme = useMemo(() => (
        tracks[songIndex]?.artists?.primary?.map((acc: any) => ` ${acc.name}`).join(' ,')
    ), [tracks, songIndex])
    const ArtistChar = useMemo(() => {
        return (artistsNAme) ? nameWithDot(artistsNAme) : '';
    }, [artistsNAme])

    const songName = useMemo(() => {
        return (tracks[songIndex]?.name) ? nameWithDot(tracks[songIndex]?.name) : ''
    }, [tracks, songIndex])

    return (
        <div className='Player'>

            <audio preload='auto' src={tracks[songIndex]?.downloadUrl?.[4]?.url} ref={audioRef}
                loop={audioOptions.loop} onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={currentTimeOfAudio} autoPlay={true} onEnded={nextSong}
            />

            <div className="rangeAlike">
                <div className="range" style={{ width: `${(audioOptions.currentTime[1] / audioOptions.totalTime[1]) * 100}%` }}></div>
            </div>
            <input type="range" step='any' name="audioProgress" id="" value={(audioOptions.currentTime[1] / audioOptions.totalTime[1]) * 100 || 0} onInput={changeAudioTimeline} />


            <div className="img-Name">
                <img src={tracks[songIndex]?.image?.[0]?.url || '../../music.png'} alt="" style={disabled ? { opacity: 0.5 } : {}} />
                <div className="names">
                    <h4>{songName}</h4>
                    <p>{ArtistChar}</p>
                </div>
            </div>

            <div className="PlayerOptions">
                <div className="loopOptions" onClick={() => setAudioOptions((prev: any) => ({ ...prev, loop: !prev.loop }))}>
                    {
                        audioOptions.loop ? (
                            <RiRepeatOneLine style={disabled ? { opacity: 0.5, cursor: 'initial' } : {}} />
                        ) : (
                            <RiRepeat2Fill style={disabled ? { opacity: 0.5, cursor: 'initial' } : {}} />
                        )
                    }
                </div>
                <IoPlaySkipBackSharp onClick={prevSong} style={(disabled || songIndex == 0) ? { opacity: 0.5, cursor: 'initial' } : {}} />
                <div className="playPause" onClick={() => {
                    (tracks.length > 0) && (
                        setIsPlaying(prev => !prev)
                    )
                }}>
                    {
                        isPlaying ? <IoMdPause style={disabled ? { opacity: 0.5, cursor: 'initial' } : {}} /> : <IoMdPlay style={disabled ? { opacity: 0.5, cursor: 'initial' } : {}} />
                    }
                </div>
                <IoPlaySkipForwardSharp onClick={nextSong} style={(disabled || songIndex == tracks.length - 1) ? { opacity: 0.5, cursor: 'initial' } : {}} />
                <MdOutlineLibraryMusic onClick={() => {
                    if (!disabled) {
                        navigate(`/song/${tracks[songIndex]?.id}`)
                    }
                }} style={disabled ? { opacity: 0.5, cursor: 'initial' } : {}} />
            </div>

            <p className='timestamp'>{audioOptions.currentTime[0]} <span>/</span> {audioOptions.totalTime[0]}</p>
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