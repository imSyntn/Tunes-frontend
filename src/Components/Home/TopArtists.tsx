import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../Utils/useFetch'
import { top_artists } from '../../App.types'
import '../../Styles/Home/TopArtists.scss'
import '../../Styles/Artists.scss'

const fetchUrl = 'https://www.jiosaavn.com/api.php?__call=social.getTopArtists&api_version=4&_format=json&_marker=0&ctx=web6dot0'
// 'https://proxyapi-ukea.onrender.com/top-artists'

const TopArtists = () => {

  // const [data, setData] = useState([])
  const { loading, error, data } = useFetch('http://localhost:8000/api/top-artists')

  const navigate = useNavigate()

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  if (loading) return null;
  if (error) return null;

  return (
    <div className='TopArtists'>
      <h1>Top Artists</h1>
      <div className="homeArtistCont">
        {
          (data && Array.isArray(data)) && (
            (data as top_artists[]).slice(0, 15).map((item: top_artists) => (
              <div className="artistCont" key={item.artistid} onClick={() => navigate(`/artist/${item.artistid}`)}>
                <img src={item.image || '../../music.png'} alt="" />
                <p>{item.name}</p>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default TopArtists