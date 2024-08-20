import { Navigate, Route, Routes } from "react-router-dom"
import Posts from "./components/Posts"
import Profile from "./components/Profile"
import PostDetaile from "./components/PostDetaile"
import SingUp from './pages/SingUp/SingUp'
import SideBar from "./components/SideBar"
import UsersBar from "./components/UsersBar"
import Login from "./pages/Login/Login"
import { useState } from "react"
import BottomBar from "./components/BottomBar"
// import { useAuthContext } from "./context/authContext"

function App() {

  const loginuser = JSON.parse(localStorage.getItem('user'))
  const [user] = useState(loginuser)
  // const { user } = useAuthContext()
  // const [log, setLog] = useState(user)
  // const user = log


  return (
    <div className=" min-h-screen mx-auto">
      <div className={user ? ' relative lg:flex' : ''}>
        {user ? < SideBar /> : null}
        <Routes>
          <Route path="/" element={user ? <Navigate to={'/home'} /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to={'/home'} /> : <Login />} />
          <Route path="/singup" element={user ? <Navigate to={'/home'} /> : <SingUp />} />
          <Route path="/home" element={user ? <Posts /> : <Navigate to={'/'} />} />
          <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to={'/'} />} />
          <Route path="/postdetaile/:id" element={user ? <PostDetaile /> : <Navigate to={'/'} />} />
        </Routes>
        {user ? <UsersBar /> : null}
        {user ? <div className=" lg:hidden"> <BottomBar /></div> : null}

      </div >
    </div>
  )
}

export default App
