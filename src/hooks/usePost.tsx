import { useState, useEffect } from 'react'

export default function usePost<T> (url: string, item: Object) : { data: T, error: string | null, loading: boolean } {

    const [data, setData] = useState<T>([] as T);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(item)
            });

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

    return { data, error, loading }
}