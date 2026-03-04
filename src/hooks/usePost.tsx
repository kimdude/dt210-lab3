import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import type { PostFormInterface } from '../intefaces/PostInterfaces'


export default function usePost<T> (url: string) : { data: T, error: string | null, loading: boolean, postData: (item: PostFormInterface) => Promise<void> } {

    const [data, setData] = useState<T>([] as T);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const postData = async(item: PostFormInterface) => {
        try {
            setLoading(true);
            setError(null);

            if(!token) {
                return navigate("/login");
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
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

    return { data, error, loading, postData }
}