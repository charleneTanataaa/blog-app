import {Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App(){
    const { user, logout } = useAuth();
    
    return(
        <>
        <nav>
            <Link to="/">Home</Link> | {" "}
            {user 
            ? (
                <>
                <Link to="/create">Create Post</Link>
                <button onClick={logout}>Logout</button>
                </>
            )
            : (
                <Link to="/login">Login</Link>
            )}
        </nav>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/posts/:id' element={<PostDetail/>} />
            <Route path="/login" element={<Login />}/>
            <Route path='/create' element={
                <ProtectedRoute>
                    <CreatePost />
                </ProtectedRoute>
            }
            />
        </Routes>
        </>
    )
}