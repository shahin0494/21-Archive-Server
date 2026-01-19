const express = require("express")
const routes = express.Router()
const userController = require("../controllers/userController")
const addressController = require("../controllers/addressController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")

// register user
routes.post("/register", userController.registerController)

// login user
routes.post("/login", userController.loginController)

// add address
routes.post("/addaddress", jwtMiddleware, addressController.addAddressController);

module.exports = routes 