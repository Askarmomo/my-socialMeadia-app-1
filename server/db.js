import mongoose from "mongoose";



export const mongoDbConnection = () => {

    try {
        mongoose.connect(process.env.MONGO_DB_URI)
        console.log('MongoDb connected successfully');
    } catch (error) {
        console.log('Error in mongoDbConnection ', error.message);
    }

}