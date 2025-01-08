
import Post from '../components/Post'
import { IoMdImage } from "react-icons/io";
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useUserStrore } from '../store/useUserStrore';
import { usePostStore } from '../store/PostStore';
import { NavLink } from 'react-router-dom';

const Posts = () => {


    const { user } = useUserStrore()
    const { posts, createPost } = usePostStore()

    const [show, setShow] = useState(false)

    const [text, setText] = useState('')
    const [imgurl, setImgUrl] = useState(null)


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        // console.log(file);

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onloadend = () => {

                setImgUrl(reader.result)
                setShow(true)
            }
            reader.readAsDataURL(file)
        }
        else {
            toast.error('Invalid file type', 'Please select an image file', 'error')
            setImgUrl(null)
        }
    }


    return (
        <>
            <div className=' w-full'>
                <div className=' w-full flex items- text-center justify-evenly pb-2 pt-4' >
                    <NavLink className={({ isActive }) => isActive ? 'bg-slate-800 w-full rounded' : 'w-full'} to={'/home'}>
                        <div className=' hover:bg-slate-800 p-1.5 w-full rounded font-semibold sm:text-lg cursor-pointer'>For You</div>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'bg-slate-800 w-full rounded' : 'w-full'} to={'/following'}>
                        <div className='  hover:bg-slate-800 p-1.5 w-full rounded font-semibold sm:text-lg cursor-pointer'>Following</div>
                    </NavLink>
                </div>

                <div className=' border p-2 rounded-xl border-slate-600 mb-4'>
                    <form onSubmit={(e) => { e.preventDefault(); createPost({ text, imgurl, postedBy: user._id }) }}>
                        <div className=' flex items-center'>
                            <div>
                                <img src={user.profilePic ? user.profilePic : `https://avatar.iran.liara.run/username?username=${user.username}`} alt={user.username || 'img'} className=' w-12 h-12 rounded-full object-cover' />
                            </div>
                            <div>
                                <input value={text} onChange={(e) => setText(e.target.value)} type="text" name='text' placeholder='What is happening' className=' w-full px-4 py-4 rounded outline-none bg-transparent ' />
                            </div>
                        </div>
                        {show && <div className=' pl-7 py-2'><img src={imgurl} alt="Asakr" className=' w-[400px] h-[400px] object-cover rounded-lg' /></div>}
                        <div className=' px-10 flex items-center justify-between'>
                            <div><label htmlFor="image"><IoMdImage className=' text-2xl' /></label></div>
                            <input onChange={handleImageChange} type="file" id='image' name='image' className=' hidden' />
                            <div><button className='px-4 py-1 rounded bg-cyan-500 font-semibold text-white'>Post</button></div>
                        </div>
                    </form>
                </div>

                <div className=' space-y-4'>
                    {
                        posts.map((post) => (

                            <Post key={post._id} post={post} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Posts