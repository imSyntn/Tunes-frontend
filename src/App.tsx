import { createContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Player from './Components/Player'
import Main from './Components/Main'
import AlbumQuerryPage from './Components/AlbumRoute/AlbumQuerryPage'
import SongQuerryPage from './Components/SongRoute/SongQuerryPage'
import ArtistQuerryPage from './Components/ArtistRoute/ArtistQuerryPage'
import PlaylistQuerryPage from './Components/PlaylistRoute/PlaylistQuerryPage'
import Home from './Components/Home/Home'

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
          <Route path='/'element={<Main />}>
            <Route path='/' element={<Home />} />
            <Route path='/album/:id' element={<AlbumQuerryPage />} />
            <Route path='/song/:id' element={<SongQuerryPage />} />
            <Route path='/artist/:id' element={<ArtistQuerryPage />} />
            <Route path='/playlist/:id' element={<PlaylistQuerryPage />} />
          </Route>
        </Routes>
        <Player />
      </songIdContext.Provider>
    </BrowserRouter>
  )
}

export default App
