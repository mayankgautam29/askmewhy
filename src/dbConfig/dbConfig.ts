import mongoose from "mongoose";
export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected',() => {
            console.log("Database connected successfully");
        })
        connection.on('error',() => {
            console.log("Some error connecting the database");
        })
    } catch (error:any) {
        console.log(error.message)
    }
}