import { useState, useEffect } from 'react'

export const useFetch = (url: string) => {

    const [loading, setLoading] = useState<Boolean>(false)
    const [error, setError] = useState<String>('')
    const [data, setData] = useState<any>([])

    useEffect(() => {

        const getData = async() => {
            try {
                setLoading(true);
                const req = await fetch(url)
                const res = await req.json()
                setData(res.data)
                
            } catch (error:any) {
                setLoading(false)
                setError(error.message)
            }
        }
        
        getData();

    }, [url])


    return { loading, error, data }
}