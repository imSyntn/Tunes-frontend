import { createContext, useState, useEffect } from 'react'
import Header from './Components/Header'
import Player from './Components/Player'
import Main from './Components/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AlbumQuerryPage from './Components/AlbumQuerryPage'
import SongQuerryPage from './Components/SongRoute/SongQuerryPage'
import ArtistQuerryPage from './Components/ArtistRoute/ArtistQuerryPage'

interface songIdContextType {
  playId: string,
  setPlayId: React.Dispatch<React.SetStateAction<string>>
}


export const songIdContext = createContext<songIdContextType | undefined>(undefined)

function App() {

  const [playId, setPlayId] = useState<string>('')

  useEffect(() => {
    console.log(playId)
  }, [playId])

  return (
    <BrowserRouter>
      <songIdContext.Provider value={{ playId, setPlayId }}>
        <Header />
        <Routes>
          <Route path='/'element={<Main />}>
            <Route path='/' element={<p>adsdnsaj</p>} />
            <Route path='/album/:id' element={<AlbumQuerryPage />} />
            <Route path='/song/:id' element={<SongQuerryPage />} />
            <Route path='/artist/:id' element={<ArtistQuerryPage />} />
          </Route>
        </Routes>
        <Player />
      </songIdContext.Provider>
    </BrowserRouter>
  )
}

export default App
