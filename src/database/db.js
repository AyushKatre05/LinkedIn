import mongoose from "mongoose";

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const dbConnection = mongoose.connection
        dbConnection.on('db connected',()=>{
            console.log("connect to mongoDB")
        })
        dbConnection.on('error',(error)=>{
            console.log("connection failed "+error)
        })
    } catch (error) {
        console.log("Error in Database",error)
    }
}

export default connectDb