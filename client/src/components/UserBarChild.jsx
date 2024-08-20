import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'


const UserBarChild = ({ user }) => {

    const [loginUser1] = useState(JSON.parse(localStorage.getItem('user')))
    const [follow, setFollow] = useState()

    useEffect(() => {
        const settingfollow = () => {
            return setFollow(user?.followers.includes(loginUser1._id) ? true : false)
        }
        settingfollow()
    }, [follow, user])

    const handleFollowAndUnfollow = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/auth/follow/' + user?._id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            toast.success(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>

            <div className='flex justify-between space-x-16 border border-slate-600 rounded-xl px-4 py-2'>
                <div className=' flex space-x-2'>
                    <div><img src={user.profilePic} alt="Moahmmed" className=' size-10 rounded-full object-cover' /></div>
                    <div className=' font-semibold'>{user.username}</div>
                </div>
                <div>
                    <div onClick={handleFollowAndUnfollow}>{follow ? <button className=' w-24 btn btn-sm text-white'>unfollow</button> : <button className=' w-24 btn btn-accent btn-sm text-white'>Follow</button>}</div>
                </div>
            </div>
        </>
    )
}

export default UserBarChild

UserBarChild.propTypes = {
    user: PropTypes.object
}