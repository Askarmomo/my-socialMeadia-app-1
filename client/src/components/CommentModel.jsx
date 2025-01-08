import { useState } from "react"
import { usePostStore } from "../store/PostStore"
import { useUserStrore } from "../store/useUserStrore"
import PropTypes from "prop-types"
import toast from "react-hot-toast"
import { dateFormat } from "../middleware/dateFormat"


const CommentModel = ({ setHide, post }) => {

    const { posts, replyToPost } = usePostStore()
    const { user, allusers } = useUserStrore()

    const [findPost] = useState(posts.find((item) => item._id === post._id))

    const findUser = allusers.find((item) => item._id === post.postedBy)


    const [comment, setComment] = useState('')

    const replyToPostfunc = async () => {
        const data = await replyToPost(post._id, comment)
        toast.success('Replyed to post')
        setComment('')
        findPost.replies = data
    }
    
    return (
        < div className='fixed top-0 right-0 left-0 bottom-0 bg-slate-900 bg-opacity-70 z-40 bg-center' >

            <div className=" mx-5 flex sm:mx-auto bg-slate-900 sm:mt-[150px] mt-[200px] rounded max-w-4xl">
                <div>
                    <img className="w-[500px] h-[379px] hidden sm:block rounded-l object-cover" src={findPost.img || 'https://static.vecteezy.com/system/resources/previews/005/720/408/non_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'} alt="img" />
                </div>
                <div className=" w-full">
                    <div className=" flex justify-between items-center py-1 px-2 bg-slate-900 border-b border-b-slate-700">
                        <div className=" flex space-x-2 items-center">
                            <img className=" w-10 h-10 object-cover rounded-full" src={findUser?.profilePic || user.profilePic} alt="img" />
                            <div>
                                <div>   <span className=" text-sm font-semibold">{findUser?.username}</span></div>
                                <div> <span className=" text-xs capitalize">{findUser?.bio}</span></div>
                            </div>
                        </div>
                        <svg onClick={() => setHide(false)} className=" cursor-pointer fill-slate-300 hover:fill-red-500" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 1024 1024"><path d="M764.288 214.592L512 466.88L259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512L214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
                    </div>

                    <div style={{ scrollbarWidth: 'none' }} className=" h-[282px] overflow-auto p-2 no-scrollbar space-y-2">

                        {
                            post.replies.length > 0 ?
                                post.replies.map((item) => (


                                    < div key={item?._id} className=" w-fit pr-4 bg-slate-800 rounded-xl p-1 text-xs">
                                        <div className=" flex items-center space-x-4 justify-between">
                                            <div className=" flex space-x-2 items-center">
                                                <img className=" w-7 h-7 rounded-full object-cover" src={item?.userProfilePic} alt={item?.username} />
                                                <div>  <span className=" text-sm text-white">{item?.username}</span></div>
                                            </div>
                                            <span className=" text-[11px]">{dateFormat(item?.createdAt)}</span>
                                        </div>
                                        <span className=" pl-9 text-[14px]">{item?.text}</span>
                                    </div>
                                ))
                                :
                                <div className=" font-semibold text-xl pt-[110px] text-center"> <span className="opacity-70" > Don&lsquo;t have comment</span></div>
                        }

                    </div>

                    <div className=" w-full flex items-center bg-slate-900">
                        <img className=" w-10 h-9 rounded-full object-cover" src={user.profilePic} alt="img" />
                        <input value={comment} onChange={(e) => setComment(e.target.value)} className=" w-full outline-none rounded bg-slate-700 p-2 placeholder:text-sm" placeholder="Enter you comment" type="text" />
                        <svg onClick={replyToPostfunc} className=" fill-slate-600 hover:fill-slate-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path d="m3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91"></path></svg>
                    </div>
                </div>
            </div>
        </div >
    )
}


CommentModel.propTypes = {
    setHide: PropTypes.func,
    post: PropTypes.object
}

export default CommentModel