import express from 'express'
import { allUsers, fallowUnFallowUser, getOneuser, getUserById, logInUser, logOutUser, singUpUser, updateUser } from '../controllers/AuthController.js'
import { protuctRoute } from '../middleware/protuctRoute.js'

const AuthRoute = express.Router()

AuthRoute.post('/singup', singUpUser)
AuthRoute.post('/login', logInUser)
AuthRoute.post('/logout', logOutUser)
AuthRoute.post('/follow/:id', protuctRoute, fallowUnFallowUser)
AuthRoute.put('/updateuser/:id', protuctRoute, updateUser)
AuthRoute.get('/userbyid/:id', getUserById)
AuthRoute.get('/user/:username', getOneuser)
AuthRoute.get('/allusers', protuctRoute, allUsers)


export default AuthRoute