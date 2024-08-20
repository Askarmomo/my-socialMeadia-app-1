import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profilePic: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    followers: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    }

})

const User = mongoose.model('user', userSchema)

export default User;