import { createContext, useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, json } from 'react-router-dom'
import Header from './Components/Header/Header'
import Player from './Components/Player'
import Loader from './Components/Loader'
import { ResultsInDataType } from './App.types'
import Footer from './Components/Footer/Footer'
import { userType } from './App.types'
// import from './Components/User/User'

const Main = lazy(() => import('./Components/Main'))
const Home = lazy(() => import('./Components/Home/Home'))
const NoData = lazy(() => import('./Components/NoData'))
const AlbumQuerryPage = lazy(() => import('./Components/AlbumRoute/AlbumQuerryPage'))
const SongQuerryPage = lazy(() => import('./Components/SongRoute/SongQuerryPage'))
const ArtistQuerryPage = lazy(() => import('./Components/ArtistRoute/ArtistQuerryPage'))
const PlaylistQuerryPage = lazy(() => import('./Components/PlaylistRoute/PlaylistQuerryPage'))
const SearchQuerryPage = lazy(() => import('./Components/SearchRoute/SearchQuerryPage'))
const User = lazy(() => import('./Components/User/User'))

interface ContextType {
  tracks: ResultsInDataType[] | [],
  setTracks: React.Dispatch<React.SetStateAction<ResultsInDataType[]>>,
  currentSongObj: ResultsInDataType | null,
  setCurrentSongObj: React.Dispatch<React.SetStateAction<ResultsInDataType | null>>,
  songIndex: number,
  setSongIndex: React.Dispatch<React.SetStateAction<number>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>
}


export const Context = createContext<ContextType | undefined>(undefined)

function App() {

  const [tracks, setTracks] = useState<ResultsInDataType[] | []>([])
  const [currentSongObj, setCurrentSongObj] = useState<ResultsInDataType | null>(null) // for song card playing animation
  const [songIndex, setSongIndex] = useState<number>(0)
  const [user, setUser] = useState<userType>({
    loggedIn: false,
    registered: false,
    userSavedData: {},
    updated: 0
  })

  useEffect(() => {
    const handleAutoLogin = async () => {
      const baseUrl = 'http://localhost:8000/api/user/login'
      try {
        const req = await fetch(baseUrl, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const res = await req.json()

        if (res.loggedIn) {
          setUser({ loggedIn: true, registered: false, userSavedData: {}, updated: 0 })
        }
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    const cookie = document.cookie

    if (cookie) {

      console.log('handleAutoLogin()')
      handleAutoLogin()
    }

    const storedTracks = localStorage.getItem('tunes-tracks')
    const storedSongIndex = localStorage.getItem('tunes-song-index')

    if (storedTracks) {
      setTracks((JSON.parse(storedTracks) as ResultsInDataType[]))
      if(storedSongIndex) {
        setSongIndex(JSON.parse(storedSongIndex))
      }
    }
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const req = await fetch('http://localhost:8000/api/user/data', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const res = await req.json()
        setUser({ loggedIn: true, registered: false, userSavedData: res, updated: 0 })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    if (user.loggedIn) {
      fetchUserData()
    }
  }, [user.loggedIn, user.updated])

  useEffect(() => {
    console.log('user saved data', user.userSavedData)
  }, [user.userSavedData])

  useEffect(() => {
    console.log('tracks', tracks)
    if (Array.isArray(tracks)) {
      localStorage.setItem('tunes-tracks', JSON.stringify(tracks))
    }
  }, [tracks])

  useEffect(() => {
      localStorage.setItem('tunes-song-index', JSON.stringify(songIndex))
  }, [songIndex])

  useEffect(() => {
    console.log(currentSongObj)
  }, [currentSongObj])

  useEffect(() => {
    console.log(songIndex)
  }, [songIndex])

  return (
    <BrowserRouter>
      <Context.Provider value={{ tracks, setTracks, currentSongObj, setCurrentSongObj, songIndex, setSongIndex, user, setUser }}>
        <Header />
        <Routes>
          <Route path='/' element={<Main />}>
            {/* so that Every component renders inside main and footer always stays at bottom */}

            <Route index element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
            <Route path='album/:id' element={<Suspense fallback={<Loader />}><AlbumQuerryPage /></Suspense>} />
            <Route path='song/:id' element={<Suspense fallback={<Loader />}><SongQuerryPage /></Suspense>} />
            <Route path='artist/:id' element={<Suspense fallback={<Loader />}><ArtistQuerryPage /></Suspense>} />
            <Route path='playlist/:id' element={<Suspense fallback={<Loader />}><PlaylistQuerryPage /></Suspense>} />

            <Route path='search/:searchType/:querry' element={<Suspense fallback={<Loader />}><SearchQuerryPage /></Suspense>} />

            <Route path='user' element={<Suspense fallback={<Loader />}><User /></Suspense>} />

            <Route path='*' element={<Suspense fallback={<Loader />}><NoData /></Suspense>} />
          </Route>
        </Routes>
        <Player />
        <Footer />
      </Context.Provider>
    </BrowserRouter>
  )
}

export default App
