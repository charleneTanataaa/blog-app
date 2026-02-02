import {Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PostDetail from './pages/PostDetail'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import "./index.css"
import EditPost from './pages/EditPost'

export default function App(){
    const { user, logout } = useAuth();
    
    return(
        <>
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            className=" font-semibold hover:underline"
            to="/"
          >
            Home
          </Link>

          {user && (
            <Link
              className=" font-semibold hover:underline"
              to="/create"
            >
              Create Post
            </Link>
          )}
        </div>

        <div>
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/posts/:id' element={<PostDetail/>} />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/posts/:id/edit" element={
                <ProtectedRoute>
                    <EditPost />
                </ProtectedRoute>
            }/>
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