import React, { memo,useEffect } from 'react'
import { useFetch } from '../.././Utils/useFetch';
import SongCard from '../SongCard';
import { ResultsInDataType } from '../../App.types';

interface SimilarSongPropType {
  id: string,
  setAllSongData: React.Dispatch<React.SetStateAction<ResultsInDataType[]>>
}

const SimilarSongs: React.FC<SimilarSongPropType> = ({id,setAllSongData}) => {
    
    const fetchUrl = `https://saavn.dev/api/songs/${id}/suggestions?limit=10`;
    const { loading, error, data } = useFetch(fetchUrl);
    // const loading = true;

    // console.log(data)

    useEffect(()=> {
      if(!loading && !error && Array.isArray(data)) {
        setAllSongData((prev: ResultsInDataType[])=> [...prev,...data])
      }
    },[data])

    // if (loading) return <p className='Loading-Error'>Loading...</p>;
    // if (error) return <p className='Loading-Error'>Error loading album details.</p>;
  return (
    <div className='SimilarSongs' style={{marginBottom: '20px'}}>
      {
        !loading && !error && Array.isArray(data) && (
          data.map((item: ResultsInDataType) => (
            <SongCard key={item.id} result={item} />
          ))
        )
      }
    </div>
  )
}

export default memo(SimilarSongs)