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

    useEffect(() => {
        checkUser();
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

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            
        } catch(error) {
            throw error;
        }
    }
    
    //Logout user
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    }

    const checkUser = () => {
        const user = localStorage.getItem("user");

        if(!user) {
            return;
        }

        const parsedUser: UserInterface = JSON.parse(user)
        setUser(parsedUser)
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