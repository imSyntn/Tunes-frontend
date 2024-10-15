import { useState, useEffect } from 'react'
import { ResultsInDataType, top_artists } from '../App.types'

export const useFetch = (url: string) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<ResultsInDataType[] | ResultsInDataType | top_artists[] | null>(null)

    useEffect(() => {

        const getData = async () => {
            try {
                setLoading(true);

                const req = await fetch(url)
                const res = await req.json()
                setData(res.data || res.top_artists || res)
                // || res.top_artists
                setLoading(false);

            } catch (error: any) {
                setLoading(false)
                setError(true)
            }
        }

        getData();

    }, [url])


    return { loading, error, data }
}