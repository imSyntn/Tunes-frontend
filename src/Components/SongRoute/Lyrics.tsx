import { useState } from 'react'
import { useFetch } from '../../Utils/useFetch'

const Lyrics = ({ id }: { id: string }) => {

    const [showFullLyrics, setShowFullLyrics] = useState(false)

    const fetchUrl = `/api/songs/${id}/lyrics`;
    const { loading, error, data } = useFetch(fetchUrl);

    return (
        <>
            <div className={`Lyrics ${showFullLyrics ? 'fullView' : ''}`}>
                {
                    !loading && !error && data && (
                        <>
                            {
                                ('lyrics' in data) && (
                                    data?.lyrics?.split('<br>').map((item: string, index: number) => (
                                        <p key={index}>{item}</p>
                                    ))
                                )
                            }
                            {
                                ('copyright' in data) && (
                                    data?.copyright?.split('<br>').map((item: string, index: number) => (
                                        <h4 key={index}>{item}</h4>
                                    ))
                                )

                            }
                        </>
                    )
                }
            </div>

            <button className='readMore' onClick={() => setShowFullLyrics(prev => !prev)}>
                {
                    showFullLyrics ? 'Read less' : 'Read more'
                }
            </button>
        </>
    )
}

export default Lyrics