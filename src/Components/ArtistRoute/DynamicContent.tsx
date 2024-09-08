import React, { useState, useEffect, useRef } from 'react'
import { useFetch } from '../../Utils/useFetch'
import SongCard from '../SongCard'
import AlbumThumbnail from '../AlbumThumbnail'

const DynamicContent = ({ type, id }: { type: string, id: string }) => {
  const [page, setPage] = useState<number>(0)

  const fetchUrl = `https://saavn.dev/api/artists/${id}/${type}?page=${page}`

  const { loading, error, data } = useFetch(fetchUrl)
  const [totalData, setTotalData] = useState<any>([])

  useEffect(() => {
    if (data && Array.isArray(data[type])) {
      setTotalData((prev: any) => {
        let updatedData;
        if (prev.length == 0) {
          updatedData = [...data[type]]
        } else {
          updatedData = [...prev, ...data[type]]
        }
        return updatedData;
      });
    }
  }, [data]);

  useEffect(() => {
    setTotalData([])
    setPage(0)
  }, [type,id])

  // console.log(data)
  useEffect(() => {
    // console.log(data)
    console.log('totalData', totalData)
  }, [totalData])

  // if (loading) {
  //   return null
  // }
  // if (error) {
  //   return null
  // }

  return (
    <div className='DynamicContent'>
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <div className={type == 'albums' ? 'albumCont': ''}>
        {
          totalData?.map((item: any) => (
            (type === 'songs') ? (
              <SongCard key={item.id} result={item} />
            ) : (
              <AlbumThumbnail key={item.id} result={item} />
            )
          ))
        }
      </div>
      <div className="load">
        <button onClick={() => setPage(prev => prev + 1)}>Load more</button>
      </div>
    </div>
  )
}

export default DynamicContent