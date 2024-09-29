import { useEffect, useState } from 'react'
import TrendingCards from './TrendingCards'
import Loader from '../Loader'

const Trending = () => {

    const [dataObj, setDataObj] = useState({
        data: [],
        loading: false,
        error: false
    })

    useEffect(()=>{
        const getData = async () => {
            // 'https://proxyapi-ukea.onrender.com/trending-now'
            const fetchUrl = 'http://localhost:8000/api/trending-now'
            try {
                setDataObj(prev => ({...prev, loading: true}))
                const req = await fetch(fetchUrl)
                const res = await req.json()
                setDataObj(prev => ({...prev, data: res}))
            } catch (error) {
                console.log(error)
                setDataObj(prev => ({...prev, error: true}))
            } finally {
                setDataObj(prev => ({...prev, loading: false}))
            }
        }
        getData()
    },[])

    // useEffect(()=>{
    //     console.log(dataObj.data)
    // },[dataObj,])

    if(dataObj.loading) return <Loader />
    if(dataObj.error) return <p className='Loading-Error'>Error in loading.</p>

    return (
        <div className='Trending'>
            <h1>Trending now</h1>
            <section>
                {
                    dataObj.data.slice(0,15).map((item:any) => (
                        <TrendingCards key={item.id} data={item} />
                    ))
                }
            </section>
        </div>
    )
}

export default Trending