
import PostComment from "./PostComment"
import { useParams } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"
import { useUserStrore } from "../store/useUserStrore"
import { usePostStore } from "../store/PostStore"
import Post from "./Post"



const PostDetaile = () => {

    const { posts } = usePostStore()

    const { user } = useUserStrore()
    const { id } = useParams()
    const [text, setText] = useState()
    const [loginUser] = useState(user)

    let [post] = useState(posts.find((item) => item._id === id))




    return (
        <div className=" pt-10 pb-10">
            <div>
                <div>
                    <Post key={post._id} post={post} />
                    {post?.replies.map((reply) => (

                        < PostComment key={reply._id} reply={reply} />
                    ))
                    }
                </div>
            </div>
        </div >
    )
}

export default PostDetaile