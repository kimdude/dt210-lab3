import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

import type { UserInterface, LoginCredentialsInterface, AuthResponseInterface, AuthContextInterface } from "../intefaces/authInterfaces";

//Creating context
const AuthContext = createContext<AuthContextInterface | null> (null);

//Creating provider
interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<UserInterface | null>(null);

    //Validating token upon mounted
    useEffect(() => {
       validateToken();
    }, []);

    //Loggin user
    const login = async(credentials: LoginCredentialsInterface) => {
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
            const user = { _id: data.user_id, username: data.username }

            //Storing token & user
            localStorage.setItem("token", data.token);
            setUser(user);
            
        } catch(error) {
            throw error;
        }
    }
    
    //Logout user
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    //Validating token
    const validateToken = async () => {
        const token = localStorage.getItem("token");

        if(!token) {
            return;
        }
        
        try {   
            const result = await fetch("https://dt210g-lab3-api.onrender.com/user/validate", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-type": "application/json"
                }
            });

            if(!result.ok) {
                return logout();
            }

            const data = await result.json();
            setUser(data);

        } catch(error) {
            logout();
            console.log(error)
        }
    }

    //Wrapping routes to provide auth-functions
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