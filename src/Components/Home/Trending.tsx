import { useEffect, useState } from 'react'
import TrendingCards from './TrendingCards'
import { useFetch } from '../../Utils/useFetch'
import Loader from '../Loader'

const Trending = () => {

    // const [dataObj, setDataObj] = useState({
    //     data: [],
    //     loading: false,
    //     error: false
    // })

    // useEffect(()=>{
    //     const getData = async () => {
    //         // 'https://proxyapi-ukea.onrender.com/trending-now'
    //         const fetchUrl = 'http://localhost:8000/api/trending-now'
    //         try {
    //             setDataObj(prev => ({...prev, loading: true}))
    //             const req = await fetch(fetchUrl)
    //             const res = await req.json()
    //             setDataObj(prev => ({...prev, data: res}))
    //         } catch (error) {
    //             console.log(error)
    //             setDataObj(prev => ({...prev, error: true}))
    //         } finally {
    //             setDataObj(prev => ({...prev, loading: false}))
    //         }
    //     }
    //     getData()
    // },[])

    // useEffect(()=>{
    //     console.log(dataObj.data)
    // },[dataObj,])

    const { loading, error, data } = useFetch('http://localhost:8000/api/trending-now')

    // useEffect(()=> {
    //     console.log(data)
    // },[data])

    if(loading) return <Loader />
    if(error) return <p className='Loading-Error'>Error in loading.</p>

    return (
        <div className='Trending'>
            <h1>Trending now</h1>
            <section>
                {
                    (data && Array.isArray(data)) && (
                        data.slice(0,15).map((item:any) => (
                            <TrendingCards key={item.id} data={item} />
                        ))
                    )
                }
            </section>
        </div>
    )
}

export default Trending