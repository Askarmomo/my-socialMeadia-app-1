import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
// import img from '../assets/WhatsApp Image 2024-01-28 at 18.41.53_bb5b3c31.jpg'
import { Link } from "react-router-dom";

import useLogOut from "../context/useLogOut";
import { useState } from "react";

const SideBar = () => {

    const loginuser = JSON.parse(localStorage.getItem('user'))
    const [loginUser] = useState(loginuser)

    const { loading, logOut } = useLogOut()
    const handleLogOut = async (e) => {
        e.preventDefault()
        await logOut()
    }

    return (
        <>
            <div className=" hidden lg:block p-4 space-y-10 px-10 border-r-[1px] border-slate-500 min-h-screen fixed top-0">
                <div className=" text-[40px] font-semibold text-center animate-pulse text-cyan-500 "><span className="border border-slate-600 px-4 rounded-xl ">A</span></div>
                <div className=" space-y-5">
                    <div>
                        <Link to={'/home'}>
                            <div className=" flex items-center space-x-2 hover:bg-slate-700 px-10 py-2 rounded-xl cursor-pointer">
                                <div className=" text-2xl"><FaHome /></div>
                                <div className=" text-lg font-semibold">Home</div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/profile/' + loginUser.username}>
                            <div className=" flex items-center space-x-2 hover:bg-slate-700 px-10 py-2 rounded-xl cursor-pointer">
                                <div className=" text-2xl"><FaUserCircle /></div>
                                <div className=" text-lg font-semibold">Profile</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className=" fixed bottom-10 flex space-x-4 items-center px-4">
                        <img src={loginUser.profilePic ? loginUser.profilePic : `https://avatar.iran.liara.run/username?username=${loginUser.username}`} alt='Asakr' className=" h-10 w-10 rounded-badge object-cover" />
                        <h1>{loginUser.username || 'Askar'}</h1>
                        <BiLogOut className=" text-2xl cursor-pointer" onClick={handleLogOut} />
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar