import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import connection from './connection.js';
import router from './router.js';

const app=express();

env.config();

app.use(cors());
app.use(express.json())
app.use("/api",router)

connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("SERVER STARTED");
    })
}).catch((error)=>{
    console.log(error);
})