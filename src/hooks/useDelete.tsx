import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useDelete(url: string) : { loading: boolean, error: string | null, deleteData: () => void } {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const deleteData = async() => {

        setLoading(true);

        try {
            const result = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if(result.ok) {
                const data = await result.json();
                console.log(data)
            }

            setLoading(false);

        } catch (err) {
            throw err;
        }
    }


    return { loading, error, deleteData }
}