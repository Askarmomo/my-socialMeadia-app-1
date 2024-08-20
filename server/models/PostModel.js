import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        mimLength: 10,
        required: true
    },
    img: {
        type: String,
        default: ""
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    replies: [{

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        userProfilePic: {
            type: String
        },
        username: {
            type: String
        }
    }]

}, { timestamps: true })

const Post = mongoose.model('post', postSchema)

export default Post

