
import { Link } from "react-router-dom"

import { useUserStrore } from "../store/useUserStrore"


const BottomBar = () => {
    const { user, logOut } = useUserStrore()

    return (
        <div className=" items-center flex justify-between w-full px-4 py-2 fixed z-50 bottom-0 right-0 left-0 bg-slate-800">

            <Link to={'/home'}>
                <div className=" cursor-pointer active:text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.692 19V9.946L2.604 12.25L2 11.458L12 4l4.346 3.223V5h1.885v3.639l3.788 2.819l-.603.792l-3.089-2.304V19h-4.52v-5.23h-3.615V19zm4.5-8.994h3.616q0-.704-.542-1.159q-.543-.455-1.266-.455t-1.265.454t-.543 1.16"></path></svg>
                </div>
            </Link>
            <Link to={'/profile/' + user.username}>
                <div className=" cursor-pointer active:text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58z"></path></svg>
                </div>
            </Link>
            <Link to={'/search'}>
                <div className=" cursor-pointer active:text-slate-500">
                    <svg className=" fill-slate-400" xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><circle cx="9.001" cy="6" r="4"></circle><ellipse cx="9.001" cy="17.001" rx="7" ry="4"></ellipse><path d="M21 17c0 1.657-2.036 3-4.521 3c.732-.8 1.236-1.805 1.236-2.998c0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17M18 6a3 3 0 0 1-4.029 2.82A5.7 5.7 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001"></path></svg>
                </div>
            </Link>
            <div onClick={logOut} className=" cursor-pointer active:text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 512 512"><path fill="currentColor" d="M160 256a16 16 0 0 1 16-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h160a56.06 56.06 0 0 0 56-56V272H176a16 16 0 0 1-16-16m299.31-11.31l-80-80a16 16 0 0 0-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62"></path></svg>
            </div>
        </div>
    )
}

export default BottomBar