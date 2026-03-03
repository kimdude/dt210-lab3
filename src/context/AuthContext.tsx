import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import usePost from "../hooks/usePost";

import type { UserInterface, LoginCredentialsInterface, AuthResponseInterface, AuthContextInterface } from "../intefaces/authInterfaces";

//Creating context
const AuthContext = createContext<AuthContextInterface | null> (null);

//Creating provider
interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<UserInterface | null>(null);

    //Login user
    const login = async(credentials: LoginCredentialsInterface) => {
        const { data, error, loading } = usePost<AuthResponseInterface>("https://dt210g-lab3-api.onrender.com/user/login", credentials);

        console.log(data)
        console.log(error)
        console.log(loading)

        localStorage.setItem("token", data.token);
        setUser(data.user);
    }
    
    //Logout user
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextInterface => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}


/*
        try {
            const response = await fetch("https://dt210g-lab3-api.onrender.com/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if(!response.ok) {
                throw new Error("Inloggning misslyckades.");
            }

            const data = await response.json() as AuthResponseInterface;

            
            

        } catch(error) {
            throw error;
        }
*/

