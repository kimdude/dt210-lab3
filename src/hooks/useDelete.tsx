import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useDelete(url: string) : { loading: boolean, deleteError: string | null, deleteData: () => void } {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteError, setdeleteError] = useState<string | null>(null);

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

            if(!result.ok) {
                throw new Error("Ett fel uppstod. Prova igen senare.");
            }

            setLoading(false);

        } catch (err) {
            throw err;
        }
    }


    return { loading, deleteError, deleteData }
}