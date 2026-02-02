import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {    
        const token = localStorage.getItem("token");
        if(token) {
            try{
                const decoded = jwtDecode(token);
                setUser({
                    id:decoded.id
                });
            } catch(err){
                console.log("Invalid token", err);
                localStorage.removeItem("token");
                setUser(null);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };
    
    return(
        <AuthContext.Provider value={{user, setUser, logout}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)