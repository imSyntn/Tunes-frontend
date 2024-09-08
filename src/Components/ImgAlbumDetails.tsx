import React, { useEffect } from 'react'

const ImgAlbumDetails = ({ data }:any) => {
    // useEffect(()=> console.log(data),[])
    if (!data || !data.image) {
        return <p>Loading album details...</p>; // Add a fallback for when data is not available
      }
    //   console.log(data)
    return (
        <div className="img-albumDetails">
            {
                data.image?.[2]?.url || data.image?.[1]?.url || data.image?.[0]?.url ? (
                    <img src={data.image?.[2]?.url || data.image[1].url || data.image[0].url} alt={data.name || 'Album cover'} />
                ) : (
                    <p>No image available</p>
                )
            }
            <div className="albumDetails">
                <h1>{data.name}</h1>
                <p>{data.description || data.copyright}</p>
                <p>{data.label} {data.year}</p>
                <p>{data.playCount ?  `${data.playCount}  plays` : ''}</p>
                <p>{data.songCount ? `${data.songCount}  Songs` : ''}</p>
                <button>Play</button>
            </div>
        </div>
    )
}

export default ImgAlbumDetails