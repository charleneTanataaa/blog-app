import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const login = (email) => {
        const fakeUser = {
            id: '123',
            email
        }
        setUser(fakeUser);
    }

    const logout = () => {
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)