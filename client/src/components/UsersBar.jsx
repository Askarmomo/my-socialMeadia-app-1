
import UserBarChild from './UserBarChild'
import { useUserStrore } from '../store/useUserStrore'

const UsersBar = () => {

    const { allusers } = useUserStrore()

    return (

        <div className=' basis-[100px] hidden lg:block border-l border-slate-500 px-2 space-y-2 pt-20'>
            {
                allusers.map((userData) => (
                    <UserBarChild key={userData._id} userData={userData} />
                ))
            }
        </div>

    )
}

export default UsersBar