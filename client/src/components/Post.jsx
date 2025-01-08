
import toast from 'react-hot-toast'
import { IoShareSocialOutline } from "react-icons/io5"
import { LuMessageCircle } from "react-icons/lu"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from "date-fns"
import { useUserStrore } from '../store/useUserStrore';
import { usePostStore } from '../store/PostStore';
import propTypes from "prop-types"
import CommentModel from './CommentModel';

const Post = ({ post }) => {

    const { user } = useUserStrore()
    const { likeUnlike } = usePostStore()

    const [postUser, setPostUser] = useState([])

    useEffect(() => {
        const postedUser = async () => {

            try {
                const res = await fetch('/api/auth/userbyid/' + post.postedBy)
                const data = await res.json()

                if (data.error) {
                    toast.error(data.error)
                }
                setPostUser(data)
            } catch (error) {
                toast.error(error.message)
            }
        }
        postedUser()
    }, [post])

    const likeUnlikefunc = () => {
        likeUnlike(user, post)
    }


    const deletePostById = async () => {

        try {
            const res = await fetch('/api/post/' + post?._id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }
            toast.success('Post deleted successully')
        } catch (error) {
            console.log(error.message);

        }

    }

    const [hide, setHide] = useState(false)

    return (

        <div className='border border-slate-600 p-2 rounded-xl'>
            <div className='flex items-center justify-between  py-3 px-2'>
                <Link to={`/profile/${postUser?.username}`} >

                    <div className='flex items-center space-x-2'>
                        <img src={postUser?.profilePic ? postUser?.profilePic : `https://avatar.iran.liara.run/username?username=${postUser?.username}`} alt='Askar' className=' lg:w-12 lg:h-12 w-12 h-12 rounded-full object-cover' />
                        <div>
                            <div className=' text-sm lg:text-lg'>{postUser?.username}</div>
                            <div className=' text-xs lg:text-sm'>{postUser?.bio}</div>
                        </div>
                    </div>
                </Link>
                <div className=' flex items-center space-x-1'>
                    <span className='lg:text-[14px] text-sm  '>{formatDistanceToNow(post.createdAt)}</span>
                    {user.username === postUser?.username &&
                        <button onClick={deletePostById}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1.5em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 50h-42V40a22 22 0 0 0-22-22h-48a22 22 0 0 0-22 22v10H40a6 6 0 0 0 0 12h10v146a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V62h10a6 6 0 0 0 0-12M94 40a10 10 0 0 1 10-10h48a10 10 0 0 1 10 10v10H94Zm100 168a2 2 0 0 1-2 2H64a2 2 0 0 1-2-2V62h132Zm-84-104v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0m48 0v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0"></path></svg>
                        </button>
                    }
                </div>
            </div>
            <Link to={`/postdetaile/${post._id}`}>
                <div className=' pb-2 px-2 font-semibold'>{post.text}</div>
                <div><img src={post.img} alt='Askar' className={` w-full h-[470px] object-cover ${!post.img && 'hidden'} rounded-xl`} /></div>
            </Link>
            <div className=' flex justify-between items-center pt-4 px-3'>
                <div className=' flex items-center justify-center gap-1'>
                    <svg onClick={likeUnlikefunc} className={`cursor-pointer ${post.likes.includes(user._id) ? 'fill-rose-500' : 'fill-slate-400'}`} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29c2.64-1.8 5.9-.96 7.66 1.1c1.76-2.06 5.02-2.91 7.66-1.1c1.41.96 2.28 2.59 2.34 4.29c.14 3.88-3.3 6.99-8.55 11.76z"></path></svg>
                    <div className=' text-sm'>{post.likes.length}</div></div>
                <div className=' flex items-center justify-center gap-1'>
                    <LuMessageCircle onClick={() => setHide(!hide)} className=' text-2xl cursor-pointer' />
                    <div className={`${hide ? "" : "hidden"}`} >
                        <CommentModel setHide={setHide} post={post} />
                    </div>
                    <div className=' text-sm'>{post.replies.length}</div>
                </div>
                <div> <IoShareSocialOutline className=' text-2xl cursor-pointer' /></div>
            </div>
        </div >

    )
}


export default Post

Post.propTypes = {
    post: propTypes.object
}