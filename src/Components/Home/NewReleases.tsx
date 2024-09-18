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
            // 'https://proxyapi-ukea.onrender.com/new-releases'
            try {
                setDataObj(prev => ({ ...prev, loading: true }))
                const req = await fetch('https://www.jiosaavn.com/api.php?__call=content.getAlbums&api_version=4&_format=json&_marker=0&n=50&p=1&ctx=web6dot0')
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