const express = require("express")
const routes = express.Router()
const userController = require("../controllers/userController")
const addressController = require("../controllers/addressController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const sneakerController = require("../controllers/sneakerController")
const upload = require("../middlewares/imageMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")
const wishlistController = require("../controllers/wishlistController")
const cartController = require("../controllers/cartController")
const { createPaymentController, stripeWebhookController } = require("../controllers/paymentController")
const orderController = require("../controllers/orderController")

// register user
routes.post("/register", userController.registerController)

// login user
routes.post("/login", userController.loginController)

// ------------- ADDRESS SECTION -------------------------------------

// add address
routes.post("/addaddress", jwtMiddleware, addressController.addAddressController);

// get all address
routes.get("/allAddress", jwtMiddleware, addressController.getAllAddressController)

// update address
routes.put("/address/:id", jwtMiddleware, addressController.updateAddressControllwe)

// ------------- SNEAKER SECTION -------------------------------------

// add sneakers
routes.post("/addSneakers", adminMiddleware, upload.array("photos", 5), sneakerController.addSneakerController)

// get all sneakers
routes.get("/allSneakers", jwtMiddleware, sneakerController.getAllSneakersController)

// get single sneaker
routes.get("/sneakers/:id/view", jwtMiddleware, sneakerController.getSingleSneakerController)

// ------------- WISHLISt SECTION -------------------------------------

// add to wishlist
routes.post("/wishlist/:id/add", jwtMiddleware, wishlistController.addToWishlistController)

// view all added
routes.get("/wishlists", jwtMiddleware, wishlistController.getAllWishlistsController)

// delete recipe
routes.delete("/wishlist/:id/delete", jwtMiddleware, wishlistController.deleteWishlistController)

// add to cart
routes.post("/wishlist/:id/cart", jwtMiddleware, wishlistController.moveWishlistToCartController);

// ------------- CART SECTION -------------------------------------

// add to cart
routes.post("/cart/:id/add", jwtMiddleware, cartController.addToCartController)

// delete from cart
routes.delete("/cart/:id/delete", jwtMiddleware, cartController.deleteCartController)

// view all added
routes.get("/cart", jwtMiddleware, cartController.getAllCartController)


// create order
routes.post("/order/create", jwtMiddleware, cartController.createOrderController)

// ------------- PAYMENT SECTION -------------------------------------

// make payment
routes.post("/stripe/create", jwtMiddleware, createPaymentController)

// check payment
routes.post("/stripe/webhook", stripeWebhookController)

// ------------- ORDER SECTION -------------------------------------

// get all orders
routes.get("/orders", jwtMiddleware, orderController.getMyOrdersController)

// get single order details
routes.get("/orders/:id/view", jwtMiddleware, orderController.getSingleOrderController)

module.exports = routes 