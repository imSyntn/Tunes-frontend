import React from 'react'
import {useNavigate} from 'react-router-dom'

const AlbumThumbnail = ({ result }: any) => {
    const navigate = useNavigate()
    return (
        <div className='AlbumThumbnail' onClick={()=> navigate(`/album/${result.id}`)}>
            <img src={result?.image?.[1]?.url} alt="" />
            <h4>{result?.name.length> 17 ? `${result?.name.slice(0,17) + '...'}` : `${result?.name}`}</h4>
            <p>{result?.year}</p>
        </div>
    )
}

export default AlbumThumbnail