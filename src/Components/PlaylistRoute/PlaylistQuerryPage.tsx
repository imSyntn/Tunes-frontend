import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../Utils/useFetch'
import ImgAlbumDetails from '../ImgAlbumDetails'
import SongCard from '../SongCard'
import Artists from '../Artists'
import { songIdContext } from '../../App';

const PlaylistQuerryPage = () => {

    const { id } = useParams()

    const songContext = useContext(songIdContext);

    if (!songContext) {
        return null
    }
    const { setPlayId } = songContext;

    // const [totalData, setTotalData] = useState<any>([])
    // const [page, setPage] = useState<number>(0)

    const fetchUrl = `https://saavn.dev/api/playlists?id=${id}&limit=100`
    const { loading, error, data } = useFetch(fetchUrl)
    useEffect(() => {
        console.log(data)
    }, [data])

    if (loading || error) {
        return null
    }

    const audioSet = () => {
        if (!loading && !error && data && 'songs' in data && Array.isArray(data.songs)) {
            setPlayId(data.songs)
        }
    }

    // useEffect(() => {
    //     console.log(totalData.slice(1))
    // }, [totalData])

    return (
        <div className='PlaylistQuerryPage'>
            {
                !loading && !error && data && !Array.isArray(data) && (
                    <>
                        <ImgAlbumDetails data={data} audioSet={audioSet} />
                        <h2>Songs</h2>
                        {
                            data.songs?.map((item: any) => (
                                <SongCard result={item} key={item.id} />
                            ))
                        }
                        <h2 style={{ marginTop: '30px' }}>Artists</h2>
                        <Artists data={data} />
                    </>
                )
            }
        </div>
    )
}

export default PlaylistQuerryPage