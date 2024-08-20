import express from 'express'
import { protuctRoute } from '../middleware/protuctRoute.js'
import { createPost, deletePost, followingPosts, getPost, getpostById, getUserPost, liekUnLikePost, replyToPost } from '../controllers/PostController.js'

const postRoute = express.Router()
postRoute.get('/onepost/:id',getpostById)
postRoute.get('/followingpost', protuctRoute, followingPosts)
postRoute.get('/user/:username', getUserPost)
postRoute.get('/allpost', getPost)
postRoute.post('/create', protuctRoute, createPost)
postRoute.put('/like/:id', protuctRoute, liekUnLikePost)
postRoute.put('/reply/:id', protuctRoute, replyToPost)
postRoute.delete('/:id', protuctRoute, deletePost)

export default postRoute