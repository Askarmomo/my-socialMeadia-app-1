import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useUserStrore } from "../store/useUserStrore";
import { IoSearch } from "react-icons/io5";

const SideBar = () => {

    const { user } = useUserStrore()
    const { logOut } = useUserStrore()

    const handleLogOut = async (e) => {
        e.preventDefault()
        await logOut()
    }

    return (
        <>
            <div className=" hidden sm:block relative basis-[300px]  lg:block border-r border-r-slate-500 ">

                <div>
                    <div className=" text-[40px] mb-10 mt-4 font-semibold text-center animate-pulse text-cyan-500 "><span className="border border-slate-600 px-4 rounded-xl ">A</span></div>

                    <div className=" space-y-4">
                        <div>
                            <Link to={'/home'}>
                                <div className=" flex items-center justify-center space-x-2 hover:bg-slate-800 mx-10 py-2 rounded-xl cursor-pointer">
                                    <div className=" text-2xl"><FaHome /></div>
                                    <div className=" text-lg sm:block hidden font-semibold">Home</div>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to={'/profile/' + user.username}>
                                <div className=" flex items-center justify-center space-x-2 hover:bg-slate-800 py-2 mx-10 rounded-xl cursor-pointer">
                                    <div className=" text-2xl"><FaUserCircle /></div>
                                    <div className=" text-lg sm:block hidden font-semibold">Profile</div>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to={'/search/'}>
                                <div className=" flex items-center justify-center space-x-2 hover:bg-slate-800 py-2 mx-10 rounded-xl cursor-pointer">
                                    <div className=" text-2xl"><IoSearch /></div>
                                    <div className=" text-lg sm:block hidden font-semibold">Profile</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className=" absolute bottom-4 mx-auto w-full space-y-2">
                    <div className=" flex space-x-4 items-center justify-center">
                        <img src={user.profilePic ? user.profilePic : `https://avatar.iran.liara.run/username?username=${user.username}`} alt='Asakr' className=" sm:block hidden h-8 w-8 rounded-badge object-cover" />
                        <h1 className="sm:block hidden">{user.username || 'Askar'}</h1>
                        <BiLogOut className=" text-2xl cursor-pointer hover:text-red-600" onClick={handleLogOut} />
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar