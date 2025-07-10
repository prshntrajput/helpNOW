const express = require("express");
const cors = require("cors");
require("dotenv").config;

const authRoutes = require("./routes/authRoute.js")

const app = express();

app.use(cors({
    origin:true , credentials:true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/",(req,res)=>{
    res.send("API running")
});

module.exports=app
