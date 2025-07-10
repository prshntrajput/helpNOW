const express = require("express");
const cors = require("cors");
require("dotenv").config;

const app = express();

app.use(cors({
    origin:true , credentials:true
}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API running")
});

module.exports=app
