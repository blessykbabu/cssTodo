import mongoose from "mongoose"

export default async function connection(){
    const URL=(process.env.URL+process.env.DB_NAME)
    const db=mongoose.connect(URL)
    console.log("DATABASE CONNECTED");
    return db;
}