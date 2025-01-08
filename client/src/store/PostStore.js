import toast from "react-hot-toast";
import { create } from "zustand";



export const usePostStore = create((set) => (
    {
        posts: [],
        loading: false,
        postedUserData: null,
        onePost: {},
        getAllPost: async () => {
            set({ loading: true })
            try {
                const res = await fetch(`/api/post/allpost`)
                const data = await res.json()

                if (!data.error) {
                    set({ posts: data })
                } else {
                    toast.error(data.error)
                }
            } catch (error) {
                toast.error(error)
            } finally {
                set({ loading: false })
            }

        },
        createPost: async ({ text, imgurl, postedBy }) => {
            if (text.lennth > 1 && imgurl && postedBy) {
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
                } catch (error) {
                    toast.error(error.message)
                }

            } else {
                toast.error('fill all the required field')
            }

        },
        likeUnlike: async (user, post) => {

            set({ loading: true })
            try {

                const res = await fetch('/api/post/like/' + post._id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                })
                const isLiked = post.likes.includes(user._id)

                if (isLiked) {
                    const filteredLikes = post.likes.filter((id) => id !== user._id)
                    post.likes = filteredLikes
                } else {
                    post.likes.push(user._id)
                }
                const data = await res.json()

                if (data.error) {
                    toast.error(data.error)
                }


            } catch (error) {
                toast.error(error.message)
            } finally {
                set({ loading: false })
            }
        },
        replyToPost: async (id, text) => {

            try {

                const res = await fetch('/api/post/reply/' + id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text })
                })
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                } else {
                    return data
                }

            } catch (error) {
                console.log(error.message);

            }
        }
    }
))

