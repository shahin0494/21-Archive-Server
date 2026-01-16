const express = require("express")
const routes = express.Router()
const userController = require("../controllers/userController")

routes.post("/register",userController.registerController)

module.exports=routes 