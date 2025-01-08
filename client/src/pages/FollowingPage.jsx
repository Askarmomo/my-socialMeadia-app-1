import { NavLink } from "react-router-dom"
import Post from "../components/Post"
import { usePostStore } from "../store/PostStore"
import { useUserStrore } from "../store/useUserStrore"

const FollowingPage = () => {

    const { posts } = usePostStore()
    const { user } = useUserStrore()

    const filteredPost = posts.filter((item) => user.following.includes(item.postedBy))

    return (
        <div>

            <div className=' w-full flex items- text-center justify-evenly pb-2 pt-4' >
                <NavLink className={({ isActive }) => isActive ? 'bg-slate-800 w-full rounded' : ' w-full'} to={'/home'}>
                    <div className=' hover:bg-slate-800 p-1.5 w-full rounded font-semibold sm:text-lg cursor-pointer'>For You</div>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? 'bg-slate-800 w-full rounded' : ' w-full'} to={'/following'}>
                    <div className='  hover:bg-slate-800 p-1.5 w-full rounded font-semibold sm:text-lg cursor-pointer'>Following</div>
                </NavLink>
            </div>

            <div className=' space-y-4'>
                {
                    filteredPost.map((post) => (

                        <Post key={post._id} post={post} />
                    ))
                }
            </div>
        </div>
    )
}

export default FollowingPage