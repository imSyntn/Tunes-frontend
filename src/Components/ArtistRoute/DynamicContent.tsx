import React, { useState, useEffect, useRef } from 'react'
import { useFetch } from '../../Utils/useFetch'
import SongCard from '../SongCard'

const DynamicContent = ({ type, id }: { type: string, id: string }) => {
  const [totalData, setTotalData] = useState<any>([])
  // const [page, setPage] = useState<number>(0)

  const fetchUrl = `https://saavn.dev/api/artists/${id}/${type}`

  const { loading, error, data } = useFetch(fetchUrl)
  // const PreviousData = useRef<any>(null)

  useEffect(() => {
    console.log('data:', data); 

    if (data && data.length > 0) {  
      setTotalData((prev: any) => {
        const updatedData = [...prev, ...data];
        console.log('Updated totalData:', updatedData);
        return updatedData;
      });
    }
  }, [data, type, id]);

  // console.log(data)
  // useEffect(() => {
  //   console.log(data)
  //   console.log(totalData)
  // }, [totalData])

  if (loading) {
    return null
  }
  if (error) {
    return null
  }

  return (
    <div className='DynamicContent'>
      DynamicContent
      {
        totalData?.songs?.map((item: any) => (
          <SongCard key={item.id} result={item} />
        ))
      }
    </div>
  )
}

export default DynamicContent