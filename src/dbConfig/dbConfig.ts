import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

    connection.on("connection", ()=>{
        console.log("Database connected")
    }) 
    connection.on("error", (err)=>{
        console.log("Database connection error. "+err)
        process.exit()
    })
    }catch(err){
        console.log("Something went wrong")
        console.log(err)
    }
}