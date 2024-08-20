import { useEffect, useState } from 'react'
import UserBarChild from './UserBarChild'

const UsersBar = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {

        const getAllUsers = async () => {

            try {

                const res = await fetch('/api/auth/allusers')
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }

                setUsers(data)
            } catch (error) {
                console.log(error.message);

            }

        }
        getAllUsers()

    }, [users])

    return (
        <>
            <div className='border-l border-slate-500 pt-10 pl-3 space-y-2 hidden lg:block'>
                {
                    users.map((user) => (
                        <UserBarChild key={user._id} user={user} />
                    ))
                }
            </div>
        </>
    )
}

export default UsersBar