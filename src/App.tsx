import { createContext, useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Player from './Components/Player'
import Loader from './Components/Loader'
import { ResultsInDataType } from './App.types'

const Main = lazy(()=> import('./Components/Main'))
const Home = lazy(()=> import('./Components/Home/Home'))
const NoData = lazy(()=> import('./Components/NoData'))
const AlbumQuerryPage = lazy(()=> import('./Components/AlbumRoute/AlbumQuerryPage'))
const SongQuerryPage = lazy(()=> import('./Components/SongRoute/SongQuerryPage'))
const ArtistQuerryPage = lazy(()=> import('./Components/ArtistRoute/ArtistQuerryPage'))
const PlaylistQuerryPage = lazy(()=> import('./Components/PlaylistRoute/PlaylistQuerryPage'))
const SearchQuerryPage = lazy(()=> import('./Components/SearchRoute/SearchQuerryPage'))

interface songIdContextType {
  tracks: ResultsInDataType[] | [],
  setTracks: React.Dispatch<React.SetStateAction<ResultsInDataType[]>>,
  currentSongObj: ResultsInDataType | null,
  setCurrentSongObj: React.Dispatch<React.SetStateAction<ResultsInDataType | null>>,
  songIndex: number,
  setSongIndex: React.Dispatch<React.SetStateAction<number>>
}


export const songIdContext = createContext<songIdContextType | undefined>(undefined)

function App() {

  const [tracks, setTracks] = useState<ResultsInDataType[] | []>([])
  const [currentSongObj, setCurrentSongObj] = useState<ResultsInDataType | null>(null)
  const [songIndex, setSongIndex] = useState<number>(0)

  useEffect(() => {
    console.log(tracks)
  }, [tracks])

  useEffect(()=>{
    console.log(currentSongObj)
  },[currentSongObj])

  useEffect(()=>{
    console.log(songIndex)
  },[songIndex])

  return (
    <BrowserRouter>
      <songIdContext.Provider value={{ tracks, setTracks, currentSongObj, setCurrentSongObj, songIndex, setSongIndex }}>
        <Header />
        <Routes>
          <Route path='/'element={<Suspense fallback={<Loader />}><Main /></Suspense>}>
            <Route path='/' element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
            <Route path='/album/:id' element={<Suspense fallback={<Loader />}><AlbumQuerryPage /></Suspense>} />
            <Route path='/song/:id' element={<Suspense fallback={<Loader />}><SongQuerryPage /></Suspense>} />
            <Route path='/artist/:id' element={<Suspense fallback={<Loader />}><ArtistQuerryPage /></Suspense>} />
            <Route path='/playlist/:id' element={<Suspense fallback={<Loader />}><PlaylistQuerryPage /></Suspense>} />

            <Route path='/search/:searchType/:querry' element={<Suspense fallback={<Loader />}><SearchQuerryPage /></Suspense>} />

            <Route path='*' element={<Suspense fallback={<Loader />}><NoData /></Suspense>} />
          </Route>
        </Routes>
        <Player />
      </songIdContext.Provider>
    </BrowserRouter>
  )
}

export default App
