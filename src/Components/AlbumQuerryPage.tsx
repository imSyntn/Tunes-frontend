import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../Utils/useFetch';
import SongCard from './SongCard';
import ImgAlbumDetails from './ImgAlbumDetails';
import Artists from './Artists';

const AlbumQuerryPage = () => {
  const { id } = useParams();
  const fetchUrl = `https://saavn.dev/api/albums?id=${id}`;
  const { loading, error, data } = useFetch(fetchUrl);
  // const loading = true;

  if (loading) return <p className='Loading-Error'>Loading...</p>;
  if (error) return <p className='Loading-Error'>Error loading album details.</p>;

  // console.log(data)

  return (
    <div className='AlbumQuerryPage'>
      {!loading && !error && data && (
        <>
          <ImgAlbumDetails data={data} />
            <h2 className='so'>Songs</h2>
          <div className="albumSongs">
            {data.songs && data.songs.length > 0 ? (
              data.songs.map((item:any) => (
                  <SongCard key={item.id} result={item} />
              ))
            ) : (
              <p>No songs available</p>
            )}
          </div>
            <h2>Artists</h2>
          <Artists data={data} />
        </>
      )}
    </div>
  );
};

export default memo(AlbumQuerryPage);
