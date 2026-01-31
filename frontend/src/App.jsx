import {Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'

export default function App(){
    return(
        <>
        <nav>
            <Link to="/">Home</Link> | {" "}
            <Link to="/login">Login</Link> | {" "}
            <Link to="/create">Create Post</Link>
        </nav>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/posts/:id' element={<PostDetail/>} />
            <Route path="/login" element={<Login />}/>
            <Route path='/create' element={<CreatePost />}/>
        </Routes>
        </>
    )
}