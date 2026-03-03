import { useState, useEffect } from 'react'

export default function useGet<T> (url: string) : { data: T, error: string | null, loading: boolean, fetchData: () => void} {

    const [data, setData] = useState<T>([] as T);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url);

            if(response.ok) {
                const result = await response.json();
                setData(result);
            }
            
        } catch(error) {
            setError("Ett fel uppstod. Prova igen senare.");

        } finally {
            setLoading(false);

        }
    }

    return { data, error, loading, fetchData }
}