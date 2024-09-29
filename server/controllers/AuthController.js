import User from "../models/AuthModel.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js";
import { v2 as cloudinary } from 'cloudinary'

// completed
// completed
export const singUpUser = async (req, res) => {
    const { username, email, password, profilePic } = req.body

    try {
        const exitingUser = await User.findOne({ email })

        if (exitingUser) {
            return res.status(400).json({ error: 'user already exist' })
        }

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password, salt)

        const createdUser = await User.create({
            username,
            email,
            password: hashPassword,
            profilePic: profilePic || `https://avatar.iran.liara.run/username?username=${username}`
        })

        if (createdUser) {
            generateToken(createdUser._id, res)
            return res.status(200).json(createdUser)
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in singUpUser', error.message);
    }


}

// completed
export const logInUser = async (req, res) => {

    try {
        const { email, password } = req.body
        if (email.length === 0 || password.length === 0) {
            return res.status(400).json({ error: 'fill all the reuqired field' })
        }

        const user = await User.findOne({ email })
        const isValidPassword = await bcrypt.compare(password, user?.password || "")

        if (!user || !isValidPassword) {
            return res.status(400).json({ error: 'invalid email or password' })
        }

        generateToken(user._id, res) 

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            bio: user.bio,
        })


    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in logIn');
    }

}

// completed
export const logOutUser = async (req, res) => {

    try {
        res.cookie('token', "", { maxAge: 1 })
        res.status(200).json({ message: 'Logout successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in logOutUser', error.message);
    }
}


export const fallowUnFallowUser = async (req, res) => {

    try {
        const id = req.params.id
        const currentUserId = req.user._id
        const userToModify = await User.findOne({ _id: id })
        const currentUser = await User.findOne({ _id: currentUserId })

        if (id === currentUser._id.toString()) {
            return res.status(400).json({ error: "you can't follow or unfollow yourself " })
        }

        if (!currentUser || !userToModify) {
            return res.status(400).json({ error: 'user not found' })
        }

        const isfollowing = currentUser.following.includes(userToModify._id)

        if (isfollowing) {
            await User.findByIdAndUpdate(currentUser._id, { $pull: { following: userToModify._id } })
            await User.findByIdAndUpdate(userToModify._id, { $pull: { followers: currentUser._id } })
            res.status(200).json({ message: 'Unfollowed successfully' })
        } else {
            await User.findByIdAndUpdate(currentUser._id, { $push: { following: userToModify._id } })
            await User.findByIdAndUpdate(userToModify._id, { $push: { followers: currentUser._id } })
            res.status(200).json({ message: 'Followed successfully' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in fallowUnFallowUser', error.message);
    }

}

export const updateUser = async (req, res) => {

    try {
        const { username, email, password, bio } = req.body
        let { profilePic } = req.body

        const id = req.params.id
        const currentUserId = req.user._id

        const currentUser = await User.findById(currentUserId)
        if (!currentUser) {
            return res.status(400).json({ error: 'user not found' })
        }

        if (id !== currentUser._id.toString()) {
            return res.status(400).json({ message: " you can't update others profile" })
        }

        if (password) {
            const hashPassword = await bcrypt.hash(password, 10)
            currentUser.password = hashPassword

        }
        if (profilePic) {
            if (currentUser.profilePic) {
                await cloudinary.uploader.destroy(currentUser.profilePic.split('/').pop().split('.')[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic)
            profilePic = uploadedResponse.secure_url
        }

        currentUser.username = username || currentUser.username
        currentUser.email = email || currentUser.email
        currentUser.profilePic = profilePic || currentUser.profilePic
        currentUser.bio = bio || currentUser.bio

        await currentUser.save()
        currentUser.password = null
        res.status(200).json(currentUser)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in updateUser', error.message);
    }

}

export const getOneuser = async (req, res) => {

    const { username } = req.params
    try {
        const user = await User.findOne({ username }).select('-password').select('-updatedAt')

        if (!user) {
            return res.status(400).json({ error: 'user not found' })
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }

}

export const getUserById = async (req, res) => {

    const id = req.params.id

    try {

        if (id !== "undefined") { 

            const user = await User.findOne({ _id: id }).select('-password')
            if (!user) {
                return res.status(400).json({ error: 'user not found' })
            }
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json({ error: 'internal server error' })
        console.log('Error in getUserById' + error.message);

    }
}

export const allUsers = async (req, res) => {

    try {

        const loginUserId = req.user._id
        const users = await User.find().select('-password')
        if (!users) {
            throw new Error('users not found')
        }

        // filtering user without login user
        const filteredUsers = []
        users.forEach((currentUser) => {
            if (currentUser._id.toString() !== loginUserId.toString()) {
                filteredUsers.push(currentUser)

            }
        })

        return res.status(200).json(filteredUsers)

    } catch (error) {
        console.log('Error in allUser', error.message);
        res.status(500).json({ error: 'Internal server error' })

    }

}