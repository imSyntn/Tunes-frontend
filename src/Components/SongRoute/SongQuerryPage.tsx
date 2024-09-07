import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../Utils/useFetch';
// import SongCard from './SongCard';
import ImgAlbumDetails from '../ImgAlbumDetails';
import Artists from '../Artists';
import Lyrics from './Lyrics';
import SimilarSongs from './SimilarSongs';
import SongFromAlbum from './SongFromAlbum';

const SongQuerryPage = () => {

    const { id } = useParams()

    if (!id) {
        return <p>Invalid Song</p>
    }

    const fetchUrl = `https://saavn.dev/api/songs?ids=${id}`;
    const { loading, error, data } = useFetch(fetchUrl);
    // const loading = true;

    if (loading) return <p className='Loading-Error'>Loading...</p>;
    if (error) return <p className='Loading-Error'>Error loading album details.</p>;

    console.log(data)

    return (
        <div className='SongQuerryPage'>
            {
                !loading && !error && data && (
                    <>
                        <ImgAlbumDetails data={data[0]} />
                        {
                            data[0]?.hasLyrics && (
                                <>
                                    <h2>Lyrics</h2>
                                    <Lyrics id={data[0].id} />
                                </>
                            )
                        }
                        {
                            data[0]?.album?.id && (
                                <>
                                    <h2>More from {data[0].album.name}</h2>
                                    <SongFromAlbum id={data[0].album.id} currentSongId={id} />
                                </>
                            )
                        }
                        <h2>Similar songs</h2>
                        <SimilarSongs id={id} />
                        <h2>Artists</h2>
                        <Artists data={data[0]} />
                    </>
                )
            }
        </div>
    )
}

export default SongQuerryPage