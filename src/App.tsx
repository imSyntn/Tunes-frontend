import { createContext, useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Player from './Components/Player'
import Loader from './Components/Loader'

const Main = lazy(()=> import('./Components/Main'))
const AlbumQuerryPage = lazy(()=> import('./Components/AlbumRoute/AlbumQuerryPage'))
const SongQuerryPage = lazy(()=> import('./Components/SongRoute/SongQuerryPage'))
const ArtistQuerryPage = lazy(()=> import('./Components/ArtistRoute/ArtistQuerryPage'))
const PlaylistQuerryPage = lazy(()=> import('./Components/PlaylistRoute/PlaylistQuerryPage'))
const Home = lazy(()=> import('./Components/Home/Home'))

interface songIdContextType {
  playId: any[],
  setPlayId: React.Dispatch<React.SetStateAction<any[]>>
}


export const songIdContext = createContext<songIdContextType | undefined>(undefined)

function App() {

  const [playId, setPlayId] = useState<any[]>([])

  useEffect(() => {
    console.log(playId)
  }, [playId])

  return (
    <BrowserRouter>
      <songIdContext.Provider value={{ playId, setPlayId }}>
        <Header />
        <Routes>
          <Route path='/'element={<Suspense fallback={<Loader />}><Main /></Suspense>}>
            <Route path='/' element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
            <Route path='/album/:id' element={<Suspense fallback={<Loader />}><AlbumQuerryPage /></Suspense>} />
            <Route path='/song/:id' element={<Suspense fallback={<Loader />}><SongQuerryPage /></Suspense>} />
            <Route path='/artist/:id' element={<Suspense fallback={<Loader />}><ArtistQuerryPage /></Suspense>} />
            <Route path='/playlist/:id' element={<Suspense fallback={<Loader />}><PlaylistQuerryPage /></Suspense>} />
          </Route>
        </Routes>
        <Player />
      </songIdContext.Provider>
    </BrowserRouter>
  )
}

export default App
