import { useState, useEffect } from 'react'
import Loader from '../Loader'
import TrendingCards from './TrendingCards'

const NewReleases = () => {

    const [dataObj, setDataObj] = useState({
        data: [],
        loading: false,
        error: false
    })

    useEffect(() => {
        const getData = async () => {
            try {
                setDataObj(prev => ({ ...prev, loading: true }))
                const req = await fetch('https://proxyapi-ukea.onrender.com/new-releases')
                const res = await req.json()
                setDataObj(prev => ({ ...prev, data: res.data }))
            } catch (error) {
                console.log(error)
                setDataObj(prev => ({ ...prev, error: true }))
            } finally {
                setDataObj(prev => ({ ...prev, loading: false }))
            }
        }
        getData()
    }, [])

    useEffect(() => {
        console.log(dataObj.data)
    }, [dataObj])

    if (dataObj.loading) return <Loader />
    if (dataObj.error) return <p className='Loading-Error'>Error in loading.</p>

    return (
        <div className='NewReleases'>
            <h1>New releases</h1>
            <section>
                {
                    dataObj.data.slice(0, 15).map((item: any) => (
                        <TrendingCards key={item.id} data={item} />
                    ))
                }
            </section>
        </div>
    )
}

export default NewReleases