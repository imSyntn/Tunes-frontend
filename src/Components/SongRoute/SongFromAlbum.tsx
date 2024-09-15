import { ResultsInDataType } from '../../App.types';
import { useFetch } from '../../Utils/useFetch';
import { useNavigate } from 'react-router-dom'

const SongFromAlbum = ({id, currentSongId}: {id:string, currentSongId:string}) => {

    const fetchUrl = `/api/albums?id=${id}`;
    const { loading, error, data } = useFetch(fetchUrl);

    const navigate = useNavigate()

    // if (loading) return <p className='Loading-Error'>Loading...</p>;
    // if (error) return <p className='Loading-Error'>Error loading album details.</p>;

    // console.log(data)

  return (
    <div className='SongFromAlbum'>
        {
            !loading && !error && data && !Array.isArray(data) && (
                <>
                {
                    data?.songs?.filter((item: ResultsInDataType) => item.id !== currentSongId).map((item:ResultsInDataType)=> (
                        <div className="songInAlbum" key={item.id} onClick={()=> navigate(`/song/${item.id}`)}>
                            <img src={item.image?.[1]?.url || '../../../music.png'} alt="" />
                            <p>{item.name}</p>
                        </div>
                    ))
                }
                </>
            )
        }
    </div>
  )
}

export default SongFromAlbum