import jwt from 'jsonwebtoken'
import User from '../models/AuthModel.js'

export const protuctRoute = async (req, res, next) => {

    try {
        const token = req.cookies.token

        if (!token) {
            res.status(400).json({ error: "Unothurized user" })
        }

        const decoded = jwt.decode(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        req.user = user

        next()
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in protuctRoute', error.message);
    }

}
