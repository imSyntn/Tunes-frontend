import { useEffect, useState } from 'react'

const TopArtists = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await fetch('https://www.jiosaavn.com/api.php?__call=social.getTopArtists&api_version=4&_format=json&_marker=0&ctx=web6dot0', {
          method: 'GET',

        })
        const res = await req.json()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    // getData()
  }, [])

  return (
    <div className='TopArtists'>
      sayantan
    </div>
  )
}

export default TopArtists