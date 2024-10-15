import { useState, useEffect } from 'react'
import { useFetch } from '../../Utils/useFetch'
import Loader from '../Loader'
import TrendingCards from './TrendingCards'

const NewReleases = () => {

    // const [dataObj, setDataObj] = useState({
    //     data: [],
    //     loading: false,
    //     error: false
    // })

    const { loading, error, data } = useFetch('http://localhost:8000/api/trending-now')

    // useEffect(() => {
    // const getData = async () => {
    //     // 'https://proxyapi-ukea.onrender.com/new-releases'
    //     const fetchUrl = 'http://localhost:8000/api/new-releases'
    //     try {
    //         setDataObj(prev => ({ ...prev, loading: true }))
    //         const req = await fetch(fetchUrl)
    //         const res = await req.json()
    //         setDataObj(prev => ({ ...prev, data: res.data }))
    //     } catch (error) {
    //         console.log(error)
    //         setDataObj(prev => ({ ...prev, error: true }))
    //     } finally {
    //         setDataObj(prev => ({ ...prev, loading: false }))
    //     }
    // }
    // getData()
    // }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    if (loading) return <Loader />
    if (error) return <p className='Loading-Error'>Error in loading.</p>

    return (
        <div className='NewReleases'>
            <h1>New releases</h1>
            <section>
                {
                    (data && Array.isArray(data)) && (
                        data.slice(0, 15).map((item: any) => (
                            <TrendingCards key={item.id} data={item} />
                        ))
                    )
                }
            </section>
        </div>
    )
}

export default NewReleases