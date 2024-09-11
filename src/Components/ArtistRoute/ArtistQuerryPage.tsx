import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../Utils/useFetch'
import { SiTicktick } from "react-icons/si";
import DynamicContent from './DynamicContent';
import { songIdContext } from '../../App';
import Loader from '../Loader';

// interface typeStateType {
//     song: boolean,
//     album: boolean
// }

const ArtistQuerryPage = () => {

    const { id } = useParams()

    const songContext = useContext(songIdContext);
    // const counter = useRef(false)

    if (!songContext) {
        return null
    }
    const { playId, setPlayId } = songContext;

    if (!id) {
        return null
    }

    const [type, setType] = useState<string>('songs')
    const [childData, setChildData] = useState<any>([])

    const fetchUrl = `https://saavn.dev/api/artists?id=${id}`;
    const { loading, error, data } = useFetch(fetchUrl)

    if (loading) {
        return <Loader />
    }
    if (error) {
        return <p className='Loading-Error'>Error in loading.</p>
    }

    const audioSet = () => {
        if (!loading && !error && Array.isArray(childData) && childData.length == 10) {
            console.log(1)
            setPlayId(childData)
        }
    }

    const childToParentDataSend = (childSentData: any) => {
        setChildData(childSentData)
    }

    return (
        <div className='ArtistQuerryPage'>
            {
                !loading && !error && data && !Array.isArray(data) && (
                    <>
                        <div className="imgText">
                            <img src={data.image?.[2]?.url || data.image?.[1]?.url || data.image?.[0]?.url || 'https://images5.alphacoders.com/349/thumb-1920-349108.jpg'} alt="" />
                            <img className='wrapper' src={data.image?.[2]?.url || 'https://images5.alphacoders.com/349/thumb-1920-349108.jpg'} alt={'img wrapper'} />
                            <div className="text">
                                <h1>{data.name} {data.isVerified && <SiTicktick />}</h1>
                                <p>{data.fanCount} Listeners</p>
                                <button style={(type != 'songs') ? { opacity: 0.2, cursor: 'inherit' } : {}} disabled={(type != 'songs' && childData.length == 0) ? true : false} onClick={audioSet}>PLay</button>
                            </div>
                        </div>
                        <h2>Introduction</h2>
                        <p>{data.bio?.[0]?.text}</p>
                        <div className="type">
                            <div className="contentSwitcher">
                                <button onClick={() => setType('songs')} style={type === 'songs' ? { borderColor: '#2bc5b4' } : { borderColor: 'white' }}>Songs</button>
                                <button onClick={() => setType('albums')} style={type === 'albums' ? { borderColor: '#2bc5b4' } : { borderColor: 'white' }}>Albums</button>
                            </div>
                            <div className="content">
                                <DynamicContent type={type} id={id} childToParentDataSend={childToParentDataSend} childData={childData} setPlayId={setPlayId} playId={playId} />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ArtistQuerryPage