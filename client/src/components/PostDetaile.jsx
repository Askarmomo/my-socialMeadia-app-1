
import PostComment from "./PostComment"
import { IoShareSocialOutline } from "react-icons/io5"
import { TbRefresh } from "react-icons/tb"
import { LuMessageCircle } from "react-icons/lu"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"



const PostDetaile = () => {


    const { id } = useParams()
    const [post, setpost] = useState()
    const [user, setUser] = useState()
    const [text, setText] = useState()
    const [loginUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [like, setLike] = useState(false)

    useEffect(() => {
        if (post && loginUser) {
            setLike(post.likes.includes(loginUser._id));
        }
    }, [post, loginUser]);



    // getting post by id
    useEffect(() => {

        const getPost = async () => {

            try {
                const res = await fetch('/api/post/onepost/' + id)
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                setpost(data)
            } catch (error) {
                console.log(error.message);

            }

        }
        getPost()

    }, [id, post])



    const likeAndUnlike = async () => {

        try {

            const res = await fetch('/api/post/like/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }

            console.log(data);

        } catch (error) {
            console.log(error.message);

        }

    }

    // getting user by id
    useEffect(() => {
        const getUser = async () => {
            if (post !== "undefined") {


                try {
                    const res = await fetch('/api/auth/userbyid/' + post?.postedBy)
                    const data = await res.json()
                    if (data.error) {
                        throw new Error(data.error)
                    }

                    setUser(data)
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
        getUser()

    }, [post, id])

    // reply to post

    const replyToPost = async (e) => {
        e.preventDefault()
        console.log(e);

        try {

            const res = await fetch('/api/post/reply/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setText('')
            toast.success('Replyed to post')
        } catch (error) {
            console.log(error.message);

        }

    }


    return (
        <div className=" lg:pl-[387px] px-4 lg:pr-[148px] pt-10 ">
            <div className=" border p-3 rounded-xl border-slate-600">
                <div>
                    <Link to={'/profile/' + user?.username}>
                        <div className='flex  items-center lg:space-x-[200px] justify-between py-3 px-2'>
                            <div className='flex space-x-2'>
                                <div><img src={user?.profilePic} alt='Askar' className=' w-12 h-12 rounded-full object-cover' /></div>
                                <div>
                                    <div className=" text-sm lg:text-[14px]">{user?.username}</div>
                                    <div className=" text-xs lg:text-[14px]">{user?.bio}</div>
                                </div>
                            </div>
                            <div>
                                <span className='lg:text-[14px] text-xs lg:pl-[30px]'>12m_ago</span>
                            </div>
                        </div>
                    </Link>
                    <div className=' pb-2 px-2 font-semibold'>{post?.text}</div>
                    {post?.img && <div><img src={post?.img} alt='Asakr' className=' w-[450px] h-[470px] object-cover rounded-xl' /></div>}
                    <div className=' flex justify-between items-center pt-4 px-3'>
                        <div className=' flex items-center justify-center gap-1'> <svg onClick={likeAndUnlike} className={"cursor-pointer" + like !== "undefined" && like ? 'fill-rose-500' : 'fill-slate-400'} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29c2.64-1.8 5.9-.96 7.66 1.1c1.76-2.06 5.02-2.91 7.66-1.1c1.41.96 2.28 2.59 2.34 4.29c.14 3.88-3.3 6.99-8.55 11.76z"></path></svg><div className=' text-sm'>{post?.likes.length}</div></div>
                        <div className=' flex items-center justify-center gap-1'>  <LuMessageCircle className=' text-2xl cursor-pointer' /><div className=' text-sm'>{post?.replies.length}</div></div>
                        <div className=' flex items-center justify-center gap-1'> <TbRefresh className=' text-2xl cursor-pointer' /><div className=' text-sm'>453</div></div>
                        <div> <IoShareSocialOutline className=' text-2xl cursor-pointer' /></div>
                    </div>
                    <form onSubmit={replyToPost} className=" flex items-center space-x-1 gap-2 pt-5 border-b border-slate-600 pb-2">
                        <div><img src={loginUser?.profilePic} alt='Askar' className=" w-10 h-10 rounded-full object-cover" /></div>
                        <div><input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder=" Post you reply" className=" lg:w-[340px] w-[250px] p-3 rounded-lg bg-slate-800 outline-none" /></div>
                        <div className=" py-2"><button className=" btn btn-success btn-sm text-white"> Post</button></div>
                    </form>
                    {post?.replies.map((reply) => (

                        < PostComment key={reply._id} reply={reply} />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PostDetaile