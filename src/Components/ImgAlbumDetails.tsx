import React, { useEffect } from 'react'
import { ResultsInDataType } from '../App.types';

const ImgAlbumDetails = ({ data, audioSet }: { data: ResultsInDataType, audioSet: () => void }) => {
    // useEffect(()=> console.log(data),[])
    // if (!data || !data.image) {
    //     return <p>Loading album details...</p>; // Add a fallback for when data is not available
    //   }
    //   console.log(data)
    return (
        <div className="img-albumDetails">
            {
                data.image?.[2]?.url || data.image?.[1]?.url || data.image?.[0]?.url ? (
                    <>
                        <img src={data.image?.[2]?.url || data.image[1].url || data.image[0].url || '../../music.png'} alt={data.name || 'Album cover'} />
                        <img className='wrapper' src={data.image?.[2]?.url || '../../music.png'} alt={'img wrapper'} />
                    </>
                ) : (
                    <p>No image available</p>
                )
            }
            <div className="albumDetails">
                <h1>{data.name}</h1>
                <p>{data.description || data.copyright}</p>
                <p>{data.label} {data.year}</p>
                <p>{data.playCount ? `${data.playCount}  plays` : ''}</p>
                <p>{data.songCount ? `${data.songCount}  Songs` : ''}</p>
                <button onClick={() => audioSet()}>Play</button>
            </div>
        </div>
    )
}

export default ImgAlbumDetails