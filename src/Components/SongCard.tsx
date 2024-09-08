import React from 'react'

const SongCard = ({ result }: any) => {
  const artistsNAme = result.artists.primary.map((acc: any) => ` ${acc.name}`).join(' ,')
  const ArtistChar = (artistsNAme.length > 25) ? artistsNAme.slice(0, 29) + '...' : artistsNAme;

  // const addDot = (str:string) => {

  // }

  return (
    <div className='SongCard'>
      <h3><img src={result?.image?.[0]?.url} />
        <div className="names">
          {
            (result.name.length > 20) ? `${result.name.slice(0, 19)}...` : `${result.name}`
          }
          <p>{ArtistChar}</p>
        </div>
      </h3>
      <p className='desktopView'>{ArtistChar}</p>
      <span>{(result.duration / 60).toFixed(2)}</span>
    </div>
  )
}

export default SongCard