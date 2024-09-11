import { useState, useEffect } from 'react'
import { useFetch } from '../../Utils/useFetch'
import SongCard from '../SongCard'
import AlbumThumbnail from '../AlbumThumbnail'
import { ResultsInDataType } from '../../App.types'

const DynamicContent = ({ type, id, childToParentDataSend, childData, setPlayId, playId }: { type: string, id: string, childToParentDataSend: (params: any) => void, childData: any, setPlayId: any, playId: ResultsInDataType[] }) => {
  const [page, setPage] = useState<number>(0)

  const fetchUrl = `https://saavn.dev/api/artists/${id}/${type}?page=${page}`

  const { loading, error, data } = useFetch(fetchUrl)
  const [totalData, setTotalData] = useState<ResultsInDataType[]>([])

  useEffect(() => {
    if (data && Array.isArray((data as ResultsInDataType)[type as keyof ResultsInDataType])) {
      setTotalData((prev: ResultsInDataType[]) => {
        let updatedData: ResultsInDataType[];

        let newData: any = (data as ResultsInDataType)[type as keyof ResultsInDataType]

        if (prev.length == 0) {
          updatedData = [...newData]
        } else {
          updatedData = [...prev, ...newData]
        }
        return updatedData;
      });
    }
  }, [data]);

  useEffect(() => {
    setTotalData([])
    setPage(0)
  }, [type, id])


  useEffect(() => {
    console.log('totalData', totalData)
    if (data && Array.isArray((data as ResultsInDataType)[type as keyof ResultsInDataType]) && type == 'songs') {
      if (childData.length == 0) {
        childToParentDataSend(totalData)
      } else {
        if (playId.length != 0) {
          let newData: any = (data as ResultsInDataType)[type as keyof ResultsInDataType]
          const allData = [...playId, ...newData]
          const withoutDuplicates = allData.filter((item:ResultsInDataType, index:number, ref:ResultsInDataType[])=> index === ref.findIndex(t=> t.id === item.id))
          setPlayId(withoutDuplicates)
        }
      }
    }
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
      <div className={type == 'albums' ? 'albumCont' : ''}>
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
      {
        !loading && !error && (
          <div className="load">
            <button onClick={() => setPage(prev => prev + 1)}>Load more</button>
          </div>
        )
      }
    </div>
  )
}

export default DynamicContent