import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../Utils/useFetch'
import { SiTicktick } from "react-icons/si";
import DynamicContent from './DynamicContent';

// interface typeStateType {
//     song: boolean,
//     album: boolean
// }

const ArtistQuerryPage = () => {

    const { id } = useParams()

    if(!id) {
        return null
    }

    const [type, setType] = useState<string>('songs')

    const fetchUrl = `https://saavn.dev/api/artists?id=${id}`;
    const { loading, error, data } = useFetch(fetchUrl)

    if (loading) {
        return null
    }
    if (error) {
        return null
    }

    return (
        <div className='ArtistQuerryPage'>
            {
                !loading && !error && data && (
                    <>
                        <div className="imgText">
                            <img src={data.image?.[2]?.url || data.image?.[1]?.url || data.image?.[0]?.url || 'https://images5.alphacoders.com/349/thumb-1920-349108.jpg'} alt="" />
                            <div className="text">
                                <h1>{data.name} {data.isVerified && <SiTicktick />}</h1>
                                <p>{data.fanCount} Listeners</p>
                            </div>
                        </div>
                        <h2>Introduction</h2>
                        <p>{data.bio?.[0]?.text}</p>
                        <div className="type">
                            <div className="contentSwitcher">
                                <button onClick={() => setType('songs')} style={type === 'songs' ? {borderColor: '#2bc5b4'} : {borderColor: 'white'}}>Songs</button>
                                <button onClick={() => setType('albums')} style={type==='albums' ? {borderColor: '#2bc5b4'} : {borderColor: 'white'}}>Albums</button>
                            </div>
                            <div className="content">
                                <DynamicContent type={type} id={id} />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ArtistQuerryPage