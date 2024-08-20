import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' })

    res.cookie('token', token, { httpOnly: true, maxAge: 35 * 24 * 60 * 60 * 1000, sameSide: 'strickt' })

    return token

}