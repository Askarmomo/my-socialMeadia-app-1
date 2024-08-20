import express from 'express'
import AuthRoute from './Routes/AuthRoute.js'
import dotenv from 'dotenv'
import { mongoDbConnection } from './db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import postRoute from './Routes/PostRoute.js'
import { v2 as cloudinary } from 'cloudinary'
import bodyParser from 'body-parser'

dotenv.config()
const app = express()
const PORT = process.env.PORT

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use('/api/auth', AuthRoute)
app.use('/api/post', postRoute)

app.listen(PORT, () => {
    console.log('server running on port http://localhost:' + PORT);
    mongoDbConnection()
})

