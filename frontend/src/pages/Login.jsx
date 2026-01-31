import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [ email, setEmail ]= useState("");
    const [ password, setPassword ] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        login(email);
        navigate("/");
    }
    return(
        <>
        <form action="" onSubmit={handleSubmit}>
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