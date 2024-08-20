/* eslint-disable */
import Post from '../components/Post'
// import img from '../assets/WhatsApp Image 2024-01-28 at 18.41.53_bb5b3c31.jpg'
import { IoMdImage } from "react-icons/io";
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const Posts = () => {

    const loginUser = JSON.parse(localStorage.getItem('user'))
    const show = false

    const [posts, setPosts] = useState([])
    const [text, setText] = useState('')
    const [postedBy, setPostedBy] = useState(loginUser._id)
    const [imgurl, setImgUrl] = useState(null)




    const handleImageChange = (e) => {
        const file = e.target.files[0]
        console.log(file);

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onloadend = () => {

                setImgUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
        else {
            toast.error('Invalid file type', 'Please select an image file', 'error')
            setImgUrl(null)
        }
    }

    const createPost = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, img: imgurl, postedBy })
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            toast.success('post created successfully')
            setText('')
        } catch (error) {
            toast.error(error.message)
        }

    }

    // getting all posts
    useEffect(() => {

        const getAllPost = async () => {

            try {
                const res = await fetch(`/api/post/allpost`)
                const data = await res.json()
                setPosts(data)

            } catch (error) {
                toast.error(error.message)
            }

        }
        getAllPost()
    })



    return (
        <>
            <div className=' lg:px-40 px-4 lg:pl-96 pt-1 '>
                <div className=' flex items-center justify-between px-20 pb-2 pt-4 border-b border-slate-600 mb-4' >
                    <div className=' font-semibold text-lg border-b-2 border-cyan-400 cursor-pointer'>For You</div>
                    <div className=' font-semibold text-lg cursor-pointer'>Following</div>
                </div>

                <div className=' border p-2 rounded-xl border-slate-600 mb-4'>
                    <form onSubmit={createPost}>
                        <div className=' flex items-center'>
                            <div>
                                <img src={loginUser.profilePic ? loginUser.profilePic : `https://avatar.iran.liara.run/username?username=${loginUser.username}`} alt="Asakr" className=' w-12 h-12 rounded-full object-cover' />
                            </div>
                            <div>
                                <input value={text} onChange={(e) => setText(e.target.value)} required type="text" name='text' placeholder='What is happening' className=' w-full px-4 py-4 rounded outline-none bg-transparent ' />

                            </div></div>
                        {show && <div className=' pl-7 py-2'><img src={img} alt="Asakr" className=' w-[400px] h-[400px] object-cover rounded-lg' /></div>}
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

                            <Post key={post._id} post={post} postedBy={post.postedBy} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Posts