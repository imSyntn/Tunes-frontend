import NewReleases from "./NewReleases"
import TopArtists from "./TopArtists"
import Trending from "./Trending"

const Home = () => {

  return (
    <div className='Home'>
      <Trending />
      <NewReleases />
      <TopArtists />
    </div>
  )
}

export default Home