import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
dotenv.config();
const app = express(); 



app.get("/" , (req, res) => {
    res.send("Hello from server");
});


connectDB();
app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT} `);
})