import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from '../api/axios';
import Register  from './Register';
import { Link } from 'react-router-dom'

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
        <div className="max-w-xl mx-auto mt-10 p-6 rounded shadow-md border border-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col p-6">
            <h2 className="text-center font-bold text-xl uppercase">Login</h2>
            
            <label htmlFor="email" className="mt-3">Email</label>
            <input 
                className="border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="mt-3">Password</label>
            <input 
                className="border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="password"
                placeholder="Password"
                autofill="false"
                onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value="Login" className="bg-blue-500 hover:bg-blue-600 hover:shadow-xl my-3 text-white py-2 rounded shadow-md"/>
            <Link to="/Register" className="border border-blue-500 text-center px-2 py-2 rounded hover:bg-blue-500 hover:text-white transition">Register</Link>
        </form>
        </div>
    )
}