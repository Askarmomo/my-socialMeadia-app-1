import { Navigate, Route, Routes } from "react-router-dom"
import Posts from "./components/Posts"
import Profile from "./components/Profile"
import PostDetaile from "./components/PostDetaile"
import SingUp from './pages/SingUp/SingUp'
import SideBar from "./components/SideBar"
import UsersBar from "./components/UsersBar"
import Login from "./pages/Login/Login"
import BottomBar from "./components/BottomBar"
import { useUserStrore } from "./store/useUserStrore"
import { useEffect } from "react"
import { usePostStore } from "./store/PostStore"
import FollowingPage from "./pages/FollowingPage"
import SerachPages from "./pages/SerachPages"
import Loading from "./components/Loading"


function App() {

  const { user, getUserProfile, getAllUsers, loading } = useUserStrore()
  const { getAllPost } = usePostStore()

  useEffect(() => {
    if (user === false) {
      getUserProfile()
    }

  }, [user, getUserProfile])

  useEffect(() => {
    if (user !== false) {
      getAllUsers()
      getAllPost()
    }

  }, [getAllPost, getAllUsers, user])


  return (
    <div className=" bg-slate-950 flex items-center justify-center min-h-screen">
      <div className={` ${!user ? "" : 'flex h-screen justify-center w-full'}`}>
        {user ? < SideBar /> : null}
        {loading && <Loading />}
        <div className={` ${!user ? "" : 'basis-[750px] lg:px-[80px] pb-20 sm:px-10 px-4 overflow-x-auto'}`} style={{ scrollbarWidth: 'none' }}>
          <Routes>
            <Route path="/" element={user ? <Navigate to={'/home'} /> : <Login />} />
            <Route path="/login" element={user ? <Navigate to={'/home'} /> : <Login />} />
            <Route path="/singup" element={user ? <Navigate to={'/home'} /> : <SingUp />} />
            <Route path="/home" element={user ? <Posts /> : <Navigate to={'/'} />} />
            <Route path="/following" element={user ? <FollowingPage /> : <Navigate to={'/'} />} />
            <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to={'/'} />} />
            <Route path="/postdetaile/:id" element={user ? <PostDetaile /> : <Navigate to={'/'} />} />
            <Route path="/search" element={user ? <SerachPages /> : <Navigate to={'/'} />} />
          </Routes>
        </div>
        {user ? <UsersBar /> : null}
        {user ? <div className=" sm:hidden block"> <BottomBar /></div> : null}

      </div >
    </div>
  )
}

export default App
