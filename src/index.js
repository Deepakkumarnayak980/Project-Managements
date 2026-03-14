import dotenv from "dotenv";
import express from 'express';

dotenv.config();
const app=express()
const PORT =process.env.PORT || 8000

app.get('/',(req,res)=>{
    res.send("hello Deepak")
})

app.listen(PORT,()=>{
    console.log(`app listening the Port:${PORT}`);
    
})
