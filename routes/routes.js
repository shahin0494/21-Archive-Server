const express = require("express")
const routes = express.Router()
const userController = require("../controllers/userController")
const addressController = require("../controllers/addressController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const sneakerController = require("../controllers/sneakerController")
const upload = require("../middlewares/imageMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")
const wishlistController = require("../controllers/wishlistController")

// register user
routes.post("/register", userController.registerController)

// login user
routes.post("/login", userController.loginController)

// ------------- ADDRESS SECTION -------------------------------------

// add address
routes.post("/addaddress", jwtMiddleware, addressController.addAddressController);

// get all address
routes.get("/allAddress", jwtMiddleware,addressController.getAllAddressController)

// update address
routes.put("/address/:id", jwtMiddleware,addressController.updateAddressControllwe)

// ------------- SNEAKER SECTION -------------------------------------

// add sneakers
routes.post("/addSneakers", adminMiddleware,upload.array("photos", 5), sneakerController.addSneakerController)

// get all sneakers
routes.get("/allSneakers",adminMiddleware,sneakerController.getAllSneakersController)

// get single sneaker
routes.get("/sneaker/:id/view",adminMiddleware,sneakerController.getSingleSneakerController)

// ------------- WISHLISt SECTION -------------------------------------

// add to wishlist
routes.post("/wishlist/:id/add",jwtMiddleware,wishlistController.addToWishlistController)

// view all added
routes.get("/wishlists",jwtMiddleware,wishlistController.getAllWishlistsController)

// delete recipe
routes.delete("/wishlist/:id/delete",jwtMiddleware,wishlistController.deleteWishlistController)

module.exports = routes 