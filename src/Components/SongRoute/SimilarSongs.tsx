import React, { memo } from 'react'
import { useFetch } from '../.././Utils/useFetch';
import SongCard from '../SongCard';

const SimilarSongs = ({id}: {id:string}) => {
    
    const fetchUrl = `https://saavn.dev/api/songs/${id}/suggestions?limit=10`;
    const { loading, error, data } = useFetch(fetchUrl);
    // const loading = true;

    // console.log(data)

    if (loading) return <p className='Loading-Error'>Loading...</p>;
    if (error) return <p className='Loading-Error'>Error loading album details.</p>;
  return (
    <div className='SimilarSongs' style={{marginBottom: '20px'}}>
      {
        !loading && !error && data && (
          data.map((item:any) => (
            <SongCard key={item.id} result={item} />
          ))
        )
      }
    </div>
  )
}

export default memo(SimilarSongs)