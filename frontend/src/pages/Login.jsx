import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from '../api/axios';

export default function Login(){
    const [ email, setEmail ]= useState("");
    const [ password, setPassword ] = useState("");
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await api.post("/auth/login", {email, password});
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
        } catch (err){
            console.error(err.response?.data?.message || err.message);
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            
            <label htmlFor="email">Email</label>
            <input 
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value="Login"/>
        </form>
        </>
    )
}