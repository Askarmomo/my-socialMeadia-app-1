import mongoose from "mongoose";
import User from "../models/AuthModel.js";
import Post from "../models/PostModel.js";
import { v2 as cloudinary } from 'cloudinary'


export const getpostById = async (req, res) => {


    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid or missing User ID");
        } else {

            const post = await Post.findOne({ _id: id })

            if (!post) {
                return res.status(400).json({ error: 'post not found' })
            }
            // console.log(post);   

            res.status(200).json(post)
        }

    } catch (error) {
        console.log('Error in getPostById : ', error.message);
        res.status(500).json({ error: 'Internal server error' })
    }

}

export const createPost = async (req, res) => {

    try {
        const { postedBy, text } = req.body
        let { img } = req.body

        const loginUser = req.user._id.toString()
        if (!postedBy || !text) {
            return res.status(400).json({ error: 'pleas fill all the required field' })
        }
        const user = await User.findById(postedBy)

        if (!user) {
            return res.status(400).json({ error: 'user not found' })
        }
        if (user._id.toString() !== loginUser) {
            return res.status(400).json({ error: 'unothrized to create post' })
        }
        if (text.length > 500) {
            return res.status(400).json({ error: 'text must be lessthen 500 cheracters' })
        }
        if (img) {
            const uploaderResponse = await cloudinary.uploader.upload(img,)
            img = uploaderResponse.secure_url
        }
        // upload photo in cloudinary here...

        const newPost = await Post.create({ postedBy, text, img })

        res.status(200).json('post created successfully')

    } catch (error) {
        console.log('Error in createPost', error.message);
        res.status(500).json({ error: 'Internal server error' })
    }

}

// import { v2 as cloudinary } from 'cloudinary';

// (async function () {


//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();


export const getPost = async (req, res) => {

    try {
        // const id = req.params.id
        const post = await Post.find().sort({ createdAt: -1 })
        if (!post) {
            return res.status(400).json({ error: 'post not found' })
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ message: 'Internal server error' })
        console.log('Error in getPost', error.message);
    }

}

export const deletePost = async (req, res) => {

    try {
        const id = req.params.id
        const logInUser = req.user._id.toString()
        const post = await Post.findById(id)
        if (!post) {
            res.status(400).json({ error: 'post not found' })
        }
        if (post.postedBy.toString() !== logInUser) {
            res.status(400).json({ error: " you can't delete others post" })
        }
        // delete photo from cloudinary
        await Post.findByIdAndDelete(id)
        res.status(200).json({ message: 'post deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in deletePost ', error.message);
    }

}

export const liekUnLikePost = async (req, res) => {

    try {
        const postId = req.params.id
        const loginuser = req.user._id
        const post = await Post.findById(postId)

        if (!post) {
            res.status(400).json({ error: 'post not found' })
        }
        const isLiked = post.likes.includes(loginuser)
        if (isLiked) {
            const post = await Post.findByIdAndUpdate({ _id: postId }, { $pull: { likes: loginuser } })
            res.status(200).json({ message: 'Unliked successfully' })
        } else {
            const post = await Post.findByIdAndUpdate({ _id: postId }, { $push: { likes: loginuser } })
            res.status(200).json({ message: 'Liked successfully' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in likeUnlikePost ', error.message);
    }

}

export const replyToPost = async (req, res) => {
    try {
        const { text } = req.body
        const postId = req.params.id
        const loginUser = req.user._id
        const username = req.user.username
        const profilePic = req.user.profilePic
        if (!text) {
            res.status(400).json({ error: 'fill the required field' })
        }

        const post = await Post.findById(postId)
        if (!post) {
            res.status(400).json({ error: 'post not found' })
        }

        post.replies.push({
            userId: loginUser,
            text: text,
            userProfilePic: profilePic,
            username: username
        })
        await post.save()
        res.status(200).json(post.replies)

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in replyToPost ', error.message);
    }
}

export const followingPosts = async (req, res) => {

    try {

        const logInUser = req.user._id
        const user = await User.findById(logInUser)
        if (!user) {
            res.status(400).json({ error: "user not found" })
        }

        const following = user.following
        const post = await Post.find({ postedBy: { $in: following } })

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in followingPost', error.message);
    }

}

export const getUserPost = async (req, res) => {

    try {
        const { username } = req.params
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(400).json({ error: 'user not found' })
        }
        const post = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 })
        if (!post) {
            return res.status(400).json({ error: 'post not found' })
        }

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in getUserPost', error.message);
    }

}
