import { useState } from "react"
import { Link } from "react-router-dom"
import useLogOut from "../context/useLogOut"


const BottomBar = () => {

    const [logInUser] = useState(JSON.parse(localStorage.getItem('user')))


    const { logOut } = useLogOut()
    const handleLogOut = async (e) => {
        e.preventDefault()
        await logOut()
    }

    return (
        <div className=" items-center flex justify-between w-full px-4 py-2 fixed z-50 bottom-0 bg-slate-800">

            <div className=" cursor-pointer active:text-slate-500">
                <img src={logInUser.profilePic} className="w-12 h-12 object-cover rounded-full" alt={logInUser.profilePic} />
            </div>
            <Link to={'/home'}>
                <div className=" cursor-pointer active:text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.692 19V9.946L2.604 12.25L2 11.458L12 4l4.346 3.223V5h1.885v3.639l3.788 2.819l-.603.792l-3.089-2.304V19h-4.52v-5.23h-3.615V19zm4.5-8.994h3.616q0-.704-.542-1.159q-.543-.455-1.266-.455t-1.265.454t-.543 1.16"></path></svg>
                </div>
            </Link>
            <Link to={'/profile/' + logInUser.username}>
                <div className=" cursor-pointer active:text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58z"></path></svg>
                </div>
            </Link>
            <div onClick={handleLogOut} className=" cursor-pointer active:text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 512 512"><path fill="currentColor" d="M160 256a16 16 0 0 1 16-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h160a56.06 56.06 0 0 0 56-56V272H176a16 16 0 0 1-16-16m299.31-11.31l-80-80a16 16 0 0 0-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62"></path></svg>
            </div>
        </div>
    )
}

export default BottomBar