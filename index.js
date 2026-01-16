require("dotenv").config()
const express = require("express")
const cors = require("cors")
require("./config/db")
const routes = require('./routes/routes')

const archiveServer = express()
archiveServer.use(cors())
archiveServer.use(express.json())
archiveServer.use(routes)

const PORT = 3000

archiveServer.listen(PORT,()=>{
    console.log("server strted");
})

archiveServer.get("/",(req,res)=>{
    res.status(200).send("<h1>Cookpedia server started</h1>")
})