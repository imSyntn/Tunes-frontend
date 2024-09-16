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
            try {
                setDataObj(prev => ({...prev, loading: true}))
                const req = await fetch('https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0')
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