import { useState, useEffect } from 'react'

export const useFetch = (url: string) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<any>([])

    useEffect(() => {

        const getData = async () => {
            try {
                setLoading(true);

                const req = await fetch(url)
                const res = await req.json()
                setData(res.data)
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