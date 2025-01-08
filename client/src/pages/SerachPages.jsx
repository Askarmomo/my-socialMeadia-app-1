
import { GoSearch } from "react-icons/go";
import { useUserStrore } from "../store/useUserStrore";

import SearchUsers from "../components/SearchUsers";
import { useState } from "react";



const SerachPages = () => {


    const { allusers } = useUserStrore()
    console.log(allusers);

    const [search, setSearch] = useState("")

    const filteredUsers = allusers.filter((user) => user.username.toLowerCase().includes(search.toLocaleLowerCase())) || allusers

    return (
        <>
            <div className=" mt-10">

                <div className=" flex items-center">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} className=" w-full p-2 rounded-l outline-none bg-slate-800" type="text" placeholder="Search users" />
                    <button className=" bg-slate-600 hover:bg-slate-700 p-2 rounded-r"><GoSearch style={{ fontSize: "24px" }} /></button>
                </div>

                <div className=" mt-[50px] space-y-5">
                    <span className=" font-semibold text-xl"> Users</span>

                    {
                        filteredUsers.length > 0 ?

                            filteredUsers.map((userData) => (

                                <SearchUsers key={userData._id} userData={userData} />
                            ))
                            :
                            allusers.map((userData) => (

                                <SearchUsers key={userData._id} userData={userData} />
                            ))
                    }
                </div>

            </div >
        </>
    )
}

export default SerachPages