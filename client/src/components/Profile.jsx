
import { useEffect, useState } from 'react'
import Post from './Post'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'


const Profile = () => {

    const loginUser = JSON.parse(localStorage.getItem('user'))

    const { username } = useParams()
    const [username1, setUserName] = useState(username)
    const [user, setUser] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [posts, setPosts] = useState([])
    const [loginUser1] = useState(loginUser)
    const navigate = useNavigate()


    // 1. getting user by they'r name
    useEffect(() => {
        const userProfile = async () => {

            try {
                const res = await fetch('/api/auth/user/' + username1)
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                setUser(data)
                setUserName(username1)
            } catch (error) {
                toast.error(error.message)
            }
        }
        userProfile()
    }, [username1, user])

    // 2. getting user posts by they'r name
    useEffect(() => {

        const getLoginUserPost = async () => {
            try {
                const res = await fetch('/api/post/user/' + username1)
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                setPosts(data)
            } catch (error) {
                toast.error(error.message)

            }

        }
        getLoginUserPost()
    }, [posts, username1])

    // 3. update user profile here
    const [inputs, setInputs] = useState({
        username: '',
        bio: '',
        profilePic: '',
        password: ''
    })

    // handle image for update
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onloadend = () => {

                setImgUrl(reader.result)
            }
            reader.readAsDataURL(file)

        } else {
            toast.error('Invalid file type', 'Please select an image file', 'error')
            setImgUrl(null)
        }

    }

    // 4. update profile
    const updateProfile = async () => {

        try {

            const res = await fetch('/api/auth/updateuser/' + loginUser1._id, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ ...inputs, profilePic: imgUrl })
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem('user', JSON.stringify(data))

            navigate('/home/')
            location.reload()
        } catch (error) {
            console.log(error);

            // toast.error(error.message)
        }
    }

    // 5. follow unfollow api call here
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
            console.log(data);

        } catch (error) {
            toast.error(error.message)
        }
    }



    return (
        <div className=" lg:pl-[400px] px-4 lg:pr-36 pt-5 mb-20">
            <div className=' flex justify-between items-center sm:space-x-[150px]'>
                <div>
                    <div>
                        <div className=' relative max-w-xl'>
                            <img src={user?.profilePic ? user?.profilePic : `https://avatar.iran.liara.run/username?username=${user?.username}`} alt="Asakr" className=' w-40 h-40 rounded-full object-cover border-4 border-slate-600' />
                            <div className=' absolute bottom-2 right-4'><svg onClick={() => document.getElementById('my_modal_2').showModal()} className='fill-teal-300 border border-slate-400 cursor-pointer rounded-full' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2m-11-4l2.03 2.71L16 11l4 5H8zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6z"></path></svg></div>
                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box w-[400px] h-[400px]">
                                    <h3 className="font-bold pb-2">Update Image</h3>
                                    <img src={user?.profilePic} className=' w-full h-[320px] object-cover' />
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                    </div>
                    <div className=' font-semibold text-2xl'>{user?.username}</div>
                    <div>{user?.bio}</div>
                    <div>
                        <div className=' flex items-center justify-center space-x-4 pt-5'>
                            <div className=' flex items-center justify-center space-x-1'><div>Following</div> <div className=' font-semibold'>{user?.following.length}</div></div>
                            <div className=' flex items-center justify-center space-x-1'><div>Followers</div> <div className=' font-semibold'>{user?.followers.length}</div></div>
                        </div>
                    </div>

                    <div className={`pt-5 ${user?.username !== loginUser1.username ? ' block' : 'hidden'}`}><button onClick={handleFollowAndUnfollow} className={` px-2 py-1 rounded-xl ${follow === true ? 'bg-transparent border border-slate-500 ' : 'bg-sky-500'} text-white font-semibold`}>{follow === true ? 'unfollow' : 'Follow'}</button></div>
                </div>
                <div>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    {loginUser1._id === user?._id && <button className="btn btn-sm border-slate-400" onClick={() => document.getElementById('my_modal_3').showModal()}>Edit Profile</button>}
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog" className=' space-y-4'>
                                <h3 className="font-bold text-lg">Update Profile</h3>
                                <div className=' space-y-4'>
                                    <div><input value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} className='input input-info  w-full bg-slate-800' type="text" placeholder='username' /></div>
                                    <div><input value={inputs.bio} onChange={(e) => setInputs({ ...inputs, bio: e.target.value })} className='input input-info  w-full bg-slate-800' type="text" placeholder='bio' /></div>
                                    <div><input value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} className='input input-info  w-full bg-slate-800' type="text" placeholder='password' /></div>
                                    <div>
                                        <div className=' lg:pl-52 pl-[140px]'>
                                            <label htmlFor="image">
                                                <svg className=' cursor-pointer hover:fill-cyan-600 fill-cyan-500 border rounded-xl border-cyan-600 py-1 px-2' xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><path d="m7 15l4.5-6l3.5 4.5l2.5-3L21 15m1-11h-8l-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M2 6H0v14a2 2 0 0 0 2 2h18v-2H2z"></path></svg>
                                            </label>
                                        </div>
                                        <input value={inputs.profilePic} onChange={handleImageChange} id='image' className='input file-input-info hidden  w-full bg-slate-800' type="file" placeholder='profilePic' />
                                    </div>
                                    <div className=' text-right'><button type='submit' onClick={updateProfile} className=' btn btn-sm text-white btn-info'>Update</button></div>
                                </div>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                            </form>
                        </div>
                    </dialog>
                </div>
            </div>

            <div className=' pt-10 space-y-4'>
                <div className=' border-b border-slate-600 text-lg font-semibold'>Posts</div>
                {
                    posts.map((post) => (

                        <Post key={post._id} post={post} postedBy={post.postedBy} />
                    ))
                }
            </div>
        </div>
    )
}

export default Profile